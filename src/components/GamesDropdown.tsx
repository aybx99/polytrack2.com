'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DropdownNavigationLink } from './NavigationLink';
import type { GameConfig } from '@/config';

interface GamesDropdownProps {
  secondaryGames: GameConfig[];
  gamesLabel: string;
}

export default function GamesDropdown({
  secondaryGames,
  gamesLabel,
}: GamesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (secondaryGames.length === 0) {
    return null;
  }

  const isGamesActive = pathname.startsWith('/game');

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`font-medium transition-colors flex items-center space-x-1 ${
          isGamesActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-primary'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{gamesLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {secondaryGames.map((game) => (
              <DropdownNavigationLink
                key={game.slug}
                href={`/game/${game.slug}` as any}
              >
                {game.displayName || game.slug}
              </DropdownNavigationLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
