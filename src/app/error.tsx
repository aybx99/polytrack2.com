'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Page error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-body flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-destructive-foreground" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">
            We encountered an error while loading this page. Don&apos;t worry,
            it&apos;s not your fault! Please try again or return to the
            homepage.
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
        <div className="space-y-3">
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

        {/* Additional Help */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            If the problem persists, please{' '}
            <Link
              href="/contact"
              className="text-primary hover:text-primary-hover underline"
            >
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
