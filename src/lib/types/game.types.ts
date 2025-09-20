/**
 * Game Data Types
 *
 * TypeScript interfaces for WordPress game data model
 * Based on the WordPress custom post type 'game' with WPGraphQL
 */

// [ANCHOR: wordpress-response-types]
/**
 * WordPress GraphQL response wrapper
 */
export interface WordPressResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

/**
 * WordPress post response structure with nested fields
 */
export interface GamePostResponse {
  game: {
    seo: {
      title: string;
      metaDesc: string;
    };
    gameContent: {
      title: string;
      slug: string;
      genre: string[];
      publishedAt: string;
      longDescription: string;
    };
    gameFields: {
      iframeUrl: string;
      developer: string;
      shortDescription: string;
      socialDescription?: string;
      faqjsonld?: string;
      rating?: number;
      ratingCount?: number;
    };
  } | null;
}

/**
 * WordPress posts collection response
 */
export interface GamePostsResponse {
  games: {
    nodes: Array<{
      seo: {
        title: string;
        metaDesc: string;
      };
      gameContent: {
        title: string;
        slug: string;
        genre: string[];
        publishedAt: string;
        longDescription: string;
      };
      gameFields: {
        iframeUrl: string;
        developer: string;
        shortDescription: string;
        socialDescription?: string;
        faqjsonld?: string;
        rating?: number;
        ratingCount?: number;
      };
    }>;
  };
}

// [ANCHOR: core-game-types]
/**
 * Core game data merged from WordPress and local config
 */
export interface GameData {
  /** Unique slug identifier */
  slug: string;
  /** Game title */
  title: string;
  /** Short description for previews */
  short_description: string;
  /** Rich HTML long description */
  long_description: string;
  /** HTTPS URL for game iframe */
  iframe_url: string;
  /** Thumbnail image path from local config (16:9 ratio) */
  thumbnail?: string;
  /** Open Graph image path from local config (1200x630 ratio) */
  ogImage?: string;
  /** Game genres taxonomy */
  genre: string[];
  /** SEO meta title */
  meta_title: string;
  /** SEO meta description */
  meta_description: string;
  /** Game developer */
  developer?: string;
  /** Published date ISO string */
  published_at?: string;
  /** Social media description for OpenGraph and Twitter */
  social_description?: string;
  /** FAQ JSON-LD structured data */
  faq_jsonld?: string;
  /** Average rating (1-5) */
  rating?: number;
  /** Total number of ratings */
  ratingCount?: number;
}

/**
 * WordPress image/media object
 */
export interface GameImage {
  /** Image URL */
  url: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** Image file size in bytes */
  fileSize?: number;
  /** MIME type */
  mimeType?: string;
}

// [ANCHOR: processed-game-types]
/**
 * Processed game data with computed fields
 */
export interface ProcessedGameData extends GameData {
  /** Sanitized HTML for safe rendering */
  sanitized_content: string;
  /** Plain text excerpt from long_description */
  excerpt: string;
  /** Computed reading time in minutes */
  reading_time: number;
  /** Whether this is the main game */
  is_main_game: boolean;
  /** SEO-friendly URL path */
  url_path: string;
}

// [ANCHOR: api-error-types]
/**
 * API error types
 */
export interface ApiError {
  message: string;
  code: 'NETWORK_ERROR' | 'GRAPHQL_ERROR' | 'NOT_FOUND' | 'VALIDATION_ERROR';
  details?: Record<string, unknown>;
}

/**
 * API response wrapper with error handling
 */
export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ApiError;
    };

// [ANCHOR: cache-types]
/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Time to live in seconds */
  ttl: number;
  /** Whether to use stale-while-revalidate */
  swr: boolean;
  /** Cache tags for invalidation */
  tags: string[];
}

/**
 * Cached response wrapper
 */
export interface CachedResponse<T> {
  data: T;
  timestamp: number;
  expires: number;
  tags: string[];
}

// [ANCHOR: validation-types]
/**
 * Game data validation schema
 */
export interface GameValidationRules {
  slug: {
    required: true;
    pattern: RegExp;
  };
  title: {
    required: true;
    maxLength: number;
  };
  iframe_url: {
    required: true;
    protocol: 'https';
  };
  thumbnail: {
    required: false; // Now from local config
    aspectRatio: '16:9';
  };
}

// [ANCHOR: graphql-query-types]
/**
 * GraphQL query variables
 */
export interface GameQueryVariables {
  slug: string;
}

export interface GamesQueryVariables {
  slugs: string[];
  first?: number;
}

/**
 * GraphQL query options
 */
export interface QueryOptions {
  /** Enable caching */
  cache?: boolean;
  /** Cache TTL in seconds */
  cacheTtl?: number;
  /** Revalidate in background */
  revalidate?: boolean;
  /** Request timeout in ms */
  timeout?: number;
}
