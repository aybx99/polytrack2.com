/**
 * Server-side translation utilities
 *
 * This file contains server-only translation functions that can be used
 * in Server Components and API routes without client-side dependencies.
 */

import { i18nConfig } from './config';
import type { SupportedLocale, TranslationKey } from './config';
import { createTranslator } from './utils';

/**
 * Load translations for a specific locale (server-side only)
 */
async function loadTranslations(
  locale: SupportedLocale = i18nConfig.defaultLocale
): Promise<Record<string, string>> {
  try {
    // Direct require for server-side
    const translations = require(`./locales/${locale}.json`);

    // Remove metadata
    const { _metadata, ...translationData } = translations;

    return translationData;
  } catch (error) {
    console.warn(`Failed to load translations for locale "${locale}":`, error);

    // Fallback to default locale if not already trying it
    if (locale !== i18nConfig.fallbackLocale) {
      return loadTranslations(i18nConfig.fallbackLocale);
    }

    // If even fallback fails, return empty object
    return {};
  }
}

/**
 * Server-side translation function
 * Use this in Server Components and API routes
 */
export async function getServerTranslations(
  locale: SupportedLocale = i18nConfig.defaultLocale
) {
  const translations = await loadTranslations(locale);

  return {
    t: createTranslator(translations, locale),
    locale,
    translations,
  };
}
