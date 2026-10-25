import { GAMES } from '../data/games';
import GameImage from './GameImage';
import { GenreBadge, RatingBadge, TagBadge } from './GameBadges';
import { ArrowRightIcon, HeartIcon } from './Icon';

const NEW_RELEASES = GAMES.filter((game) => game.isNew);

export default function NewReleases({ onOpenGame, isFavorite, onToggleFavorite }) {
  return (
    <section
      className="scroll-mt-24 border-y border-hub-line bg-[#0b101b]/70 py-16 sm:py-20"
      id="new-releases"
      aria-labelledby="new-title"
    >
      <div className="hub-container">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Baru dirilis</p>
            <h2 className="section-title" id="new-title">
              RILIS BARU
            </h2>
          </div>
          <span className="editorial-note">Rilis &amp; rating editorial ★ GAMEHUB.</span>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {NEW_RELEASES.map((game, index) => (
            <article
              key={game.id}
              className="release-card"
              style={{ '--delay': `${index * 60}ms` }}
            >
              <div className="cover cover-portrait">
                <GameImage
                  src={game.cover}
                  alt={`Cover resmi ${game.title} (artwork lokal GAMEHUB)`}
                  variant="cover"
                  width="300"
                  height="450"
                />
                <TagBadge tag="BARU" />
                <RatingBadge rating={game.rating} source={game.ratingSource} />
              </div>

              <div className="release-info">
                <h3>{game.title}</h3>
                <p>
                  <GenreBadge>{game.genreLabel}</GenreBadge>
                </p>
                <ul className="card-meta">
                  <li>
                    <span aria-hidden="true">📅</span> {game.releaseDate}
                  </li>
                  <li>
                    <span aria-hidden="true">💾</span> {game.sizeLabel}
                  </li>
                </ul>

                <div className="mt-auto flex items-center gap-2 pt-3">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm flex-1"
                    onClick={() => onOpenGame(game.id)}
                  >
                    DETAIL
                    <ArrowRightIcon size={14} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    aria-pressed={isFavorite(game.id)}
                    aria-label={
                      isFavorite(game.id)
                        ? `Hapus ${game.title} dari favorit`
                        : `Tambahkan ${game.title} ke favorit`
                    }
                    onClick={() => onToggleFavorite(game.id)}
                  >
                    <HeartIcon size={16} filled={isFavorite(game.id)} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
