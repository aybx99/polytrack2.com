/**
 * Internationalization Configuration
 *
 * Centralized i18n system with locale management, fallbacks, and formatting
 * No hard-coded UI strings allowed - all text must come from locale files
 */

// [ANCHOR: locale-types]
export type SupportedLocale =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'ru'
  | 'ja'
  | 'ko'
  | 'zh';

export type LocaleDirection = 'ltr' | 'rtl';

export interface LocaleConfig {
  /** Locale code (ISO 639-1) */
  code: SupportedLocale;
  /** Display name in the locale itself */
  name: string;
  /** Display name in English */
  englishName: string;
  /** Text direction */
  direction: LocaleDirection;
  /** Whether this locale is fully translated */
  isComplete: boolean;
  /** Flag emoji or flag code */
  flag: string;
  /** Date/time formatting locale */
  dateLocale: string;
}

// [ANCHOR: translation-types]
export interface TranslationKey {
  // Navigation
  'navigation.home': string;
  'navigation.games': string;
  'navigation.about': string;
  'navigation.contact': string;
  'navigation.openMenu': string;
  'navigation.closeMenu': string;

  // Game-related
  'game.playNow': string;
  'game.loading': string;
  'game.loadingGame': string;
  'game.aboutGame': string;
  'game.howToPlay': string;
  'game.features': string;
  'game.controls': string;
  'game.tips': string;
  'game.faq': string;
  'game.relatedGames': string;
  'game.readingTime': string;
  'game.genres': string;
  'game.developer': string;
  'game.publishedDate': string;
  'game.shareText': string;
  'game.bookmarkPrompt': string;
  'game.scanToPlay': string;
  'game.generatingQR': string;
  'game.qrUnavailable': string;
  'game.game_frame_label': string;
  'game.exitFullscreen': string;
  'game.rotateDevice': string;
  'game.rotateMessage': string;
  'game.gotItPlayNow': string;
  'game.rate': string;
  'game.rated': string;
  'game.rateGame': string;
  'game.changeRating': string;
  'game.alreadyRated': string;

  // Actions
  'action.retry': string;
  'action.tryAgain': string;
  'action.goHome': string;
  'action.back': string;
  'action.close': string;
  'action.expand': string;
  'action.collapse': string;
  'action.share': string;
  'action.phone': string;
  'action.fullscreen': string;
  'action.exitFullscreen': string;
  'action.linkCopied': string;
  'action.dismiss': string;

  // Errors
  'error.gameNotFound': string;
  'error.connectionError': string;
  'error.serverError': string;
  'error.loadingFailed': string;
  'error.invalidData': string;
  'error.genericError': string;

  // Messages
  'message.discovergames': string;
  'message.gameWillLoad': string;
  'message.contentFromWordPress': string;

  // Offline
  'offline.title': string;
  'offline.message': string;

  // Time
  'time.minute': string;
  'time.minutes': string;
  'time.readTime': string;

  // Footer
  'footer.quickLinks': string;
  'footer.legal': string;
  'footer.privacyPolicy': string;
  'footer.termsOfService': string;
  'footer.cookiePolicy': string;
  'footer.disclaimer': string;
  'footer.contactUs': string;
  'footer.email': string;
  'footer.support': string;
  'footer.copyright': string;
  'footer.poweredBy': string;
  'footer.allRightsReserved': string;

  // Desktop Gaming
  'desktop.bookmarkPrompt': string;
  'desktop.share': string;
  'desktop.qrCode': string;
  'desktop.fullscreen': string;
  'desktop.exitFullscreen': string;
  'desktop.qrCodeTitle': string;
  'desktop.linkCopied': string;
}

// [ANCHOR: locale-configs]
export const localeConfigs: Record<SupportedLocale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    englishName: 'English',
    direction: 'ltr',
    isComplete: true,
    flag: '🇺🇸',
    dateLocale: 'en-US',
  },
  es: {
    code: 'es',
    name: 'Español',
    englishName: 'Spanish',
    direction: 'ltr',
    isComplete: false,
    flag: '🇪🇸',
    dateLocale: 'es-ES',
  },
  fr: {
    code: 'fr',
    name: 'Français',
    englishName: 'French',
    direction: 'ltr',
    isComplete: false,
    flag: '🇫🇷',
    dateLocale: 'fr-FR',
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    englishName: 'German',
    direction: 'ltr',
    isComplete: false,
    flag: '🇩🇪',
    dateLocale: 'de-DE',
  },
  it: {
    code: 'it',
    name: 'Italiano',
    englishName: 'Italian',
    direction: 'ltr',
    isComplete: false,
    flag: '🇮🇹',
    dateLocale: 'it-IT',
  },
  pt: {
    code: 'pt',
    name: 'Português',
    englishName: 'Portuguese',
    direction: 'ltr',
    isComplete: false,
    flag: '🇵🇹',
    dateLocale: 'pt-PT',
  },
  ru: {
    code: 'ru',
    name: 'Русский',
    englishName: 'Russian',
    direction: 'ltr',
    isComplete: false,
    flag: '🇷🇺',
    dateLocale: 'ru-RU',
  },
  ja: {
    code: 'ja',
    name: '日本語',
    englishName: 'Japanese',
    direction: 'ltr',
    isComplete: false,
    flag: '🇯🇵',
    dateLocale: 'ja-JP',
  },
  ko: {
    code: 'ko',
    name: '한국어',
    englishName: 'Korean',
    direction: 'ltr',
    isComplete: false,
    flag: '🇰🇷',
    dateLocale: 'ko-KR',
  },
  zh: {
    code: 'zh',
    name: '中文',
    englishName: 'Chinese',
    direction: 'ltr',
    isComplete: false,
    flag: '🇨🇳',
    dateLocale: 'zh-CN',
  },
};

// [ANCHOR: i18n-configuration]
export interface I18nConfig {
  /** Default locale */
  defaultLocale: SupportedLocale;
  /** Currently supported locales */
  supportedLocales: SupportedLocale[];
  /** Fallback locale for missing translations */
  fallbackLocale: SupportedLocale;
  /** Whether to show locale selector */
  enableLocaleSelector: boolean;
  /** Whether to detect user's preferred locale */
  enableLocaleDetection: boolean;
  /** Cookie name for locale storage */
  localeCookieName: string;
  /** Namespace for localStorage */
  storageNamespace: string;
}

export const i18nConfig: I18nConfig = {
  defaultLocale: 'en',
  supportedLocales: ['en'], // Start with English only, add more as needed
  fallbackLocale: 'en',
  enableLocaleSelector: false, // Enable when more locales are ready
  enableLocaleDetection: true,
  localeCookieName: 'game-portal-locale',
  storageNamespace: 'gamePortal',
};

// [ANCHOR: formatting-functions]
/**
 * Format numbers with locale-specific formatting
 */
export function formatNumber(
  value: number,
  locale: SupportedLocale,
  options?: Intl.NumberFormatOptions
): string {
  const localeConfig = localeConfigs[locale];
  return new Intl.NumberFormat(localeConfig.dateLocale, options).format(value);
}

/**
 * Format dates with locale-specific formatting
 */
export function formatDate(
  date: Date | string | number,
  locale: SupportedLocale,
  options?: Intl.DateTimeFormatOptions
): string {
  const localeConfig = localeConfigs[locale];
  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(
    localeConfig.dateLocale,
    defaultOptions
  ).format(dateObj);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale: SupportedLocale
): string {
  const localeConfig = localeConfigs[locale];
  const dateObj =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(localeConfig.dateLocale, {
    numeric: 'auto',
    style: 'long',
  });

  // Convert to appropriate time unit
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (Math.abs(diffInSeconds) < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (Math.abs(diffInSeconds) < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (Math.abs(diffInSeconds) < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (Math.abs(diffInSeconds) < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

/**
 * Pluralize text based on count and locale rules
 */
export function pluralize(
  count: number,
  locale: SupportedLocale,
  options: {
    zero?: string;
    one?: string;
    other: string;
  }
): string {
  const pr = new Intl.PluralRules(localeConfigs[locale].dateLocale);
  const rule = pr.select(count);

  switch (rule) {
    case 'zero':
      return options.zero || options.other;
    case 'one':
      return options.one || options.other;
    default:
      return options.other;
  }
}

// [ANCHOR: utility-functions]
/**
 * Get supported locales that are complete enough for production
 */
export function getProductionLocales(): SupportedLocale[] {
  return i18nConfig.supportedLocales.filter(
    (locale) => localeConfigs[locale].isComplete
  );
}

/**
 * Check if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return i18nConfig.supportedLocales.includes(locale as SupportedLocale);
}

/**
 * Get locale configuration
 */
export function getLocaleConfig(locale: SupportedLocale): LocaleConfig {
  return localeConfigs[locale];
}

/**
 * Get text direction for locale
 */
export function getTextDirection(locale: SupportedLocale): LocaleDirection {
  return localeConfigs[locale].direction;
}
