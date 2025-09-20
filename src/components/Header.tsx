import Link from 'next/link';
import Image from 'next/image';
import { strings } from '@/config/strings.config';
import { getActiveSecondaryGames, getMainGameConfig } from '@/config';
import { siteConfig } from '@/config/site.config';
import NavigationLink from './NavigationLink';
import GamesDropdown from './GamesDropdown';
import MobileMenu from './MobileMenu';

export default async function Header() {
  const secondaryGames = getActiveSecondaryGames();
  const mainGame = getMainGameConfig();

  // Prepare translations for client components
  const translations = {
    home: strings.navigation.home,
    games: strings.navigation.games,
    about: strings.navigation.about,
    contact: strings.navigation.contact,
    openMenu: strings.navigation.openMenu,
    closeMenu: strings.navigation.closeMenu,
  };

  // Show Similar Games navigation only when secondary games exist
  const hasSecondaryGames = secondaryGames.length > 0;

  return (
    <header className="bg-header border-b border-border/50 shadow-sm">
      <nav className="container-game relative" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Link */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-xl font-bold text-foreground hover:text-primary transition-colors group focus-ring rounded-lg p-1"
            aria-label={`${mainGame.displayName || mainGame.slug} - Home`}
          >
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src={siteConfig.branding.logoPath}
                alt={
                  siteConfig.branding.logoAlt ||
                  `${mainGame.displayName || mainGame.slug} Logo`
                }
                fill
                className="object-contain transition-transform group-hover:scale-110"
                sizes="32px"
              />
            </div>
            <span className="text-base sm:text-xl truncate max-w-32 sm:max-w-none">
              {mainGame.displayName || mainGame.slug}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Similar Games Dropdown - Only show if secondary games exist */}
            {hasSecondaryGames && (
              <GamesDropdown
                secondaryGames={secondaryGames}
                gamesLabel={translations.games}
              />
            )}

            <NavigationLink href="/about">{translations.about}</NavigationLink>

            <NavigationLink href="/contact">
              {translations.contact}
            </NavigationLink>
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            secondaryGames={secondaryGames}
            translations={translations}
            hasSecondaryGames={hasSecondaryGames}
          />
        </div>
      </nav>
    </header>
  );
}
