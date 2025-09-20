'use client';

import { strings } from '@/config/strings.config';

interface GameIframeCoreProps {
  src: string;
  title: string;
  className?: string;
  onLoad?: () => void;
  isLoading?: boolean;
  isFullscreen?: boolean;
}

export default function GameIframeCore({
  src,
  title,
  className = '',
  onLoad,
  isLoading = false,
  isFullscreen = false,
}: GameIframeCoreProps) {
  return (
    <div
      className={`relative overflow-hidden ${isFullscreen ? 'w-full h-full' : 'aspect-video rounded-lg border shadow-lg'} ${className}`}
      style={
        isFullscreen
          ? { width: '100%', height: '100%', backgroundColor: 'black' }
          : {}
      }
    >
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-foreground flex items-center justify-center z-20">
          <div className="text-background text-lg font-medium animate-pulse">
            {strings.game.loadingGame}
          </div>
        </div>
      )}

      {/* Game iframe */}
      <iframe
        src={src}
        title={title}
        onLoad={onLoad}
        className="w-full h-full relative z-10"
        allow="gamepad; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        style={{
          border: 'none',
          display: 'block',
        }}
        aria-label={strings.game.gameFrameLabel}
        loading="lazy"
      />
    </div>
  );
}
