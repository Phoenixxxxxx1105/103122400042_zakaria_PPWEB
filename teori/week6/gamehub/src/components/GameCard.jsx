import GameImage from './GameImage';
import { GenreBadge, RatingBadge, TagBadge } from './GameBadges';
import { HeartIcon, InfoIcon } from './Icon';

export default function GameCard({ game, index = 0, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <article
      className="game-card tilt-card"
      data-tilt
      style={{ '--delay': `${Math.min(index, 11) * 45}ms` }}
    >
      <div className="cover cover-portrait">
        <GameImage
          src={game.cover}
          alt={`Cover resmi ${game.title} (artwork lokal GAMEHUB)`}
          variant="cover"
          width="300"
          height="450"
        />
        <TagBadge tag={game.tag} />
        <RatingBadge rating={game.rating} source={game.ratingSource} />

        <div className="cover-overlay">
          <GameImage
            src={game.capsule}
            alt=""
            className="max-w-[170px] rounded-lg"
            width="231"
            height="87"
          />
          <p className="overlay-info">
            {game.developer} · {game.platform}
          </p>
          <button type="button" className="btn btn-sm" onClick={() => onOpen(game.id)}>
            LIHAT DETAIL
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title" title={game.title}>
          {game.title}
        </h3>
        <p>
          <GenreBadge>{game.genreLabel}</GenreBadge>
        </p>
        <ul className="card-meta">
          <li>
            <span aria-hidden="true">💾</span> {game.sizeLabel}
          </li>
          <li>
            <span aria-hidden="true">📅</span> {game.releaseYear}
          </li>
          <li>
            <span aria-hidden="true">⭐</span> {game.rating.toFixed(1)}
          </li>
        </ul>

        <div className="card-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => onOpen(game.id)}
            aria-label={`Lihat detail ${game.title}`}
          >
            <InfoIcon size={14} />
            DETAIL
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => onToggleFavorite(game.id)}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Hapus ${game.title} dari favorit`
                : `Tambahkan ${game.title} ke favorit`
            }
            title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <HeartIcon size={16} filled={isFavorite} />
          </button>
        </div>
      </div>
    </article>
  );
}
