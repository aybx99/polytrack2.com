import { ProcessedGameData } from '@/lib/types/game.types';
import { siteConfig } from '@/config/site.config';
import { cleanDescription, parseFAQJsonLd } from './utils';

export class JsonLdGenerator {
  private static readonly organizationId = `${siteConfig.seo.siteUrl}#organization`;
  private static readonly websiteId = `${siteConfig.seo.siteUrl}#website`;

  static generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': this.organizationId,
      name: siteConfig.seo.siteName,
      url: siteConfig.seo.siteUrl,
      logo: `${siteConfig.seo.siteUrl}${siteConfig.branding.logoPath}`,
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.contact.email,
        contactType: 'customer service',
        availableLanguage: ['English'],
      },
      sameAs: [],
    };
  }

  private static generateGameEntity(game: ProcessedGameData) {
    const gameId = `${siteConfig.seo.siteUrl}${game.url_path}#game`;

    const gameEntity: any = {
      '@type': 'SoftwareApplication',
      '@id': gameId,
      name: game.title,
      description: cleanDescription(
        game.excerpt || game.short_description,
        300
      ),
      url: `${siteConfig.seo.siteUrl}${game.url_path}`,
      image: game.ogImage || game.thumbnail || '/og-image.jpg',
      applicationCategory: 'Game',
      applicationSubCategory: game.genre[0],
      operatingSystem: 'Windows, Chrome OS, Linux, MacOS, Android, iOS',
      author: { '@id': this.organizationId },
      publisher: { '@id': this.organizationId },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Play this game for free in your browser',
      },
      potentialAction: {
        '@type': 'PlayAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.seo.siteUrl}${game.url_path}`,
        },
      },
    };

    // Add aggregateRating only if there are ratings
    if (game.ratingCount && game.ratingCount > 0 && game.rating) {
      gameEntity.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: game.rating.toFixed(1),
        ratingCount: game.ratingCount,
        bestRating: '5',
        worstRating: '1',
      };
    }

    return gameEntity;
  }

  private static generateWebSiteSchema(game: ProcessedGameData) {
    const gameId = `${siteConfig.seo.siteUrl}${game.url_path}#game`;

    return {
      '@type': 'WebSite',
      '@id': this.websiteId,
      name: game.meta_title || game.title,
      description: game.meta_description || game.excerpt,
      url: siteConfig.seo.siteUrl,
      publisher: { '@id': this.organizationId },
      author: { '@id': this.organizationId },
      mainEntity: { '@id': gameId },
    };
  }

  private static generateItemPageSchema(game: ProcessedGameData) {
    const gameId = `${siteConfig.seo.siteUrl}${game.url_path}#game`;
    const description = cleanDescription(
      game.excerpt || game.short_description,
      300
    );

    return {
      '@type': 'ItemPage',
      '@id': `${siteConfig.seo.siteUrl}${game.url_path}#page`,
      name: game.title,
      description,
      url: `${siteConfig.seo.siteUrl}${game.url_path}`,
      isPartOf: { '@id': this.websiteId },
      mainEntity: { '@id': gameId },
      breadcrumb: this.generateBreadcrumbSchema([
        { name: 'Home', url: siteConfig.seo.siteUrl },
        { name: game.title, url: `${siteConfig.seo.siteUrl}${game.url_path}` },
      ]),
    };
  }

  static generateBreadcrumbSchema(
    breadcrumbs: Array<{ name: string; url: string }>
  ) {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': crumb.url, name: crumb.name },
      })),
    };
  }

  static generateGameSchema(game: ProcessedGameData, isMainGame = false) {
    const graphItems: any[] = [
      this.generateOrganizationSchema(),
      this.generateGameEntity(game),
    ];

    // Add page-specific schema
    graphItems.push(
      isMainGame
        ? this.generateWebSiteSchema(game)
        : this.generateItemPageSchema(game)
    );

    // Add FAQ schema if available
    if (game.faq_jsonld) {
      const faqSchema = parseFAQJsonLd(game.faq_jsonld);
      if (faqSchema) {
        graphItems.push(faqSchema);
      }
    }

    return {
      '@context': 'https://schema.org',
      '@graph': graphItems,
    };
  }
}
