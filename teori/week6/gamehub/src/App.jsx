import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedGames from './components/FeaturedGames';
import GameCatalog from './components/GameCatalog';
import GameCategories from './components/GameCategories';
import NewReleases from './components/NewReleases';
import ScreenshotGallery from './components/ScreenshotGallery';
import DownloadCenter from './components/DownloadCenter';
import AboutSection from './components/AboutSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import GameDetailsModal from './components/GameDetailsModal';
import LoginModal from './components/LoginModal';
import ScreenshotLightbox from './components/ScreenshotLightbox';
import { useFavorites } from './hooks/useFavorites';
import { GAMES, getGameById } from './data/games';
import { initJQueryEffects } from './scripts/jquery-effects';

const SORTERS = {
  popularity: (a, b) => b.popularity - a.popularity,
  rating: (a, b) => b.rating - a.rating || b.popularity - a.popularity,
  newest: (a, b) => b.releaseISO.localeCompare(a.releaseISO),
  oldest: (a, b) => a.releaseISO.localeCompare(b.releaseISO),
  'size-asc': (a, b) => a.sizeGB - b.sizeGB,
  'size-desc': (a, b) => b.sizeGB - a.sizeGB,
};

function matchesQuery(game, needle) {
  if (!needle) return true;
  const haystack = [
    game.title,
    game.genreLabel,
    ...game.genres,
    game.developer,
    game.publisher,
    game.platform,
    game.description,
    game.shortDescription,
    ...game.features,
    String(game.releaseYear),
    game.tag,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
}

export default function App() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('Semua');
  const [sort, setSort] = useState('popularity');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const { favoriteSet, count: favoriteCount, toggleFavorite, isFavorite } = useFavorites();

  // Efek presentasi jQuery dipasang sekali dan dibersihkan saat App dilepas.
  useEffect(() => initJQueryEffects(), []);

  const dismissToast = useCallback(() => setToast(null), []);

  const notify = useCallback((message, tone = 'info') => {
    setToast({ id: Date.now(), message, tone });
  }, []);

  const filteredGames = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = GAMES.filter((game) => {
      if (favoritesOnly && !favoriteSet.has(game.id)) return false;
      if (genre !== 'Semua' && !game.genres.includes(genre)) return false;
      return matchesQuery(game, needle);
    });

    const sorter = SORTERS[sort] ?? SORTERS.popularity;
    return list.sort((a, b) => sorter(a, b) || a.title.localeCompare(b.title));
  }, [query, genre, sort, favoritesOnly, favoriteSet]);

  const selectedGame = selectedId ? getGameById(selectedId) : null;

  const scrollToCatalog = useCallback(() => {
    const target = document.getElementById('games');
    if (!target) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const handleToggleFavorite = useCallback(
    (id) => {
      const game = getGameById(id);
      const wasFavorite = favoriteSet.has(id);
      toggleFavorite(id);
      if (game) {
        notify(
          wasFavorite
            ? `${game.title} dihapus dari favorit.`
            : `${game.title} ditambahkan ke favorit — tersimpan di browser ini.`,
          wasFavorite ? 'info' : 'success',
        );
      }
    },
    [favoriteSet, notify, toggleFavorite],
  );

  const handleSelectGenre = useCallback(
    (nextGenre) => {
      setGenre(nextGenre);
      setFavoritesOnly(false);
      scrollToCatalog();
    },
    [scrollToCatalog],
  );

  const handleOpenFavorites = useCallback(() => {
    setFavoritesOnly(true);
    setGenre('Semua');
    setQuery('');
    scrollToCatalog();
  }, [scrollToCatalog]);

  const handleResetFilters = useCallback(() => {
    setQuery('');
    setGenre('Semua');
    setSort('popularity');
    setFavoritesOnly(false);
  }, []);

  const handleOpenLightbox = useCallback((images, index, title) => {
    setLightbox({ images, index, title });
  }, []);

  const handleNavigateLightbox = useCallback((direction) => {
    setLightbox((current) => {
      if (!current) return current;
      const total = current.images.length;
      return { ...current, index: (current.index + direction + total) % total };
    });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true" />

      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:rounded-lg focus:bg-hub-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        href="#main"
      >
        Lewati ke konten
      </a>

      <Navbar
        query={query}
        onQueryChange={setQuery}
        onSearchSubmit={scrollToCatalog}
        favoritesCount={favoriteCount}
        onOpenFavorites={handleOpenFavorites}
        onOpenLogin={() => setLoginOpen(true)}
      />

      <main id="main" tabIndex={-1}>
        <HeroSection />

        <FeaturedGames onOpenGame={setSelectedId} />

        <GameCatalog
          games={filteredGames}
          query={query}
          onQueryChange={setQuery}
          genre={genre}
          onGenreChange={setGenre}
          sort={sort}
          onSortChange={setSort}
          favoritesOnly={favoritesOnly}
          onToggleFavorites={() => setFavoritesOnly((current) => !current)}
          favoriteCount={favoriteCount}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onOpenGame={setSelectedId}
          onReset={handleResetFilters}
          totalCount={GAMES.length}
        />

        <GameCategories onSelectGenre={handleSelectGenre} activeGenre={genre} />

        <NewReleases
          onOpenGame={setSelectedId}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />

        <ScreenshotGallery onOpenLightbox={handleOpenLightbox} />

        <DownloadCenter />

        <AboutSection />

        <Newsletter notify={notify} />
      </main>

      <Footer onSelectGenre={handleSelectGenre} />

      <BackToTop />

      {selectedGame ? (
        <GameDetailsModal
          key={selectedGame.id}
          game={selectedGame}
          onClose={() => setSelectedId(null)}
          isFavorite={isFavorite(selectedGame.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenLightbox={handleOpenLightbox}
        />
      ) : null}

      {lightbox ? (
        <ScreenshotLightbox
          key={lightbox.title}
          images={lightbox.images}
          startIndex={lightbox.index}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
          onNavigate={handleNavigateLightbox}
        />
      ) : null}

      {loginOpen ? <LoginModal onClose={() => setLoginOpen(false)} /> : null}

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
