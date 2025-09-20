import Link from 'next/link';
import { getServerTranslations } from '@/i18n/server';
import { Gamepad2, Home, Search } from 'lucide-react';

export default async function NotFoundPage() {
  const { t } = await getServerTranslations();

  return (
    <div className="min-h-screen bg-body flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-8xl font-bold text-muted/30 mb-4">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Gamepad2 className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Oops! It looks like this page went on an adventure and got lost.
            Don&apos;t worry though - there are plenty of amazing games waiting
            for you!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="text-sm text-muted-foreground">
            Or explore our games directly:
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/"
              className="flex items-center justify-center px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-muted hover:border-border-strong transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse All Games
            </Link>
          </div>
        </div>

        {/* Helpful Message */}
        <div className="mt-12 p-6 bg-primary-light/10 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">
            Still Looking for Something?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you were looking for a specific game or page, try checking the
            navigation menu or contact us if you think there&apos;s a broken
            link.
          </p>
          <Link
            href="/contact"
            className="text-primary hover:text-primary-hover font-medium text-sm"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
