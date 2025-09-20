'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from '@/i18n';
import { X, RotateCw, Smartphone } from 'lucide-react';

interface MobileFullScreenGameProps {
  src: string;
  title: string;
  onClose: () => void;
}

export default function MobileFullScreenGame({
  src,
  title,
  onClose,
}: MobileFullScreenGameProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mounting and initial orientation detection
  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);

      // Auto-start game if in landscape
      if (!gameStarted && !portrait) {
        setGameStarted(true);
      }
    };

    // Set mounted flag and check initial orientation
    setIsMounted(true);
    checkOrientation();

    // Listen for orientation changes
    const handleOrientationChange = () => {
      checkOrientation();
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Request fullscreen on mount
    const requestFullscreen = async () => {
      try {
        if (containerRef.current && containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.log('Fullscreen request failed:', err);
      }
    };

    requestFullscreen();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);

      // Exit fullscreen on unmount
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [gameStarted]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Handle "GOT IT" button - start game regardless of orientation
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Show button if mounted, game hasn't started, and in portrait mode
  const shouldShowButton = isMounted && !gameStarted && isPortrait;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
    >
      {/* Back button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-[10001] bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-black/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={t('game.exitFullscreen')}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Portrait orientation prompt - only show if game hasn't started and in portrait */}
      {shouldShowButton && (
        <div className="absolute inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center overflow-y-auto">
          <div
            className="text-center p-4 max-w-md w-full max-h-full overflow-y-auto"
            style={{ maxHeight: '90vh' }}
          >
            {/* Rotating phone icon animation */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <Smartphone className="w-24 h-24 text-white animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <RotateCw className="w-full h-full text-primary animate-spin-slow" />
              </div>
            </div>

            {/* Message */}
            <h2 className="text-white text-2xl font-bold mb-4">
              {t('game.rotateDevice')}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              {t('game.rotateMessage')}
            </p>

            {/* Visual indicator */}
            <div className="mt-6 flex justify-center space-x-4 mb-6">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="w-12 h-20 border-2 border-white/50 rounded relative">
                  <div className="absolute inset-x-0 bottom-1 h-1 bg-white/50 rounded-full mx-2" />
                </div>
              </div>
              <RotateCw className="w-6 h-6 text-white/60 self-center" />
              <div className="bg-primary/30 rounded-lg p-3">
                <div className="w-20 h-12 border-2 border-primary rounded relative">
                  <div className="absolute inset-y-0 right-1 w-1 bg-primary rounded-full my-2" />
                </div>
              </div>
            </div>

            {/* GOT IT Button - Clean and Professional */}
            <div className="mt-8 text-center">
              <button
                onClick={handleStartGame}
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[200px]"
              >
                🎮 {t('game.gotItPlayNow')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game iframe - visible when not showing rotation prompt */}
      {!shouldShowButton && (
        <>
          {isLoading && (
            <div className="absolute inset-0 z-[9998] bg-black flex items-center justify-center">
              <div className="text-white text-xl font-medium animate-pulse">
                {t('game.loadingGame')}
              </div>
            </div>
          )}
          <iframe
            src={src}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        </>
      )}
    </div>
  );
}
