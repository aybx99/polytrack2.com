/**
 * Unified Site Configuration
 */

export interface SiteConfiguration {
  // SEO & Metadata
  seo: {
    siteName: string;
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultLocale: string;
  };

  // Branding
  branding: {
    logoPath: string;
    logoAlt?: string;
    color?: string;
    socials?: {
      twitter?: string;
      facebook?: string;
    };
  };

  // Contact & Support
  contact: {
    email: string;
    responseTimeHours: number;
    businessDays: string[];
    timezone: string;
  };

  // Legal
  legal: {
    privacyPolicyLastUpdated: string;
    termsOfServiceLastUpdated: string;
    dmcaLastUpdated: string;
  };
}

export const siteConfig: SiteConfiguration = {
  seo: {
    siteName: 'Polytrack',
    siteUrl: process.env.PRIMARY_SITE_URL || 'https://polytrack2.com',
    defaultTitle: 'Polytrack - Play Now',
    defaultDescription:
      'Discover and play Polytrack game instantly in your browser. No downloads required - just click and play!',
    defaultLocale: 'en',
  },

  branding: {
    logoPath: '/images/logo.png',
    logoAlt: 'Site Logo',
    color: '#FE2E36',
  },

  contact: {
    email: 'support@polytrack2.com',
    responseTimeHours: 24,
    businessDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timezone: 'UTC',
  },

  legal: {
    privacyPolicyLastUpdated: 'August 1, 2025',
    termsOfServiceLastUpdated: 'August 1, 2025',
    dmcaLastUpdated: 'August 1, 2025',
  },
};

export const getFormattedResponseTime = () => {
  const { responseTimeHours, businessDays } = siteConfig.contact;
  if (responseTimeHours <= 24) {
    return `${responseTimeHours} hours during ${businessDays.join('-')}`;
  }
  const days = Math.ceil(responseTimeHours / 24);
  return `${days} business days`;
};

export default siteConfig;
