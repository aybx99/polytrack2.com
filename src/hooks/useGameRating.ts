'use client';

import { useState, useEffect, useCallback } from 'react';

interface UserRating {
  gameSlug: string;
  rating: number;
  timestamp: number;
}

const STORAGE_USER_KEY = 'user_game_ratings';

export function useGameRating(
  gameSlug: string,
  initialRating?: number,
  initialCount?: number
) {
  // Backend data
  const backendRating = initialRating || 0;
  const backendCount = initialCount || 0;

  const [hasRated, setHasRated] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [combinedRating, setCombinedRating] = useState(backendRating);
  const [combinedCount, setCombinedCount] = useState(backendCount);

  // Function to load and combine data
  const loadAndCombineRatings = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Check if user has already rated this game
    const storedUserRatings = localStorage.getItem(STORAGE_USER_KEY);
    if (storedUserRatings) {
      try {
        const userRatings: UserRating[] = JSON.parse(storedUserRatings);
        const userGameRating = userRatings.find((r) => r.gameSlug === gameSlug);

        if (userGameRating) {
          setHasRated(true);
          setUserRating(userGameRating.rating);

          // Combine backend data with user rating
          const newCount = backendCount + 1;
          const newAverage =
            (backendRating * backendCount + userGameRating.rating) / newCount;

          setCombinedRating(newAverage);
          setCombinedCount(newCount);
        } else {
          // No user rating, just use backend data
          setCombinedRating(backendRating);
          setCombinedCount(backendCount);
        }
      } catch (error) {
        console.error('Error loading user ratings from localStorage:', error);
      }
    } else {
      // No localStorage data, just use backend
      setCombinedRating(backendRating);
      setCombinedCount(backendCount);
    }
  }, [gameSlug, backendRating, backendCount]);

  // Load user rating from localStorage and combine with backend data
  useEffect(() => {
    loadAndCombineRatings();
  }, [loadAndCombineRatings]);

  // Listen for storage changes to sync across tabs/windows and rating updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_USER_KEY) {
        loadAndCombineRatings();
      }
    };

    const handleRatingUpdate = (e: CustomEvent) => {
      if (e.detail.gameSlug === gameSlug) {
        loadAndCombineRatings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(
      'rating-updated',
      handleRatingUpdate as EventListener
    );

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'rating-updated',
        handleRatingUpdate as EventListener
      );
    };
  }, [loadAndCombineRatings, gameSlug]);

  // Save or update rating to localStorage
  const saveRating = useCallback(
    (userStars: number) => {
      // Calculate new combined rating (same formula for new or updated rating)
      const newCombinedCount = backendCount + 1;
      const newCombinedRating =
        (backendRating * backendCount + userStars) / newCombinedCount;

      // Update state
      setCombinedRating(newCombinedRating);
      setCombinedCount(newCombinedCount);
      setHasRated(true);
      setUserRating(userStars);

      // Save ONLY user rating to localStorage
      try {
        const storedUserRatings = localStorage.getItem(STORAGE_USER_KEY);
        const userRatings: UserRating[] = storedUserRatings
          ? JSON.parse(storedUserRatings)
          : [];

        // Find existing rating for this game
        const existingIndex = userRatings.findIndex(
          (r) => r.gameSlug === gameSlug
        );

        if (existingIndex >= 0) {
          // Update existing rating
          userRatings[existingIndex] = {
            gameSlug,
            rating: userStars,
            timestamp: Date.now(),
          };
        } else {
          // Add new rating
          userRatings.push({
            gameSlug,
            rating: userStars,
            timestamp: Date.now(),
          });
        }

        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userRatings));

        // Trigger a custom event to update all instances of this hook
        window.dispatchEvent(
          new CustomEvent('rating-updated', {
            detail: { gameSlug, rating: userStars },
          })
        );
      } catch (error) {
        console.error('Error saving rating to localStorage:', error);
      }
    },
    [gameSlug, backendRating, backendCount]
  );

  return {
    rating: combinedRating,
    ratingCount: combinedCount,
    hasRated,
    userRating,
    saveRating,
  };
}
