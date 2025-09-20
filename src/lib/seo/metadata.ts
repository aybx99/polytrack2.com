import { Metadata } from 'next';
import { ProcessedGameData } from '@/lib/types/game.types';
import { siteConfig } from '@/config/site.config';
import { cleanDescription } from './utils';

export class MetadataGenerator {
  static generateGamePageMetadata(game: ProcessedGameData): Metadata {
    const canonical = `${siteConfig.seo.siteUrl}${game.url_path}`;
    const title = game.meta_title || `${game.title} - Play Online Free`;
    const description = cleanDescription(
      game.meta_description || game.short_description || game.excerpt
    );
    const socialDescription = cleanDescription(
      game.social_description || description
    );

    return {
      title,
      description,
      authors: [{ name: game.developer }],
      creator: game.developer,
      publisher: siteConfig.seo.siteName,
      alternates: {
        canonical,
      },
      icons: {
        icon: [
          { url: '/images/favicon.ico', type: 'image/x-icon' },
          {
            url: '/images/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            url: '/images/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            url: '/images/favicon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            url: '/images/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
        ],
      },
      openGraph: {
        title: game.meta_title || title,
        description: socialDescription,
        url: canonical,
        siteName: siteConfig.seo.siteName,
        locale: siteConfig.seo.defaultLocale,
        type: 'website',
        images: game.ogImage
          ? [
              {
                url: game.ogImage,
                width: 1200,
                height: 630,
                alt: `${game.title} - Game Preview`,
              },
            ]
          : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: game.meta_title || title,
        description: socialDescription,
        images: game.ogImage ? [game.ogImage] : undefined,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'theme-color': siteConfig.branding.color || '#000000',
        'color-scheme': 'light dark',
        'format-detection': 'telephone=no',
      },
    };
  }

  static generateAboutPageMetadata(
    mainGame: ProcessedGameData | null
  ): Metadata {
    const gameTitle = mainGame ? mainGame.title : 'Our Game';
    const gameDescription = mainGame
      ? mainGame.short_description
      : 'An amazing gaming experience';

    const title = `About ${gameTitle}`;
    const description = `Learn about ${gameTitle}: ${cleanDescription(
      gameDescription
    )}. Discover what makes this game special and why players love it.`;

    return {
      title,
      description,
      icons: {
        icon: [
          { url: '/images/favicon.ico', type: 'image/x-icon' },
          {
            url: '/images/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            url: '/images/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            url: '/images/favicon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
      openGraph: {
        title,
        description: `Learn about ${gameTitle} and what makes it special.`,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title,
        description: `Learn about ${gameTitle} and what makes it special.`,
      },
    };
  }

  static generateDefaultpageMetadata(): Metadata {
    const title = siteConfig.seo.defaultTitle;
    const desc = siteConfig.seo.defaultDescription;

    return {
      title,
      description: desc,
      authors: [{ name: siteConfig.seo.siteName }],
      creator: siteConfig.seo.siteName,
      publisher: siteConfig.seo.siteName,
      metadataBase: new URL(siteConfig.seo.siteUrl),
      alternates: {
        canonical: siteConfig.seo.siteUrl,
      },
      icons: {
        icon: [
          { url: '/images/favicon.ico', type: 'image/x-icon' },
          {
            url: '/images/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            url: '/images/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            url: '/images/favicon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
      openGraph: {
        title,
        description: desc,
        url: siteConfig.seo.siteUrl,
        siteName: siteConfig.seo.siteName,
        locale: siteConfig.seo.defaultLocale,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: desc,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  }
}
