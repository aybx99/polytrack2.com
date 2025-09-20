/**
 * Dynamic Sitemap Generation
 *
 * Generates sitemap.xml based on active games configuration
 * Includes main game, secondary games, and static pages
 */

import { MetadataRoute } from 'next';
import { getAllActiveGameSlugs, getMainGameConfig } from '@/config';

const SITE_URL = process.env.PRIMARY_SITE_URL || 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const gameUpdateTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago

  // Get all active game slugs
  const activeGameSlugs = getAllActiveGameSlugs();
  const mainGameSlug = getMainGameConfig().slug;

  const sitemap: MetadataRoute.Sitemap = [
    // Homepage (main game)
    {
      url: SITE_URL,
      lastModified: gameUpdateTime,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Secondary game pages
    ...activeGameSlugs
      .filter((slug) => slug !== mainGameSlug) // Exclude main game (already covered by homepage)
      .map((slug) => ({
        url: `${SITE_URL}/game/${slug}`,
        lastModified: gameUpdateTime,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),

    // Static pages
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2025-09-01'), // Static content update date
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date('2025-09-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date('2025-09-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return sitemap;
}
