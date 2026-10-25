import GameCard from './GameCard';
import GameFilters from './GameFilters';
import { GamepadIcon, HeartIcon } from './Icon';
import { GENRES } from '../data/games';

export default function GameCatalog({
  games,
  query,
  onQueryChange,
  genre,
  onGenreChange,
  sort,
  onSortChange,
  favoritesOnly,
  onToggleFavorites,
  favoriteCount,
  isFavorite,
  onToggleFavorite,
  onOpenGame,
  onReset,
  totalCount,
}) {
  const genreLabel = GENRES.find((item) => item.id === genre)?.label ?? genre;

  return (
    <section
      className="scroll-mt-24 border-y border-hub-line bg-[#0b101b]/70 py-16 sm:py-20"
      id="popular"
      aria-labelledby="popular-title"
    >
      <div className="hub-container">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Paling dicintai pemain</p>
            <h2 className="section-title" id="popular-title">
              GAME POPULER
            </h2>
          </div>
          <span className="editorial-note">
            ★ rating &amp; ukuran file: editorial GAMEHUB · data resmi Steam, Okt 2026.
          </span>
        </header>

        <span className="block scroll-mt-28" id="games" aria-hidden="true" />

        <GameFilters
          query={query}
          onQueryChange={onQueryChange}
          genre={genre}
          onGenreChange={onGenreChange}
          sort={sort}
          onSortChange={onSortChange}
          favoritesOnly={favoritesOnly}
          onToggleFavorites={onToggleFavorites}
          favoriteCount={favoriteCount}
          resultCount={games.length}
          totalCount={totalCount}
          onReset={onReset}
        />

        <div id="game-results" className="mt-6 scroll-mt-28">
          {games.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {games.map((game, index) => (
                <GameCard
                  key={game.id}
                  game={game}
                  index={index}
                  isFavorite={isFavorite(game.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpen={onOpenGame}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-hub-line bg-hub-card/40 px-6 py-16 text-center">
              <span className="mb-4 inline-grid h-14 w-14 place-items-center rounded-2xl bg-hub-accent/15 text-hub-accent">
                {favoritesOnly ? <HeartIcon size={26} /> : <GamepadIcon size={26} />}
              </span>
              <h3 className="text-lg font-bold">
                {favoritesOnly && genre !== 'Semua'
                  ? `Belum ada favorit di genre ${genreLabel}`
                  : favoritesOnly
                    ? 'Belum ada game favorit'
                    : 'Tidak ada game yang cocok'}
              </h3>
              <p className="mt-2 max-w-md text-sm text-hub-muted">
                {favoritesOnly && genre !== 'Semua'
                  ? `Daftar favoritmu belum berisi judul ${genreLabel}. Pilih genre lain atau tekan SEMUA untuk melihat seluruh favorit.`
                  : favoritesOnly
                    ? 'Tekan ikon hati pada kartu game untuk menyimpannya ke favorit. Daftar favorit tersimpan di browser ini.'
                    : query.trim()
                    ? `Pencarian “${query.trim()}” tidak menemukan judul di genre ${genreLabel}. Coba kata kunci lain atau reset filter.`
                    : `Belum ada judul dengan genre ${genreLabel} di katalog lokal GAMEHUB. Coba genre lain.`}
              </p>
              <button type="button" className="btn btn-outline btn-sm mt-5" onClick={onReset}>
                Reset pencarian &amp; filter
              </button>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-hub-muted">
          Ukuran instalasi bisa berbeda antar versi, update, atau edisi. Data berasal dari halaman
          resmi yang tercatat pada sumber proyek (Okt 2026) dan seluruh artwork disimpan lokal.
        </p>
      </div>
    </section>
  );
}
