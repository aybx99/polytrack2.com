/**
 * Strings Configuration - English Only
 *
 * Centralized configuration for all UI strings in the application.
 * No internationalization logic - ships English-only as per PRD requirements.
 *
 * Usage:
 * import { strings } from '@/config/strings.config';
 * const text = strings.navigation.home; // "Home"
 */

// [ANCHOR: navigation-strings]
export const navigationStrings = {
  home: 'Home',
  games: 'Similar Games',
  about: 'About',
  contact: 'Contact',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
} as const;

// [ANCHOR: game-strings]
export const gameStrings = {
  playNow: 'Play Now',
  loading: 'Loading...',
  loadingGame: 'Loading game...',
  aboutGame: 'About This Game',
  howToPlay: 'How to Play',
  features: 'Features',
  controls: 'Controls',
  tips: 'Tips & Strategies',
  faq: 'Frequently Asked Questions',
  relatedGames: 'Related Games',
  readingTime: 'min read', // Note: count will be handled separately
  genres: 'Genres',
  developer: 'Developer',
  publishedDate: 'Published',
  gameFrameLabel: 'Interactive game content',
  exitFullscreen: 'Exit fullscreen',
  rotateDevice: 'Rotate Your Device',
  rotateMessage:
    'Please rotate your device to landscape mode for the best gaming experience',
  gotItPlayNow: 'GOT IT - PLAY NOW!',
  shareText: 'Check out this game:',
  bookmarkPrompt: 'Bookmark our site so you never miss out', // Note: shortcut will be handled separately
  scanToPlay: 'Scan to play on your phone',
  generatingQR: 'Generating QR Code...',
  qrUnavailable: 'QR Code Unavailable',
  rate: 'Rate',
  rated: 'Rated',
  rateGame: 'Rate this game',
  changeRating: 'Change Rating',
  alreadyRated: 'You have already rated this game',
  changeYourRating: 'Change Your Rating',
  rateGameTitle: 'Rate',
  previousRatingMessage: 'You previously rated this game',
  selectNewRating: 'Select a new rating below.',
  howWouldYouRate: 'How would you rate your experience with this game?',
  youSelected: 'You selected',
  star: 'star',
  stars: 'stars',
  updateRating: 'Update Rating',
  submitRating: 'Submit Rating',
} as const;

// [ANCHOR: action-strings]
export const actionStrings = {
  retry: 'Retry',
  tryAgain: 'Try Again',
  goHome: 'Return Home',
  back: 'Back',
  close: 'Close',
  expand: 'Expand',
  collapse: 'Collapse',
  share: 'Share',
  phone: 'Phone',
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit Fullscreen',
  linkCopied: 'Link copied to clipboard!',
  dismiss: 'Dismiss',
  cancel: 'Cancel',
} as const;

// [ANCHOR: error-strings]
export const errorStrings = {
  gameNotFound: 'Game not found. It may have been moved or removed.',
  connectionError:
    'Unable to connect to the server. Please check your internet connection and try again.',
  serverError:
    'There was a problem with the server response. Please try again later.',
  loadingFailed: 'Failed to load content. Please try again.',
  invalidData: 'The content data is invalid or incomplete.',
  genericError: 'An unexpected error occurred. Please try again.',
} as const;

// [ANCHOR: message-strings]
export const messageStrings = {
  discoverGames:
    'Discover amazing games and play them instantly in your browser',
  gameWillLoad: 'Game will load here',
  contentFromWordPress:
    'Rich content from WordPress will be added here with full styling and formatting.',
} as const;

// [ANCHOR: offline-strings]
export const offlineStrings = {
  title: "You're offline",
  message:
    'Some features may not work properly. Please check your internet connection.',
} as const;

// [ANCHOR: time-strings]
export const timeStrings = {
  minute: 'minute',
  minutes: 'minutes',
  readTime: 'read', // Note: count and unit will be handled separately
} as const;

// [ANCHOR: footer-strings]
export const footerStrings = {
  quickLinks: 'Quick Links',
  legal: 'Legal',
  privacyPolicy: 'Privacy Policy',
  termsOfService: 'Terms of Service',
  dmca: 'DMCA',
  cookiePolicy: 'Cookie Policy',
  disclaimer: 'Disclaimer',
  contactUs: 'Contact Us',
  email: 'Email',
  supportLabel: 'Support',
  support: '24/7 Support Available',
  copyright: 'Copyright', // Note: year and site name will be handled separately
  poweredBy: 'Powered by Next.js & WordPress',
  allRightsReserved: 'All rights reserved',
} as const;

// [ANCHOR: desktop-strings]
export const desktopStrings = {
  bookmarkPrompt: 'Bookmark our site so you never miss out', // Note: shortcut will be handled separately
  share: 'Share',
  qrCode: 'Phone',
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit Fullscreen',
  qrCodeTitle: 'Scan to play on your phone',
  linkCopied: 'Link copied to clipboard!',
} as const;

// [ANCHOR: site-strings]
export const siteStrings = {
  description: 'Discover and play amazing games instantly in your browser',
} as const;

// [ANCHOR: main-strings-export]
export const strings = {
  navigation: navigationStrings,
  game: gameStrings,
  action: actionStrings,
  error: errorStrings,
  message: messageStrings,
  offline: offlineStrings,
  time: timeStrings,
  footer: footerStrings,
  desktop: desktopStrings,
  site: siteStrings,
} as const;

// [ANCHOR: utility-functions]
/**
 * Helper function to format reading time
 * Replaces the i18n interpolation logic
 */
export function formatReadingTime(minutes: number): string {
  const unit = minutes === 1 ? timeStrings.minute : timeStrings.minutes;
  return `${minutes} ${unit} ${timeStrings.readTime}`;
}

/**
 * Helper function to format bookmark prompt with keyboard shortcut
 * Replaces the i18n interpolation logic
 */
export function formatBookmarkPrompt(shortcut: string): string {
  return `Bookmark our site with ${shortcut} so you never miss out`;
}

/**
 * Helper function to format copyright text
 * Replaces the i18n interpolation logic
 */
export function formatCopyright(year: number, siteName: string): string {
  return `${footerStrings.copyright} © ${year} ${siteName}`;
}

/**
 * Helper function to format previous rating message
 */
export function formatPreviousRatingMessage(rating: number): string {
  const starText = rating === 1 ? gameStrings.star : gameStrings.stars;
  return `${gameStrings.previousRatingMessage} ${rating} ${starText}. ${gameStrings.selectNewRating}`;
}

/**
 * Helper function to format selected rating message
 */
export function formatSelectedRatingMessage(rating: number): string {
  const starText = rating === 1 ? gameStrings.star : gameStrings.stars;
  return `${gameStrings.youSelected} ${rating} ${starText}`;
}

/**
 * Helper function to format star aria label
 */
export function formatStarAriaLabel(rating: number): string {
  const starText = rating === 1 ? gameStrings.star : gameStrings.stars;
  return `${gameStrings.rateGameTitle} ${rating} ${starText}`;
}

// [ANCHOR: typescript-types]
export type StringsConfig = typeof strings;
export type NavigationStrings = typeof navigationStrings;
export type GameStrings = typeof gameStrings;
export type ActionStrings = typeof actionStrings;
export type ErrorStrings = typeof errorStrings;
export type MessageStrings = typeof messageStrings;
export type OfflineStrings = typeof offlineStrings;
export type TimeStrings = typeof timeStrings;
export type FooterStrings = typeof footerStrings;
export type DesktopStrings = typeof desktopStrings;
export type SiteStrings = typeof siteStrings;
