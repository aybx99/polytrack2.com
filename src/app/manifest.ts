/**
 * PWA Manifest Generation
 *
 * Generates web app manifest for PWA support
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.seo.siteName,
    short_name: siteConfig.seo.siteName,
    description: siteConfig.seo.defaultDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: siteConfig.branding.color,
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    icons: [
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/images/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['games', 'entertainment'],
    shortcuts: [
      {
        name: 'Play Games',
        short_name: 'Games',
        description: 'Browse and play games',
        url: '/',
        icons: [{ src: '/images/icon-192x192.png', sizes: '192x192' }],
      },
    ],
  };
}
