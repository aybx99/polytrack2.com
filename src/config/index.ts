/**
 * Configuration Module Exports
 *
 * Central export point for all configuration modules
 */

// [ANCHOR: games-config-exports]
export {
  gamesConfig,
  getMainGameConfig,
  getActiveSecondaryGames,
  getAllActiveGameSlugs,
  isValidGameSlug,
  getGameConfigBySlug,
  type GameConfig,
  type GamesConfiguration,
} from './games.config';

// [ANCHOR: site-config-exports]
export {
  siteConfig,
  getFormattedResponseTime,
  type SiteConfiguration,
} from './site.config';

// [ANCHOR: future-config-exports]
// Additional configuration modules:
// export * from './api.config';
// export * from './performance.config';
