import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getSecondaryGames, getMainGame } from '@/lib/api';
import { getActiveSecondaryGames, isValidGameSlug } from '@/config';
import GameContent from '@/components/GameContent';
import { MetadataGenerator, JsonLdGenerator } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

// [ANCHOR: static-params-generation]
/**
 * Generate static params for all configured secondary games
 * This enables SSG for known games at build time
 */
export async function generateStaticParams() {
  const secondaryGames = getActiveSecondaryGames();

  return secondaryGames.map((game) => ({
    slug: game.slug,
  }));
}

// [ANCHOR: metadata-generation]
/**
 * Generate metadata for each game page
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // First check if this is a valid configured game slug
  if (!isValidGameSlug(slug)) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.',
    };
  }

  const gameResult = await getGameBySlug(slug);

  if (!gameResult.success || !gameResult.data) {
    return {
      title: 'Game Not Found',
      description: 'The requested game could not be found.',
    };
  }

  return MetadataGenerator.generateGamePageMetadata(gameResult.data);
}

// [ANCHOR: game-page-component]
/**
 * Secondary game page component
 * Renders individual game pages with SSG + ISR
 */
export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Validate slug against configuration
  if (!isValidGameSlug(slug)) {
    notFound();
  }

  // Fetch game data and related games in parallel
  const [gameResult, secondaryGamesResult, mainGameResult] = await Promise.all([
    getGameBySlug(slug, { cacheTtl: 3600 }), // 1 hour cache
    getSecondaryGames({ cacheTtl: 3600 }),
    getMainGame({ cacheTtl: 3600 }),
  ]);

  // Handle game not found
  if (!gameResult.success || !gameResult.data) {
    console.error(
      `Game not found for slug "${slug}":`,
      gameResult.success ? 'No data' : gameResult.error
    );
    notFound();
  }

  const game = gameResult.data;

  // Filter out current game from related games and add main game if different
  let relatedGames = secondaryGamesResult.success
    ? secondaryGamesResult.data.filter((g) => g.slug !== slug)
    : [];

  // Add main game to related games if it's not the current game
  if (
    mainGameResult.success &&
    mainGameResult.data &&
    mainGameResult.data.slug !== slug
  ) {
    relatedGames = [mainGameResult.data, ...relatedGames];
  }

  // Limit related games to 3 for better UX
  relatedGames = relatedGames.slice(0, 3);

  // Generate JSON-LD for game page
  const jsonLd = JsonLdGenerator.generateGameSchema(game, false);

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="min-h-screen bg-body">
        {/* Main content container */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <GameContent
            game={game}
            isMainGame={false}
            relatedGames={relatedGames}
            className="space-y-12"
          />
        </main>
      </div>
    </>
  );
}

// [ANCHOR: isr-config]
/**
 * ISR configuration
 * Revalidate every hour to keep content fresh
 */
export const revalidate = 3600;

/**
 * Dynamic params configuration
 * 'blocking' fallback for new games added after build
 */
export const dynamicParams = true;
