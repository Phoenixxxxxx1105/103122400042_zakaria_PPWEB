import { GENRES } from '../data/games';

const QUICK_LINKS = [
  { href: '#home', label: 'Beranda' },
  { href: '#games', label: 'Games' },
  { href: '#categories', label: 'Kategori' },
  { href: '#new-releases', label: 'Rilis Baru' },
  { href: '#gallery', label: 'Galeri' },
];

const HELP_LINKS = [
  { href: '#about', label: 'Tentang GAMEHUB' },
  { href: '#download', label: 'Pusat aset lokal' },
  { href: '#newsletter', label: 'Newsletter demo' },
];

export default function Footer({ onSelectGenre }) {
  return (
    <footer className="border-t border-hub-line bg-[#070a10]">
      <div className="hub-container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a className="logo inline-flex items-center gap-2.5" href="#home" aria-label="GAMEHUB beranda">
            <span className="logo-mark" aria-hidden="true">
              G
            </span>
            <span className="text-lg font-black tracking-[0.14em]">
              GAME<span className="text-gradient">HUB</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-hub-muted">
            Katalog game PC lokal dengan informasi terkurasi, artwork tersimpan di proyek, dan
            antarmuka React yang responsif.
          </p>
          <p className="editorial-note mt-3 block max-w-[280px]">
            Proyek demo untuk tugas PPWEB. Tidak ada akun, transaksi, atau layanan pihak ketiga.
          </p>
        </div>

        <nav aria-label="Tautan cepat">
          <h3 className="footer-title">Link cepat</h3>
          <ul className="mt-3 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a className="footer-link" href={link.href} data-jq-scroll>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="footer-title">Genre</h3>
          <ul className="mt-3 space-y-2">
            {GENRES.slice(0, 6).map((genre) => (
              <li key={genre.id}>
                <button
                  type="button"
                  className="footer-link text-left"
                  onClick={() => onSelectGenre(genre.id)}
                >
                  {genre.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Bantuan">
          <h3 className="footer-title">Bantuan</h3>
          <ul className="mt-3 space-y-2">
            {HELP_LINKS.map((link) => (
              <li key={link.href}>
                <a className="footer-link" href={link.href} data-jq-scroll>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.68rem] leading-relaxed text-hub-muted">
            Data lokal · React + Vite + Tailwind CSS + jQuery
          </p>
        </nav>
      </div>

      <div className="border-t border-hub-line py-5">
        <div className="hub-container flex flex-col gap-2 pr-16 text-[0.7rem] text-hub-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GAMEHUB. Hak masing-masing pemilik konten game tetap dihormati.</p>
          <p className="max-w-xl">
            Informasi &amp; rating bersifat editorial. Tidak ada tautan eksternal, API, atau
            pengiriman data pengguna.
          </p>
        </div>
      </div>
    </footer>
  );
}
