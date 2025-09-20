import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMainGame, getSecondaryGames } from '@/lib/api';
import GameContent from '@/components/GameContent';
import { MetadataGenerator, JsonLdGenerator } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

// [ANCHOR: metadata-generation]
export async function generateMetadata(): Promise<Metadata> {
  const gameResult = await getMainGame();

  if (!gameResult.success || !gameResult.data) {
    return MetadataGenerator.generateDefaultpageMetadata();
  }

  const game = gameResult.data;

  return MetadataGenerator.generateGamePageMetadata(game);
}

// [ANCHOR: homepage-component]
export default async function HomePage() {
  // Fetch main game and secondary games in parallel
  const [mainGameResult, secondaryGamesResult] = await Promise.all([
    getMainGame({ cacheTtl: 3600 }), // 1 hour cache
    getSecondaryGames({ cacheTtl: 3600 }),
  ]);

  // Handle main game not found
  if (!mainGameResult.success || !mainGameResult.data) {
    console.error(
      'Main game not found:',
      mainGameResult.success ? 'No data' : 'API error'
    );
    notFound();
  }

  const mainGame = mainGameResult.data;
  const secondaryGames = secondaryGamesResult.success
    ? secondaryGamesResult.data
    : [];

  // Generate JSON-LD for homepage
  const jsonLd = JsonLdGenerator.generateGameSchema(mainGame, true);

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="min-h-screen bg-body">
        {/* Main content container */}
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <GameContent
            game={mainGame}
            isMainGame={true}
            relatedGames={secondaryGames}
            className="space-y-12"
          />
        </main>
      </div>
    </>
  );
}

// [ANCHOR: isr-config]
export const revalidate = 3600; // Revalidate every hour
