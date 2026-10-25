import { GENRES, GENRE_COUNTS } from '../data/games';
import { ArrowRightIcon } from './Icon';

export default function GameCategories({ onSelectGenre, activeGenre }) {
  return (
    <section className="py-16 sm:py-20" id="categories" aria-labelledby="categories-title">
      <div className="hub-container">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Temukan gaya bermainmu</p>
            <h2 className="section-title" id="categories-title">
              KATEGORI GAME
            </h2>
          </div>
          <span className="editorial-note">
            Jumlah judul dihitung langsung dari katalog lokal GAMEHUB.
          </span>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {GENRES.map((genre) => {
            const count = GENRE_COUNTS[genre.id] ?? 0;
            return (
              <button
                key={genre.id}
                type="button"
                className={`category-card text-left ${activeGenre === genre.id ? 'border-hub-accent/70' : ''}`}
                onClick={() => onSelectGenre(genre.id)}
                aria-label={`Saring katalog berdasarkan genre ${genre.label}, ${count} judul`}
              >
                <span className="category-icon" aria-hidden="true">
                  {genre.icon}
                </span>
                <h3 className="mt-2 flex items-center justify-between gap-2">
                  {genre.label.toUpperCase()}
                  <ArrowRightIcon size={14} className="text-hub-cyan" />
                </h3>
                <p>{count > 0 ? `${count} judul` : 'Belum ada judul'}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
