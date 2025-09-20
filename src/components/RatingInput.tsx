'use client';

import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import {
  strings,
  formatPreviousRatingMessage,
  formatSelectedRatingMessage,
  formatStarAriaLabel,
} from '@/config/strings.config';

interface RatingInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  gameTitle: string;
  hasRated: boolean;
  currentRating?: number | null;
}

export function RatingInput({
  isOpen,
  onClose,
  onSubmit,
  gameTitle,
  hasRated,
  currentRating,
}: RatingInputProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(currentRating || 0);

  useEffect(() => {
    if (isOpen) {
      setSelectedStar(currentRating || 0);
    }
  }, [isOpen, currentRating]);

  const handleSubmit = () => {
    if (selectedStar > 0) {
      onSubmit(selectedStar);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-card border border-border rounded-lg shadow-2xl p-6 max-w-sm mx-4 relative">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label={strings.action.close}
      >
        <X className="h-4 w-4 text-foreground" />
      </button>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {hasRated
            ? strings.game.changeYourRating
            : strings.game.rateGameTitle}{' '}
          {gameTitle}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {hasRated
            ? formatPreviousRatingMessage(currentRating || 0)
            : strings.game.howWouldYouRate}
        </p>

        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => {
            const starNumber = i + 1;
            const isFilled = starNumber <= (hoveredStar || selectedStar);

            return (
              <button
                key={starNumber}
                type="button"
                onMouseEnter={() => setHoveredStar(starNumber)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setSelectedStar(starNumber)}
                className="transition-transform hover:scale-110 focus:outline-none focus:scale-110"
                aria-label={formatStarAriaLabel(starNumber)}
              >
                <Star
                  className={`w-10 h-10 ${
                    isFilled
                      ? 'fill-star text-star'
                      : 'fill-transparent text-muted-foreground'
                  } transition-colors`}
                />
              </button>
            );
          })}
        </div>

        {selectedStar > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            {formatSelectedRatingMessage(selectedStar)}
          </p>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm"
          >
            {strings.action.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedStar === 0}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm ${
              selectedStar === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md'
            }`}
          >
            {hasRated ? strings.game.updateRating : strings.game.submitRating}
          </button>
        </div>
      </div>
    </div>
  );
}
