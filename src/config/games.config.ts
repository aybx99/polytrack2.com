/**
 * Games Configuration System
 *
 * Centralized configuration for main game and secondary games.
 * This file controls which games are displayed without requiring CMS changes.
 *
 * Usage:
 * - mainGame: The primary game displayed on homepage (/)
 * - secondaryGames: Array of secondary games shown at /game/{slug}
 * - Maximum of 4 secondary games recommended for performance
 */

// [ANCHOR: game-interfaces]
export interface GameConfig {
  /** Unique slug identifier matching WordPress post slug */
  slug: string;
  /** Display name for navigation (optional override) */
  displayName?: string;
  /** Whether this game is currently active/published */
  isActive: boolean;
  /** Priority order for display (lower = higher priority) */
  priority?: number;
  /** Thumbnail image path for the game */
  thumbnail?: string;
  /** Open Graph image path for the game */
  ogImage?: string;
}

export interface GamesConfiguration {
  /** Main game displayed on homepage (/) */
  mainGame: GameConfig;
  /** Secondary games displayed at /game/{slug} routes */
  secondaryGames: GameConfig[];
  /** Global configuration settings */
  settings: {
    /** Maximum number of secondary games to display */
    maxSecondaryGames: number;
    /** Whether to show inactive games in development */
    showInactiveInDev: boolean;
    /** Default cache TTL for game data (seconds) */
    defaultCacheTTL: number;
  };
}

// [ANCHOR: games-configuration]
/**
 * Primary games configuration
 *
 * Update this configuration to control which games are displayed:
 * 1. Set mainGame.slug to match your primary WordPress game post
 * 2. Add secondary games with their WordPress post slugs
 * 3. Use isActive to temporarily hide games without deleting configuration
 */
export const gamesConfig: GamesConfiguration = {
  mainGame: {
    slug: 'polytrack',
    displayName: 'Polytrack',
    isActive: true,
    thumbnail: '/images/polytrack-thumbnail.jpg',
    ogImage: '/images/polytrack-og.jpg',
    priority: 1,
  },

  secondaryGames: [],

  settings: {
    maxSecondaryGames: 4,
    showInactiveInDev: true,
    defaultCacheTTL: 3600, // 1 hour
  },
};

// [ANCHOR: helper-functions]
/**
 * Get the main game configuration
 */
export function getMainGameConfig(): GameConfig {
  return gamesConfig.mainGame;
}

/**
 * Get all active secondary games, sorted by priority
 */
export function getActiveSecondaryGames(): GameConfig[] {
  const isDevMode = process.env.NODE_ENV === 'development';

  return gamesConfig.secondaryGames
    .filter((game) => {
      // Show active games, or inactive games in development if configured
      return (
        game.isActive || (isDevMode && gamesConfig.settings.showInactiveInDev)
      );
    })
    .sort((a, b) => (a.priority || 999) - (b.priority || 999))
    .slice(0, gamesConfig.settings.maxSecondaryGames);
}

/**
 * Get all game slugs (main + active secondaries) for sitemap generation
 */
export function getAllActiveGameSlugs(): string[] {
  const mainSlug = gamesConfig.mainGame.slug;
  const secondarySlugs = getActiveSecondaryGames().map((game) => game.slug);

  return [mainSlug, ...secondarySlugs];
}

/**
 * Check if a game slug is valid and active
 */
export function isValidGameSlug(slug: string): boolean {
  const isDevMode = process.env.NODE_ENV === 'development';

  // Check main game
  if (gamesConfig.mainGame.slug === slug && gamesConfig.mainGame.isActive) {
    return true;
  }

  // Check secondary games
  return gamesConfig.secondaryGames.some(
    (game) =>
      game.slug === slug &&
      (game.isActive || (isDevMode && gamesConfig.settings.showInactiveInDev))
  );
}

/**
 * Get game configuration by slug
 */
export function getGameConfigBySlug(slug: string): GameConfig | null {
  if (gamesConfig.mainGame.slug === slug) {
    return gamesConfig.mainGame;
  }

  const secondaryGame = gamesConfig.secondaryGames.find(
    (game) => game.slug === slug
  );
  return secondaryGame || null;
}

// Types are already exported above with interfaces
