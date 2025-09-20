/**
 * Internationalization System
 *
 * Main i18n exports and utilities for the application
 * Provides translation functions, locale management, and formatting
 */

'use client';

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import {
  SupportedLocale,
  TranslationKey,
  i18nConfig,
  formatDate,
  formatNumber,
  formatRelativeTime,
  pluralize,
  getLocaleConfig,
  isSupportedLocale,
  getTextDirection,
} from './config';
import { createTranslator } from './utils';

// [ANCHOR: translation-context]
interface TranslationContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  translations: Record<keyof TranslationKey, string>;
  t: (
    key: keyof TranslationKey,
    variables?: Record<string, string | number>
  ) => string;
  formatDate: (
    date: Date | string | number,
    options?: Intl.DateTimeFormatOptions
  ) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatRelativeTime: (date: Date | string | number) => string;
  pluralize: (
    count: number,
    options: { zero?: string; one?: string; other: string }
  ) => string;
  isRTL: boolean;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

// [ANCHOR: locale-storage]
class LocaleStorage {
  private static readonly COOKIE_NAME = i18nConfig.localeCookieName;
  private static readonly STORAGE_KEY = `${i18nConfig.storageNamespace}.locale`;

  static getStoredLocale(): SupportedLocale | null {
    // Try localStorage first
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored && isSupportedLocale(stored)) {
          return stored;
        }
      } catch (error) {
        console.warn('Failed to read locale from localStorage:', error);
      }
    }

    return null;
  }

  static setStoredLocale(locale: SupportedLocale): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, locale);
      } catch (error) {
        console.warn('Failed to store locale in localStorage:', error);
      }
    }
  }

  static detectBrowserLocale(): SupportedLocale {
    if (typeof window === 'undefined') {
      return i18nConfig.defaultLocale;
    }

    // Get browser languages
    const browserLocales = navigator.languages || [navigator.language];

    for (const browserLocale of browserLocales) {
      // Try exact match first
      const exactMatch = browserLocale.toLowerCase();
      if (isSupportedLocale(exactMatch)) {
        return exactMatch;
      }

      // Try language part only (e.g., 'en-US' -> 'en')
      const languageCode = exactMatch.split('-')[0];
      if (languageCode && isSupportedLocale(languageCode)) {
        return languageCode;
      }
    }

    return i18nConfig.defaultLocale;
  }
}

// [ANCHOR: translation-loader]
class TranslationLoader {
  private static cache = new Map<SupportedLocale, Record<string, string>>();

  static async loadTranslations(
    locale: SupportedLocale
  ): Promise<Record<string, string>> {
    // Check cache first
    if (this.cache.has(locale)) {
      return this.cache.get(locale)!;
    }

    try {
      // Dynamic import based on locale
      const translations = await import(`./locales/${locale}.json`);

      // Remove metadata
      const { _metadata, ...translationData } =
        translations.default || translations;

      // Cache the translations
      this.cache.set(locale, translationData);

      return translationData;
    } catch (error) {
      console.warn(
        `Failed to load translations for locale "${locale}":`,
        error
      );

      // Fallback to default locale if not already trying it
      if (locale !== i18nConfig.fallbackLocale) {
        return this.loadTranslations(i18nConfig.fallbackLocale);
      }

      // If even fallback fails, return empty object
      return {};
    }
  }

  static clearCache(): void {
    this.cache.clear();
  }
}

// [ANCHOR: translation-provider]
interface TranslationProviderProps {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}

export function TranslationProvider({
  children,
  initialLocale,
}: TranslationProviderProps) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    // Server-side or initial load
    if (initialLocale) return initialLocale;

    // Client-side locale detection
    if (typeof window !== 'undefined') {
      const stored = LocaleStorage.getStoredLocale();
      if (stored) return stored;

      if (i18nConfig.enableLocaleDetection) {
        return LocaleStorage.detectBrowserLocale();
      }
    }

    return i18nConfig.defaultLocale;
  });

  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations when locale changes
  useEffect(() => {
    setIsLoading(true);

    TranslationLoader.loadTranslations(locale)
      .then((loadedTranslations) => {
        setTranslations(loadedTranslations);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load translations:', error);
        setIsLoading(false);
      });
  }, [locale]);

  const setLocale = (newLocale: SupportedLocale) => {
    if (newLocale === locale) return;

    setLocaleState(newLocale);
    LocaleStorage.setStoredLocale(newLocale);
  };

  // Translation function with variable interpolation
  const t = createTranslator(translations, locale) as (
    key: keyof TranslationKey,
    variables?: Record<string, string | number>
  ) => string;

  const contextValue: TranslationContextValue = {
    locale,
    setLocale,
    translations: translations as Record<keyof TranslationKey, string>,
    t,
    formatDate: (date, options) => formatDate(date, locale, options),
    formatNumber: (value, options) => formatNumber(value, locale, options),
    formatRelativeTime: (date) => formatRelativeTime(date, locale),
    pluralize: (count, options) => pluralize(count, locale, options),
    isRTL: getTextDirection(locale) === 'rtl',
    isLoading,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

// [ANCHOR: hooks]
export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  return context;
}

/**
 * Get reading time translation with proper pluralization
 */
export function getReadingTimeText(
  minutes: number,
  t: (
    key: keyof TranslationKey,
    variables?: Record<string, string | number>
  ) => string
): string {
  const unit = minutes === 1 ? t('time.minute') : t('time.minutes');
  return t('time.readTime', { count: minutes, unit });
}

// [ANCHOR: exports]
export {
  i18nConfig,
  localeConfigs,
  getLocaleConfig,
  isSupportedLocale,
  getTextDirection,
} from './config';

export type {
  SupportedLocale,
  TranslationKey,
  LocaleConfig,
  I18nConfig,
} from './config';
