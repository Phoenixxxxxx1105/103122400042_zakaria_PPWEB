import { useCallback, useEffect, useMemo, useState } from 'react';
import { GAMES } from '../data/games';

const STORAGE_KEY = 'gamehub:favorites:v1';
const VALID_IDS = new Set(GAMES.map((game) => game.id));

function readFavorites() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((id) => typeof id === 'string' && VALID_IDS.has(id)))];
  } catch {
    // localStorage bisa diblokir (mode privat / kebijakan browser).
    return [];
  }
}

/**
 * Menyimpan daftar favorit di localStorage. Hanya ID game yang dikenal
 * yang disimpan — tidak ada data pribadi maupun kredensial.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => readFavorites());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Diamkan: favorit tetap berfungsi di sesi ini tanpa persistensi.
    }
  }, [favorites]);

  // Sinkronkan antar tab bila pengguna membuka GAMEHUB di beberapa tab.
  useEffect(() => {
    const sync = (event) => {
      if (event.key === STORAGE_KEY) setFavorites(readFavorites());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const toggleFavorite = useCallback((id) => {
    if (!VALID_IDS.has(id)) return false;
    let added = false;
    setFavorites((current) => {
      added = !current.includes(id);
      return added ? [...current, id] : current.filter((item) => item !== id);
    });
    return added;
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  return {
    favorites,
    favoriteSet,
    count: favorites.length,
    toggleFavorite,
    isFavorite,
  };
}
