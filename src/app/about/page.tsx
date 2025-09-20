import { Metadata } from 'next';
import Link from 'next/link';
import { getMainGame } from '@/lib/api';
import { Gamepad2, Target, Users, Shield } from 'lucide-react';
import { MetadataGenerator } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const mainGameResult = await getMainGame();
  const mainGame = mainGameResult.success ? mainGameResult.data : null;
  return MetadataGenerator.generateAboutPageMetadata(mainGame);
}

export default async function AboutPage() {
  // Fetch main game data
  const mainGameResult = await getMainGame();
  const gameData = mainGameResult.success ? mainGameResult.data : null;

  // Fallback values if game data is not available
  const gameTitle = gameData?.title || 'Our Game';
  const gameDescription =
    gameData?.short_description ||
    'An amazing gaming experience that you can play directly in your browser.';

  return (
    <div className="min-h-screen bg-body">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Gamepad2 className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About {gameTitle}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {gameDescription}
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Target className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                To make gaming accessible to everyone by providing instant
                access to quality games without downloads or installations.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Community First
              </h2>
              <p className="text-muted-foreground">
                We believe in building a community of gamers who can easily
                discover, play, and share amazing gaming experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Safe Gaming
              </h2>
              <p className="text-muted-foreground">
                All games are carefully curated and tested to ensure
                they&apos;re safe, fun, and appropriate for our community.
              </p>
            </div>
          </div>
        </section>

        {/* Game Story Section */}
        <section className="bg-card rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            About {gameTitle}
          </h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              {gameTitle} is designed to be instantly playable in your web
              browser, with no downloads or installations required. Whether
              you&apos;re looking for a quick gaming break or an extended play
              session, this game delivers an engaging experience that&apos;s
              accessible to players of all skill levels.
            </p>
            <p className="mb-6">
              Built with modern web technology, {gameTitle} offers smooth
              gameplay and responsive controls that work seamlessly across
              desktop and mobile devices. Jump right in and discover what makes
              this game a favorite among players worldwide.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Accessibility
              </h3>
              <p className="text-muted-foreground">
                We believe gaming should be available to everyone, regardless of
                device, location, or technical expertise. Our platform is
                designed to work seamlessly across all modern browsers and
                devices.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Quality
              </h3>
              <p className="text-muted-foreground">
                Every game in our collection is carefully selected and tested.
                We prioritize user experience, performance, and fun factor to
                ensure you have the best possible gaming experience.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Innovation
              </h3>
              <p className="text-muted-foreground">
                We&apos;re constantly exploring new technologies and gaming
                trends to bring you cutting-edge experiences that push the
                boundaries of what&apos;s possible in a web browser.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Community
              </h3>
              <p className="text-muted-foreground">
                Gaming is more fun when shared. We&apos;re building features and
                experiences that connect players and foster a positive,
                inclusive gaming community.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-secondary rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Play {gameTitle}?
          </h2>
          <p className="text-gray-600 mb-6">
            Experience {gameTitle} for yourself and discover why players keep
            coming back. No downloads, no waiting – just instant gaming fun in
            your browser.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            <Gamepad2 className="w-5 h-5 mr-2" />
            Play {gameTitle} Now
          </Link>
        </section>
      </div>
    </div>
  );
}
