'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Global error occurred:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-body flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-destructive-foreground" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Something went wrong
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              We encountered an unexpected error. This has been logged and our
              team has been notified. Please try refreshing the page or return
              to the homepage.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-left">
                <summary className="cursor-pointer text-destructive-foreground font-medium">
                  Error Details (Development Mode)
                </summary>
                <pre className="mt-2 text-sm text-destructive-foreground/90 whitespace-pre-wrap break-words">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg hover:bg-muted hover:border-border-strong transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Support Information */}
          <div className="mt-12 p-6 bg-warning/10 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If this error persists, please contact our support team with the
              following information:
            </p>
            <div className="text-xs text-muted-foreground bg-card p-3 rounded border border-border">
              <div>Error ID: {error.digest || 'Unknown'}</div>
              <div>Time: {new Date().toISOString()}</div>
              <div>
                User Agent:{' '}
                {typeof window !== 'undefined'
                  ? window.navigator.userAgent.slice(0, 50) + '...'
                  : 'Unknown'}
              </div>
            </div>
            <div className="mt-3">
              <Link
                href="/contact"
                className="text-primary hover:text-primary-hover font-medium text-sm"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
