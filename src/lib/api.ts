import {
  GameData,
  ProcessedGameData,
  ApiResponse,
  ApiError,
  WordPressResponse,
  GamePostResponse,
  GamePostsResponse,
  QueryOptions,
} from './types/game.types';
import {
  getMainGameConfig,
  getActiveSecondaryGames,
  getGameConfigBySlug,
} from '@/config';
import { ContentSanitizer } from './utils/sanitize';

const API_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL!,
  timeout: 10000,
  retries: 3,
  defaultCacheTtl: 3600,
} as const;

class ErrorFactory {
  static notFound(slug: string, type: string = 'Game'): ApiError {
    return {
      message: `${type} not found: ${slug}`,
      code: 'NOT_FOUND',
      details: { slug },
    };
  }

  static validation(
    field: string,
    value: unknown,
    requirement: string
  ): ApiError {
    return {
      message: `Game ${field} ${requirement}`,
      code: 'VALIDATION_ERROR',
      details: { field, value },
    };
  }

  static network(message: string, details?: Record<string, unknown>): ApiError {
    return {
      message,
      code: 'NETWORK_ERROR',
      details,
    };
  }

  static graphql(message: string, errors?: unknown[]): ApiError {
    return {
      message,
      code: 'GRAPHQL_ERROR',
      details: { errors },
    };
  }
}
const GET_GAME_BY_SLUG_QUERY = `
  query GetGamePostBySlug($slug: ID!) {
    game(id: $slug, idType: SLUG) {
      seo {
        title
        metaDesc
      }
      gameContent {
        title
        slug
        genre
        publishedAt
        longDescription
      }
      gameFields {
        iframeUrl
        developer
        shortDescription
        socialDescription
        faqjsonld
        rating
        ratingCount
      }
    }
  }
`;

const GET_GAMES_BY_SLUGS_QUERY = `
  query GetGamesBySlugs($slugs: [String!]!) {
    games(where: { nameIn: $slugs }) {
      nodes {
        seo {
          title
          metaDesc
        }
        gameContent {
          title
          slug
          genre
          publishedAt
          longDescription
        }
        gameFields {
          iframeUrl
          developer
          shortDescription
          socialDescription
          faqjsonld
          rating
          ratingCount
        }
      }
    }
  }
`;

class WordPressApiClient {
  private endpoint: string;
  private timeout: number;

  constructor(endpoint: string, timeout: number = API_CONFIG.timeout) {
    this.endpoint = endpoint;
    this.timeout = timeout;
  }

  private async executeQuery<T>(
    query: string,
    variables: Record<string, unknown> = {},
    options: QueryOptions = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || this.timeout
    );

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          variables,
        }),
        signal: controller.signal,
        next: {
          revalidate: options.cacheTtl || API_CONFIG.defaultCacheTtl,
          tags: [`game-${JSON.stringify(variables)}`],
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: WordPressResponse<T> = await response.json();

      if (result.errors && result.errors.length > 0) {
        const firstError = result.errors[0];
        const error = ErrorFactory.graphql(
          firstError?.message || 'Unknown GraphQL error',
          result.errors
        );
        return { success: false, error };
      }

      return { success: true, data: result.data };
    } catch (error) {
      clearTimeout(timeoutId);

      let apiError: ApiError;

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          apiError = ErrorFactory.network('Request timeout', {
            timeout: this.timeout,
          });
        } else {
          apiError = ErrorFactory.network(error.message, {
            originalError: error.name,
          });
        }
      } else {
        apiError = ErrorFactory.network('Unknown error occurred');
      }

      return { success: false, error: apiError };
    }
  }

  private transformResponseToGameData(
    post: GamePostResponse['game'],
    slug: string
  ): GameData | null {
    if (!post) return null;
    const gameConfig = getGameConfigBySlug(slug);

    return {
      slug: post.gameContent.slug,
      title: post.gameContent.title,
      short_description: post.gameFields.shortDescription,
      long_description: post.gameContent.longDescription,
      iframe_url: post.gameFields.iframeUrl,
      thumbnail: gameConfig?.thumbnail,
      genre: post.gameContent.genre || [],
      meta_title: post.seo.title,
      meta_description: post.seo.metaDesc,
      developer: post.gameFields.developer,
      published_at: post.gameContent.publishedAt,
      ogImage: gameConfig?.ogImage,
      social_description: post.gameFields.socialDescription,
      faq_jsonld: post.gameFields.faqjsonld,
      rating: post.gameFields.rating || 0,
      ratingCount: post.gameFields.ratingCount || 0,
    };
  }

  async getGameBySlug(
    slug: string,
    options: QueryOptions = {}
  ): Promise<ApiResponse<GameData | null>> {
    const result = await this.executeQuery<GamePostResponse>(
      GET_GAME_BY_SLUG_QUERY,
      { slug },
      { ...options, cacheTtl: options.cacheTtl || API_CONFIG.defaultCacheTtl }
    );

    if (!result.success) {
      return result;
    }

    const gameData = this.transformResponseToGameData(result.data.game, slug);

    if (!gameData) {
      return {
        success: false,
        error: ErrorFactory.notFound(slug),
      };
    }

    const validationError = this.validateGameData(gameData);
    if (validationError) {
      return { success: false, error: validationError };
    }

    return { success: true, data: gameData };
  }

  async getGamesBySlugs(
    slugs: string[],
    options: QueryOptions = {}
  ): Promise<ApiResponse<GameData[]>> {
    if (slugs.length === 0) {
      return { success: true, data: [] };
    }

    const result = await this.executeQuery<GamePostsResponse>(
      GET_GAMES_BY_SLUGS_QUERY,
      { slugs },
      { ...options, cacheTtl: options.cacheTtl || API_CONFIG.defaultCacheTtl }
    );

    if (!result.success) {
      return result;
    }

    const games = result.data.games.nodes
      .map((node) =>
        this.transformResponseToGameData(node, node.gameContent.slug)
      )
      .filter((game): game is GameData => game !== null);

    const validatedGames: GameData[] = [];
    for (const game of games) {
      const validationError = this.validateGameData(game);
      if (!validationError) {
        validatedGames.push(game);
      } else {
        console.warn(
          `Invalid game data for slug "${game.slug}":`,
          validationError.message
        );
      }
    }

    return { success: true, data: validatedGames };
  }

  private validateGameData(game: GameData): ApiError | null {
    if (!game.slug || typeof game.slug !== 'string') {
      return ErrorFactory.validation(
        'slug',
        game.slug,
        'is required and must be a string'
      );
    }

    if (!game.title || typeof game.title !== 'string') {
      return ErrorFactory.validation(
        'title',
        game.title,
        'is required and must be a string'
      );
    }

    if (!game.iframe_url || !game.iframe_url.startsWith('https://')) {
      return ErrorFactory.validation(
        'iframe_url',
        game.iframe_url,
        'is required and must use HTTPS'
      );
    }

    return null;
  }
}

const apiClient = new WordPressApiClient(API_CONFIG.endpoint);

class ContentProcessor {
  static sanitizeHtml(html: string): string {
    return ContentSanitizer.sanitizeHtml(html, {
      stripDisallowed: true,
      maxLength: 50000,
    });
  }

  static extractExcerpt(html: string, maxLength: number = 160): string {
    return ContentSanitizer.createExcerpt(html, maxLength);
  }

  static calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  }

  static processGameData(
    gameData: GameData & { ogImage?: string },
    isMainGame: boolean = false
  ): ProcessedGameData {
    return {
      ...gameData,
      sanitized_content: this.sanitizeHtml(gameData.long_description),
      excerpt: this.extractExcerpt(gameData.long_description),
      reading_time: this.calculateReadingTime(gameData.long_description),
      is_main_game: isMainGame,
      url_path: isMainGame ? '/' : `/game/${gameData.slug}`,
      ogImage: gameData.ogImage,
    };
  }
}

export async function getMainGame(
  options: QueryOptions = {}
): Promise<ApiResponse<ProcessedGameData>> {
  const mainGameConfig = getMainGameConfig();

  const result = await apiClient.getGameBySlug(mainGameConfig.slug, options);

  if (!result.success) {
    return result;
  }

  if (!result.data) {
    return {
      success: false,
      error: ErrorFactory.notFound(mainGameConfig.slug, 'Main game'),
    };
  }

  const processedData = ContentProcessor.processGameData(result.data, true);
  return { success: true, data: processedData };
}

export async function getSecondaryGames(
  options: QueryOptions = {}
): Promise<ApiResponse<ProcessedGameData[]>> {
  const secondaryGameConfigs = getActiveSecondaryGames();
  const slugs = secondaryGameConfigs.map((config) => config.slug);

  const result = await apiClient.getGamesBySlugs(slugs, options);

  if (!result.success) {
    return result;
  }

  const processedGames = result.data.map((game) =>
    ContentProcessor.processGameData(game, false)
  );

  return { success: true, data: processedGames };
}

export async function getGameBySlug(
  slug: string,
  options: QueryOptions = {}
): Promise<ApiResponse<ProcessedGameData>> {
  const result = await apiClient.getGameBySlug(slug, options);

  if (!result.success) {
    return result;
  }

  if (!result.data) {
    return {
      success: false,
      error: ErrorFactory.notFound(slug),
    };
  }

  const mainGameConfig = getMainGameConfig();
  const isMainGame = slug === mainGameConfig.slug;

  const processedData = ContentProcessor.processGameData(
    result.data,
    isMainGame
  );
  return { success: true, data: processedData };
}

export { apiClient, ContentProcessor };
export type {
  ApiResponse,
  ApiError,
  GameData,
  ProcessedGameData,
  QueryOptions,
};
