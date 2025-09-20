'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function OfflineIndicator() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(true);
  const [shouldLoadIndicator, setShouldLoadIndicator] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShouldLoadIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline || !shouldLoadIndicator) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-warning/20 border border-warning/40 text-warning-foreground px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-center">
          <WifiOff className="w-5 h-5 mr-3" />
          <div>
            <div className="font-medium">{t('offline.title')}</div>
            <div className="text-sm">{t('offline.message')}</div>
          </div>
          <button
            onClick={() => setShouldLoadIndicator(false)}
            className="ml-auto text-warning-foreground hover:text-warning-foreground/80"
            aria-label={t('action.dismiss')}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
