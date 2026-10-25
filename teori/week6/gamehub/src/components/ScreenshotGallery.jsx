import { GALLERY_IDS, getGameById } from '../data/games';
import GameImage from './GameImage';
import { ImageIcon } from './Icon';

const SHOTS = GALLERY_IDS.flatMap((id) => {
  const game = getGameById(id);
  if (!game) return [];
  return game.screenshots
    .slice(0, 2)
    .map((shot, shotIndex) => ({ ...shot, shotIndex, game }));
});

export default function ScreenshotGallery({ onOpenLightbox }) {
  return (
    <section className="py-16 sm:py-20" id="gallery" aria-labelledby="gallery-title">
      <div className="hub-container">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Lihat lebih dekat</p>
            <h2 className="section-title" id="gallery-title">
              GALERI GAME
            </h2>
          </div>
          <span className="editorial-note flex items-center gap-1.5">
            <ImageIcon size={14} /> Klik gambar untuk memperbesar · semua file lokal
          </span>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SHOTS.map((shot, index) => (
            <figure
              key={`${shot.game.id}-${shot.src}`}
              className="shot"
              onClick={() => onOpenLightbox(shot.game.screenshots, shot.shotIndex, shot.game.title)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onOpenLightbox(shot.game.screenshots, shot.shotIndex, shot.game.title);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Perbesar screenshot ${shot.game.title} ${shot.shotIndex + 1}`}
            >
              <GameImage src={shot.src} alt={shot.alt} width="800" height="500" />
              <figcaption>
                <span className="badge badge-genre">{shot.game.genreLabel}</span>
                {shot.game.title}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-5 text-xs text-hub-muted">
          Screenshot dan banner berasal dari artwork lokal yang disertakan pada proyek. Tidak ada
          gambar yang dimuat dari URL eksternal.
        </p>
      </div>
    </section>
  );
}
