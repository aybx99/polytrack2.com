import { Metadata } from 'next';
import { getServerTranslations } from '@/i18n/server';
import { siteConfig } from '@/config/site.config';
import { getMainGameConfig } from '@/config/games.config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read our Terms of Service to understand the rules and guidelines for using our online games.',
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms and conditions governing the use of our online games.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service',
    description: 'Terms and conditions governing the use of our online games.',
  },
};

export default async function TermsOfServicePage() {
  const { t } = await getServerTranslations();
  const contactEmail = siteConfig.contact.email;
  const legalDates = siteConfig.legal;
  const mainGame = getMainGameConfig();
  const gameName = mainGame.displayName || mainGame.slug;

  return (
    <div className="min-h-screen bg-body">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {legalDates.termsOfServiceLastUpdated}
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Agreement
              </h2>
              <p className="text-muted-foreground mb-4">
                By using this website and playing our games, you agree to these
                Terms of Service.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                <p className="text-muted-foreground font-semibold">
                  If you do not agree with these terms, please do not use our
                  website or games.
                </p>
              </div>
            </section>

            {/* Use of Games */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Use of Games
              </h2>
              <p className="text-muted-foreground mb-4">
                You may use our games for personal, non-commercial purposes
                only. You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Use our games for any illegal purposes</li>
                <li>Attempt to hack, cheat, or exploit our games</li>
                <li>Disrupt the game experience for other players</li>
                <li>Copy or distribute our games without permission</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Intellectual Property
              </h2>
              <p className="text-muted-foreground mb-4">
                All games, graphics, sounds, and other content on this website
                are protected by copyright and other intellectual property laws.
              </p>
              <p className="text-muted-foreground">
                You may not copy, distribute, or create derivative works from
                our content without written permission.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Disclaimer
              </h2>
              <p className="text-muted-foreground mb-4">
                Our games are provided &quot;as is&quot; without any warranties.
                We do not guarantee that our games will be error-free or
                available at all times.
              </p>
              <p className="text-muted-foreground">
                We are not responsible for any damages that may result from
                using our games or website.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Privacy
              </h2>
              <p className="text-muted-foreground mb-4">
                We collect minimal information when you use our games. Please
                see our Privacy Policy for details about how we handle your
                information.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Changes to Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                We may update these Terms of Service at any time. Changes will
                be posted on this page with a new date.
              </p>
              <p className="text-muted-foreground">
                By continuing to use our games after changes are made, you agree
                to the updated terms.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Contact
              </h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, contact us
                at:
              </p>
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> {contactEmail}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
