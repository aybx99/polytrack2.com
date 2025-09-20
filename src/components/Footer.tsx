import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { getServerTranslations } from '@/i18n/server';
import { siteConfig } from '@/config/site.config';
import { getMainGameConfig } from '@/config/games.config';

export default async function Footer() {
  const { t } = await getServerTranslations();
  const currentYear = new Date().getFullYear();
  const contactEmail = siteConfig.contact.email;
  const mainGame = getMainGameConfig();
  const gameName = mainGame.displayName || mainGame.slug;

  return (
    <footer className="bg-footer mt-auto">
      <div className="container-game py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description - Takes 2 columns on larger screens */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-footer-foreground">
                {gameName}
              </span>
            </div>
            <p className="text-footer-foreground max-w-md leading-relaxed">
              {t('site.description')}
            </p>

            {/* Navigation Links - Horizontal layout */}
            <div className="pt-4">
              <nav className="flex flex-wrap gap-6">
                <Link
                  href={'/about' as any}
                  className="text-footer-muted hover:text-primary transition-colors font-medium focus-ring rounded-md px-2 py-1"
                >
                  {t('navigation.about')}
                </Link>
                <Link
                  href={'/contact' as any}
                  className="text-footer-muted hover:text-primary transition-colors font-medium focus-ring rounded-md px-2 py-1"
                >
                  {t('navigation.contact')}
                </Link>
                <Link
                  href={'/privacy-policy' as any}
                  className="text-footer-muted hover:text-primary transition-colors font-medium focus-ring rounded-md px-2 py-1"
                >
                  {t('footer.privacyPolicy')}
                </Link>
                <Link
                  href={'/terms-of-service' as any}
                  className="text-footer-muted hover:text-primary transition-colors font-medium focus-ring rounded-md px-2 py-1"
                >
                  {t('footer.termsOfService')}
                </Link>
                <Link
                  href={'/dmca' as any}
                  className="text-footer-muted hover:text-primary transition-colors font-medium focus-ring rounded-md px-2 py-1"
                >
                  {t('footer.dmca')}
                </Link>
              </nav>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-footer-foreground font-semibold text-lg">
              {t('footer.contactUs')}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col space-y-1">
                <span className="text-footer-muted font-medium">
                  {t('footer.email')}:
                </span>
                <span className="text-footer-foreground">{contactEmail}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-footer-muted font-medium">
                  {t('footer.supportLabel')}:
                </span>
                <span className="text-footer-foreground">
                  {t('footer.support')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-footer-muted/20 text-center text-sm">
          <p className="text-footer-muted">
            &copy; {currentYear} {gameName}. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
