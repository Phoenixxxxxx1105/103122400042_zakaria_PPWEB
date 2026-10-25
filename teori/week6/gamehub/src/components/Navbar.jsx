import { useEffect, useRef, useState } from 'react';
import GameSearch from './GameSearch';
import { HeartIcon, UserIcon } from './Icon';

const NAV_LINKS = [
  { href: '#home', label: 'Beranda', section: 'home' },
  { href: '#games', label: 'Games', section: null },
  { href: '#categories', label: 'Kategori', section: 'categories' },
  { href: '#new-releases', label: 'Rilis Baru', section: 'new-releases' },
  { href: '#popular', label: 'Populer', section: 'popular' },
  { href: '#about', label: 'Tentang', section: 'about' },
];

export default function Navbar({
  query,
  onQueryChange,
  onSearchSubmit,
  favoritesCount,
  onOpenFavorites,
  onOpenLogin,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape' || !menuOpen) return;
      setMenuOpen(false);
      // Kembalikan fokus ke tombol menu agar pengguna keyboard tidak
      // kehilangan posisi setelah panel (visibility: hidden) ditutup.
      window.requestAnimationFrame(() => hamburgerRef.current?.focus());
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Sorot tautan navigasi sesuai section yang sedang terlihat.
  useEffect(() => {
    const sections = ['home', 'popular', 'categories', 'new-releases', 'about'];
    let frame = null;

    const updateActiveSection = () => {
      frame = null;
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      });

      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleNavigate = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav
        className="hub-container flex min-h-16 items-center gap-4 xl:min-h-[72px]"
        aria-label="Navigasi utama"
      >
        <a className="logo flex shrink-0 items-center gap-2.5" href="#home" aria-label="GAMEHUB beranda">
          <span className="logo-mark" aria-hidden="true">
            G
          </span>
          <span className="text-lg font-black tracking-[0.14em] lg:text-xl">
            GAME<span className="text-gradient">HUB</span>
          </span>
        </a>

        <button
          type="button"
          className="hamburger ml-auto xl:hidden"
          ref={hamburgerRef}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="primary-navigation" className={`nav-panel${menuOpen ? ' is-open' : ''}`}>
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  className="nav-link"
                  href={link.href}
                  aria-current={activeSection === link.section ? 'location' : undefined}
                  onClick={handleNavigate}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
            <div className="w-full lg:w-[230px] xl:w-[240px] 2xl:w-[290px]">
              <GameSearch
                id="navbar-search"
                value={query}
                onChange={onQueryChange}
                onSubmit={() => {
                  setMenuOpen(false);
                  onSearchSubmit?.();
                }}
                placeholder="Cari game, genre…"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-outline btn-sm nav-favorites"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenFavorites();
                }}
                aria-label={`Buka favorit (${favoritesCount} game)`}
              >
                <HeartIcon size={15} filled={favoritesCount > 0} />
                <span>FAVORIT</span>
                <span className="nav-favorites-count" aria-hidden="true">
                  {favoritesCount}
                </span>
              </button>

              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenLogin();
                }}
              >
                <UserIcon size={15} />
                MASUK
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
