/**
 * Error Fallback Components
 *
 * Graceful error handling UI components for API failures
 */

'use client';

import Link from 'next/link';
import { ApiError } from '@/lib/types/game.types';
import { useTranslation } from '@/i18n';

// [ANCHOR: error-fallback-types]
interface ErrorFallbackProps {
  error: ApiError;
  retry?: () => void;
  minimal?: boolean;
}

interface GameNotFoundProps {
  slug: string;
  isMainGame?: boolean;
}

// [ANCHOR: main-error-fallback]
/**
 * Generic error fallback component
 */
export function ErrorFallback({
  error,
  retry,
  minimal = false,
}: ErrorFallbackProps) {
  const { t } = useTranslation();

  if (minimal) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="text-destructive-foreground text-sm">
          {getErrorMessage(error, t)}
        </p>
        {retry && (
          <button
            onClick={retry}
            className="mt-2 text-destructive hover:text-destructive-foreground text-sm underline"
          >
            {t('action.tryAgain')}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
        <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-destructive-foreground mb-2">
          {getErrorTitle(error, t)}
        </h3>

        <p className="text-destructive-foreground/90 mb-4">
          {getErrorMessage(error, t)}
        </p>

        {retry && (
          <button
            onClick={retry}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {t('action.tryAgain')}
          </button>
        )}

        {process.env.NODE_ENV === 'development' && error.details && (
          <details className="mt-4 text-left">
            <summary className="text-destructive cursor-pointer text-sm">
              Debug Info
            </summary>
            <pre className="mt-2 text-xs text-destructive-foreground bg-destructive/10 p-2 rounded overflow-auto">
              {JSON.stringify(error.details, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

// [ANCHOR: game-not-found]
/**
 * Game not found specific error component
 */
export function GameNotFound({ slug, isMainGame = false }: GameNotFoundProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="bg-warning/10 border border-warning/20 rounded-xl p-6">
        <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-warning-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.41-1.044-5.709-2.709M12 3c-1.268 0-2.39.63-3.068 1.593a3.746 3.746 0 00-.932 2.477v1.86M12 3c1.268 0 2.39.63 3.068 1.593.09.128.198.234.296.353M12 21v-9"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-warning-foreground mb-2">
          {isMainGame ? t('error.loadingFailed') : t('error.gameNotFound')}
        </h3>

        <p className="text-warning-foreground/90 mb-4">
          {isMainGame ? t('error.serverError') : t('error.gameNotFound')}
        </p>

        {!isMainGame && (
          <Link
            href="/"
            className="inline-block bg-warning hover:bg-warning/90 text-warning-foreground font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {t('action.goHome')}
          </Link>
        )}
      </div>
    </div>
  );
}

// [ANCHOR: loading-fallback]
/**
 * Loading state component
 */
export function LoadingFallback({ message }: { message?: string }) {
  const { t } = useTranslation();
  const displayMessage = message || t('game.loadingGame');

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-primary animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>

        <p className="text-primary font-medium">{displayMessage}</p>
      </div>
    </div>
  );
}

// [ANCHOR: network-error]
/**
 * Network error specific component
 */
export function NetworkError({ retry }: { retry?: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="bg-muted border border-border rounded-xl p-6">
        <div className="w-12 h-12 bg-muted-dark rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t('error.connectionError')}
        </h3>

        <p className="text-muted-foreground mb-4">
          {t('error.connectionError')}
        </p>

        {retry && (
          <button
            onClick={retry}
            className="bg-muted-foreground hover:bg-foreground text-background font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {t('action.tryAgain')}
          </button>
        )}
      </div>
    </div>
  );
}

// [ANCHOR: error-helper-functions]
/**
 * Get user-friendly error title based on error type
 */
function getErrorTitle(error: ApiError, t: (key: any) => string): string {
  switch (error.code) {
    case 'NOT_FOUND':
      return t('error.gameNotFound');
    case 'NETWORK_ERROR':
      return t('error.connectionError');
    case 'GRAPHQL_ERROR':
      return t('error.serverError');
    case 'VALIDATION_ERROR':
      return t('error.invalidData');
    default:
      return t('error.genericError');
  }
}

/**
 * Get user-friendly error message
 */
function getErrorMessage(error: ApiError, t: (key: any) => string): string {
  switch (error.code) {
    case 'NOT_FOUND':
      return t('error.gameNotFound');
    case 'NETWORK_ERROR':
      return t('error.connectionError');
    case 'GRAPHQL_ERROR':
      return t('error.serverError');
    case 'VALIDATION_ERROR':
      return t('error.invalidData');
    default:
      return error.message || t('error.genericError');
  }
}
