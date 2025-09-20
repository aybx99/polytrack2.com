/**
 * Dynamic Robots.txt Generation
 *
 * Generates robots.txt with proper sitemap reference and crawling rules
 */

import { MetadataRoute } from 'next';

const SITE_URL = process.env.PRIMARY_SITE_URL || 'https://example.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/test-api/',
          '/_next/',
          '/admin/',
          '/*.json$',
          '/private/',
        ],
      },
      // Special rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/test-api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/test-api/', '/admin/', '/private/'],
        crawlDelay: 1, // 1 second delay for Bing
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
