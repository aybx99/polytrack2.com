import { Metadata } from 'next';
import Link from 'next/link';
import { getMainGame } from '@/lib/api';
import {
  Zap,
  Target,
  Users,
  Shield,
  Gauge,
  Trophy,
  Rocket,
} from 'lucide-react';
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
            <div className="relative">
              <Zap className="w-16 h-16 text-primary neon-glow" />
              <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <h1 className="heading-hero mb-6 neon-glow">About {gameTitle}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-inter">
            {gameDescription}
          </p>
        </div>

        {/* Racing Features Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center glass-medium p-6 rounded-lg racing-border">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Gauge className="w-12 h-12 text-primary" />
                  <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-lg"></div>
                </div>
              </div>
              <h2 className="heading-card mb-3">High Speed Racing</h2>
              <p className="text-muted-foreground font-inter">
                Experience lightning-fast racing action with cutting-edge
                physics and responsive controls that put you in the
                driver&apos;s seat.
              </p>
            </div>

            <div className="text-center glass-medium p-6 rounded-lg racing-border">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Trophy className="w-12 h-12 text-primary" />
                  <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-lg"></div>
                </div>
              </div>
              <h2 className="heading-card mb-3">Competitive Edge</h2>
              <p className="text-muted-foreground font-inter">
                Master challenging tracks, beat your best times, and climb the
                leaderboards in this ultimate test of racing skill.
              </p>
            </div>

            <div className="text-center glass-medium p-6 rounded-lg racing-border">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Rocket className="w-12 h-12 text-primary" />
                  <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-lg"></div>
                </div>
              </div>
              <h2 className="heading-card mb-3">Instant Access</h2>
              <p className="text-muted-foreground font-inter">
                Jump straight into the action with no downloads or
                installations. Pure browser-based racing at its finest.
              </p>
            </div>
          </div>
        </section>

        {/* Racing Story Section */}
        <section className="glass-medium rounded-lg p-8 mb-16 racing-border">
          <h2 className="heading-section mb-6">The {gameTitle} Experience</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6 font-inter text-lg leading-relaxed">
              {gameTitle} delivers an adrenaline-fueled racing experience that
              pushes the boundaries of browser-based gaming. With
              precision-engineered physics, responsive controls, and stunning
              visual effects, every race feels authentic and exhilarating.
            </p>
            <p className="mb-6 font-inter text-lg leading-relaxed">
              Built with cutting-edge web technology, {gameTitle} offers
              seamless performance across all devices. Whether you&apos;re
              navigating tight corners, hitting boost pads, or competing for the
              fastest lap time, the game responds instantly to your every move.
            </p>
            <p className="font-inter text-lg leading-relaxed">
              Join the racing revolution and experience what makes {gameTitle}{' '}
              the ultimate destination for speed enthusiasts and casual racers
              alike.
            </p>
          </div>
        </section>

        {/* Racing Technology Section */}
        <section className="mb-16">
          <h2 className="heading-section text-center mb-12">
            Racing Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-medium rounded-lg p-6 racing-border">
              <h3 className="heading-card mb-3">Universal Compatibility</h3>
              <p className="text-muted-foreground font-inter">
                Race on any device, anywhere. Our advanced engine delivers
                consistent high-performance gaming across desktop, tablet, and
                mobile browsers without compromise.
              </p>
            </div>

            <div className="glass-medium rounded-lg p-6 racing-border">
              <h3 className="heading-card mb-3">Precision Engineering</h3>
              <p className="text-muted-foreground font-inter">
                Every aspect is meticulously crafted for racing perfection. From
                physics simulation to control responsiveness, we prioritize the
                ultimate competitive racing experience.
              </p>
            </div>

            <div className="glass-medium rounded-lg p-6 racing-border">
              <h3 className="heading-card mb-3">Next-Gen Performance</h3>
              <p className="text-muted-foreground font-inter">
                Powered by cutting-edge web technologies, we push the limits of
                browser gaming with smooth 60fps gameplay, realistic physics,
                and stunning visual effects.
              </p>
            </div>

            <div className="glass-medium rounded-lg p-6 racing-border">
              <h3 className="heading-card mb-3">Racing Community</h3>
              <p className="text-muted-foreground font-inter">
                Connect with fellow speed enthusiasts, share racing strategies,
                and compete for the fastest times in our growing community of
                racing champions.
              </p>
            </div>
          </div>
        </section>

        {/* Racing CTA Section */}
        <section className="text-center glass-medium rounded-lg p-8 racing-border">
          <h2 className="heading-section mb-4 neon-glow">Ready to Race?</h2>
          <p className="text-muted-foreground mb-6 font-inter text-lg">
            Start your engines and experience {gameTitle} now. Feel the rush of
            high-speed racing with no downloads, no waiting – just pure
            adrenaline-fueled action in your browser.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 gradient-cta text-white font-heading font-semibold rounded-lg hover:scale-105 transition-all duration-200 racing-border uppercase tracking-wider"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Racing Now
          </Link>
        </section>
      </div>
    </div>
  );
}
