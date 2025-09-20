'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useGameRating } from '@/hooks/useGameRating';

const STAR_SIZES = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

const TEXT_SIZES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const;

type StarSize = keyof typeof STAR_SIZES;

interface StarRatingProps {
  gameSlug: string;
  gameTitle: string;
  initialRating?: number;
  initialRatingCount?: number;
  maxStars?: number;
  showCount?: boolean;
  size?: StarSize;
}

function RatingStar({
  filled,
  half,
  size,
}: {
  filled: boolean;
  half: boolean;
  size: StarSize;
}) {
  const starClass = `${STAR_SIZES[size]} ${
    filled || half
      ? 'fill-star text-star'
      : 'fill-transparent text-muted-foreground'
  }`;

  return (
    <div className="relative">
      <Star className={starClass} />
      {half && (
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className={`${STAR_SIZES[size]} fill-star text-star`} />
        </div>
      )}
    </div>
  );
}

export default function StarRating({
  gameSlug,
  gameTitle,
  initialRating,
  initialRatingCount,
  maxStars = 5,
  showCount = true,
  size = 'lg',
}: StarRatingProps) {
  const { rating, ratingCount } = useGameRating(
    gameSlug || gameTitle,
    initialRating,
    initialRatingCount
  );

  if (!ratingCount) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => (
          <RatingStar
            key={i}
            filled={i < fullStars}
            half={i === fullStars && hasHalfStar}
            size={size}
          />
        ))}
      </div>

      <span className={`${TEXT_SIZES[size]} font-semibold text-foreground`}>
        {rating.toFixed(1)}
      </span>

      {showCount && (
        <span className={`${TEXT_SIZES[size]} text-muted-foreground`}>
          ({ratingCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
