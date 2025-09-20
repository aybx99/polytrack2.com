'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/i18n';
import Image from 'next/image';
import {
  Share,
  Smartphone,
  Maximize,
  Minimize,
  Check,
  Star,
} from 'lucide-react';
import {
  getBookmarkShortcut,
  supportsWebShare,
  supportsClipboard,
} from '@/utils/platformDetection';
import QRCode from 'qrcode';
import { RatingInput } from './RatingInput';
import { useGameRating } from '@/hooks/useGameRating';

interface DesktopGameBannerProps {
  gameTitle: string;
  gameSlug?: string;
  isFullscreen?: boolean;
  onToggleFullscreen: () => void;
  initialRating?: number;
  initialRatingCount?: number;
  className?: string;
}

export default function DesktopGameBanner({
  gameTitle,
  gameSlug,
  isFullscreen = false,
  onToggleFullscreen,
  initialRating,
  initialRatingCount,
  className = '',
}: DesktopGameBannerProps) {
  const { t } = useTranslation();
  const [showQRCode, setShowQRCode] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [qrCodeLoading, setQrCodeLoading] = useState(false);

  // Use the rating hook directly here
  const { hasRated, userRating, saveRating } = useGameRating(
    gameSlug || gameTitle,
    initialRating,
    initialRatingCount
  );

  const bookmarkShortcut = getBookmarkShortcut();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const generateQRCode = async () => {
      if (!currentUrl) return;

      try {
        setQrCodeLoading(true);
        const qrDataUrl = await QRCode.toDataURL(currentUrl, {
          width: 192,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      } finally {
        setQrCodeLoading(false);
      }
    };

    generateQRCode();
  }, [currentUrl]);

  const handleShare = async () => {
    const shareData = {
      title: gameTitle,
      text: `${t('game.shareText')} ${gameTitle}`,
      url: currentUrl,
    };

    if (supportsWebShare() && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        console.log('Web Share API failed, falling back to clipboard');
      }
    }

    // Fallback: Copy to clipboard
    if (supportsClipboard() && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  const handleQRCodeToggle = () => {
    setShowQRCode(!showQRCode);
  };

  const handleRateClick = () => {
    setShowRatingModal(true);
  };

  const handleRatingSubmit = (rating: number) => {
    saveRating(rating);
    setShowRatingModal(false);
  };

  return (
    <>
      {/* Main Banner */}
      <div
        className={`hidden md:flex items-center justify-between p-4 border-t border-border/30 bg-card/50 ${className}`}
      >
        {/* Left Side: Bookmark Prompt */}
        <div className="flex items-center space-x-3">
          <div className="text-muted-foreground">
            {t('game.bookmarkPrompt').replace('{{shortcut}}', bookmarkShortcut)}
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md"
            aria-label={t('action.share')}
          >
            {linkCopied ? (
              <>
                <Check className="w-4 h-4 text-success-bright" />
                <span className="text-success-bright">
                  {t('action.linkCopied')}
                </span>
              </>
            ) : (
              <>
                <Share className="w-4 h-4" />
                <span>{t('action.share')}</span>
              </>
            )}
          </button>

          {/* Rate Button */}
          <button
            onClick={handleRateClick}
            className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md"
            aria-label={hasRated ? t('game.changeRating') : t('game.rateGame')}
          >
            <Star
              className={`w-4 h-4 ${hasRated ? 'fill-star text-star' : ''}`}
            />
            <span>{hasRated ? t('game.changeRating') : t('game.rate')}</span>
          </button>

          {/* QR Code / Phone Button */}
          <button
            onClick={handleQRCodeToggle}
            className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-secondary hover:text-secondary-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md"
            aria-label={t('action.phone')}
          >
            <Smartphone className="w-4 h-4" />
            <span>{t('action.phone')}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={onToggleFullscreen}
            className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md"
            aria-label={
              isFullscreen ? t('action.exitFullscreen') : t('action.fullscreen')
            }
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-4 h-4" />
                <span>{t('action.exitFullscreen')}</span>
              </>
            ) : (
              <>
                <Maximize className="w-4 h-4" />
                <span>{t('action.fullscreen')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-2xl p-6 max-w-sm mx-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t('game.scanToPlay')}
              </h3>

              {/* QR Code Display */}
              <div className="w-48 h-48 mx-auto bg-white border border-border rounded-lg flex items-center justify-center mb-4 p-2">
                {qrCodeLoading ? (
                  <div className="text-center text-muted-foreground">
                    <Smartphone className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                    <div className="text-sm">{t('game.generatingQR')}</div>
                  </div>
                ) : qrCodeDataUrl ? (
                  <Image
                    src={qrCodeDataUrl}
                    alt={`QR Code for ${gameTitle}`}
                    width={192}
                    height={192}
                    className="w-full h-full object-contain rounded"
                    unoptimized
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Smartphone className="w-12 h-12 mx-auto mb-2" />
                    <div className="text-sm">{t('game.qrUnavailable')}</div>
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground mb-4">
                {gameTitle}
              </div>

              <button
                onClick={() => setShowQRCode(false)}
                className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md"
              >
                {t('action.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <RatingInput
            isOpen={true}
            onClose={() => setShowRatingModal(false)}
            onSubmit={handleRatingSubmit}
            gameTitle={gameTitle}
            hasRated={hasRated}
            currentRating={userRating}
          />
        </div>
      )}
    </>
  );
}
