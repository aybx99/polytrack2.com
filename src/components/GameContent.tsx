import type { ProcessedGameData } from '@/lib/api';
import { strings } from '@/config/strings.config';
import GameIframe from './GameIframe';
import ServerRichContent from './ServerRichContent';
import StarRating from './StarRating';
import Image from 'next/image';
import Link from 'next/link';

interface GameContentProps {
  game: ProcessedGameData;
  isMainGame?: boolean;
  relatedGames?: ProcessedGameData[];
  className?: string;
}

export default async function GameContent({
  game,
  isMainGame = false,
  relatedGames = [],
  className = '',
}: GameContentProps) {
  return (
    <article className={`space-y-8 ${className}`}>
      {/* Game Header */}
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          {game.title}
        </h1>

        {/* Genre tags */}
        {game.genre && game.genre.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {game.genre.map((genreItem: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
              >
                {genreItem}
              </span>
            ))}
          </div>
        )}

        {/* Game Metadata */}
        {(game.developer || game.published_at) && (
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {game.developer && (
              <div className="flex items-center gap-1">
                <span className="font-medium">{strings.game.developer}:</span>
                <span>{game.developer}</span>
              </div>
            )}
            {game.published_at && (
              <div className="flex items-center gap-1">
                <span className="font-medium">
                  {strings.game.publishedDate}:
                </span>
                <span>
                  {new Date(game.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Game Rating - Shows frontend rating data */}
        <StarRating
          gameSlug={game.slug}
          gameTitle={game.title}
          initialRating={game.rating}
          initialRatingCount={game.ratingCount}
        />
      </header>

      {/* Game Thumbnail (only show if no iframe available) */}
      {game.thumbnail && !game.iframe_url && (
        <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <Image
            src={game.thumbnail}
            alt={`${game.title} game screenshot`}
            fill
            className="object-cover"
            priority={isMainGame}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      )}

      {/* Game Iframe - Client Component */}
      {game.iframe_url && (
        <section className="space-y-4">
          <GameIframe
            src={game.iframe_url}
            title={game.title}
            thumbnail={game.thumbnail}
            className="w-full"
            gameSlug={game.slug}
            initialRating={game.rating}
            initialRatingCount={game.ratingCount}
          />
        </section>
      )}

      {/* Main Game Content from WordPress */}
      {game.sanitized_content && (
        <section className="bg-card rounded-lg shadow-sm p-6 lg:p-8">
          <ServerRichContent
            content={game.sanitized_content}
            className="text-muted-foreground"
          />
        </section>
      )}

      {/* Related Games */}
      {relatedGames.length > 0 && (
        <section className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold text-foreground">
            {strings.game.relatedGames}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedGames.map((relatedGame) => (
              <Link
                key={relatedGame.slug}
                href={{ pathname: relatedGame.url_path }}
                className="group block bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                {relatedGame.thumbnail && (
                  <div className="relative aspect-video w-full rounded-t-lg overflow-hidden">
                    <Image
                      src={relatedGame.thumbnail}
                      alt={`${relatedGame.title} thumbnail`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {relatedGame.title}
                  </h3>
                  {relatedGame.short_description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {relatedGame.short_description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

// [ANCHOR: GameContent-exports]
