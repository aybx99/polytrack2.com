'use client';

import { useState, useEffect, useRef } from 'react';
import { strings } from '@/config/strings.config';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { isDesktopDevice, isMobileDevice } from '@/utils/platformDetection';
import GameIframeCore from './GameIframeCore';

// Lazy load mobile fullscreen component
const MobileFullScreenGame = dynamic(() => import('./MobileFullScreenGame'), {
  ssr: false,
});

// Import desktop banner component normally for debugging
import DesktopGameBanner from './DesktopGameBanner';

interface GameIframeProps {
  src: string;
  title: string;
  thumbnail?: string;
  className?: string;
  gameSlug?: string;
  initialRating?: number;
  initialRatingCount?: number;
}

export default function GameIframe({
  src,
  title,
  thumbnail,
  className = '',
  gameSlug,
  initialRating,
  initialRatingCount,
}: GameIframeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFullscreen, setShowMobileFullscreen] = useState(false);
  const [isIframeFullscreen, setIsIframeFullscreen] = useState(false);
  const [shouldGoFullscreenOnLoad, setShouldGoFullscreenOnLoad] =
    useState(false);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  // Check device type during render with SSR safety and proper updates
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Properly detect device type after mount
  useEffect(() => {
    setIsMounted(true);
    const shouldUseMobileMode = isMobileDevice();

    setIsMobile(shouldUseMobileMode);
    setIsDesktop(!shouldUseMobileMode);
  }, []);

  const handlePlayClick = () => {
    if (isMobileDevice()) {
      setShowMobileFullscreen(true);
    } else {
      setIsLoading(true);
      setIsPlaying(true);
    }
  };

  const handleCloseMobileFullscreen = () => {
    setShowMobileFullscreen(false);
  };

  const handleIframeLoad = async () => {
    setIsLoading(false);

    // If we should go fullscreen after load, do it now
    if (shouldGoFullscreenOnLoad && iframeContainerRef.current) {
      setShouldGoFullscreenOnLoad(false);
      try {
        if (iframeContainerRef.current.requestFullscreen) {
          await iframeContainerRef.current.requestFullscreen();
          setIsIframeFullscreen(true);
        }
      } catch (error) {
        console.error('Auto-fullscreen after load failed:', error);
      }
    }
  };

  const handleToggleFullscreen = async () => {
    try {
      if (isIframeFullscreen) {
        // Exit fullscreen
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsIframeFullscreen(false);
      } else {
        // Enter fullscreen
        if (!isPlaying) {
          // Game is not started yet - start it and mark for fullscreen when loaded
          setShouldGoFullscreenOnLoad(true);
          setIsLoading(true);
          setIsPlaying(true);
        } else if (iframeContainerRef.current) {
          // Game is already playing - go fullscreen now
          if (iframeContainerRef.current.requestFullscreen) {
            await iframeContainerRef.current.requestFullscreen();
            setIsIframeFullscreen(true);
          }
        }
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
      // Reset the flag if fullscreen failed
      setShouldGoFullscreenOnLoad(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsIframeFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Default thumbnail if none provided
  const gameThumbnail = thumbnail || '/api/placeholder/800/450';

  // Show mobile fullscreen when explicitly requested
  if (showMobileFullscreen) {
    return (
      <MobileFullScreenGame
        src={src}
        title={title}
        onClose={handleCloseMobileFullscreen}
      />
    );
  }

  if (!isPlaying) {
    return (
      <>
        <div className={`${className}`}>
          {/* Unified Game Card */}
          <div className="glass-medium rounded-lg shadow-lg overflow-hidden relative">
            {/* Game Play Button */}
            <div className="relative aspect-video overflow-hidden">
              {/* Elegant background gradient */}
              <div className="absolute inset-0 gradient-soft">
                <Image
                  src={gameThumbnail}
                  alt=""
                  fill
                  className="object-cover opacity-30 scale-110 blur-sm md:blur-md"
                  sizes="100vw"
                  priority
                />
                {/* Subtle overlay for clean design */}
                <div className="absolute inset-0 bg-background/10 backdrop-blur-sm" />
              </div>

              {/* Centered play interface */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
                {/* Game thumbnail in card - Hidden on very small screens */}
                <div className="hidden sm:block relative w-full max-w-48 sm:max-w-56 md:max-w-64 aspect-video rounded-xl overflow-hidden shadow-lg glass-medium hover-lift">
                  <Image
                    src={gameThumbnail}
                    alt={`${title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                </div>

                {/* Game title - Hidden on very small screens */}
                <h3 className="hidden sm:block heading-card sm:text-2xl md:text-3xl text-foreground text-center line-clamp-2 px-4">
                  {title}
                </h3>

                {/* Play button - Always visible with clean design */}
                <button
                  onClick={handlePlayClick}
                  className="group relative overflow-hidden gradient-game text-primary-foreground font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 transform-gpu focus-ring"
                  aria-label={`Play ${title}`}
                >
                  {/* Subtle hover effect */}
                  <div className="absolute inset-0 bg-primary-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Clean shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="font-semibold">
                      {strings.game.playNow}
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Desktop Game Banner - Moved to bottom with light divider */}
            {isDesktop && (
              <DesktopGameBanner
                gameTitle={title}
                gameSlug={gameSlug}
                isFullscreen={isIframeFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                initialRating={initialRating}
                initialRatingCount={initialRatingCount}
              />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`${className}`}>
        {/* Unified Game Card */}
        <div className="glass-medium rounded-lg shadow-lg overflow-hidden relative">
          {/* Game Container with Fullscreen Support */}
          <div
            ref={iframeContainerRef}
            style={
              isIframeFullscreen
                ? { width: '100vw', height: '100vh', backgroundColor: 'black' }
                : {}
            }
          >
            <GameIframeCore
              src={src}
              title={title}
              className={isIframeFullscreen ? 'fullscreen-iframe' : ''}
              onLoad={handleIframeLoad}
              isLoading={isLoading}
              isFullscreen={isIframeFullscreen}
            />
          </div>

          {/* Desktop Game Banner - Moved to bottom with light divider */}
          {isDesktop && (
            <DesktopGameBanner
              gameTitle={title}
              gameSlug={gameSlug}
              isFullscreen={isIframeFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              initialRating={initialRating}
              initialRatingCount={initialRatingCount}
            />
          )}
        </div>
      </div>
    </>
  );
}
