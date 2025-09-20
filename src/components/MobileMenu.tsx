'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import NavigationLink from './NavigationLink';
import type { GameConfig } from '@/config';

interface MobileMenuProps {
  secondaryGames: GameConfig[];
  translations: {
    home: string;
    games: string;
    about: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  hasSecondaryGames: boolean;
}

export default function MobileMenu({
  secondaryGames,
  translations,
  hasSecondaryGames,
}: MobileMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Keyboard navigation support
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-label={
          mobileMenuOpen ? translations.closeMenu : translations.openMenu
        }
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-card border-b border-border shadow-lg z-40">
          <div className="container mx-auto px-4 max-w-6xl py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Games Section - Only show if secondary games exist */}
              {hasSecondaryGames && (
                <div className="space-y-2">
                  <div className="font-medium text-foreground">
                    {translations.games}
                  </div>
                  <div className="pl-4 space-y-2">
                    {secondaryGames.map((game) => (
                      <NavigationLink
                        key={game.slug}
                        href={`/game/${game.slug}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {game.displayName || game.slug}
                      </NavigationLink>
                    ))}
                  </div>
                </div>
              )}

              <NavigationLink href="/about">
                {translations.about}
              </NavigationLink>

              <NavigationLink href="/contact">
                {translations.contact}
              </NavigationLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
