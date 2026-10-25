import { getGameById } from '../data/games';
import GameImage from './GameImage';
import { DownloadIcon } from './Icon';

const ASSETS = [
  {
    gameId: 'cyberpunk-2077',
    label: 'Banner Cyberpunk 2077',
    file: 'header.webp',
    filename: 'gamehub-cyberpunk-2077-banner.webp',
    note: 'Banner lanskap · WebP',
  },
  {
    gameId: 'elden-ring',
    label: 'Cover Elden Ring',
    file: 'cover.webp',
    filename: 'gamehub-elden-ring-cover.webp',
    note: 'Cover potret · WebP',
  },
  {
    gameId: 'black-myth-wukong',
    label: 'Screenshot Black Myth: Wukong',
    file: 'ss-1.webp',
    filename: 'gamehub-black-myth-wukong-screenshot.webp',
    note: 'Screenshot 16:9 · WebP',
  },
];

export default function DownloadCenter() {
  return (
    <section
      className="scroll-mt-24 border-y border-hub-line bg-[#0b101b]/70 py-16 sm:py-20"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="hub-container">
        <div className="download-card">
          <p className="eyebrow">Pusat aset lokal</p>
          <h2 className="section-title section-title-center" id="download-title">
            UNDUH ASET GAMEHUB
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-300">
            Semua artwork pada katalog ini tersedia lokal. Kamu bisa menyimpan banner, cover, atau
            screenshot langsung dari browser — tanpa membuka situs lain dan tanpa mengunduh file
            game.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {ASSETS.map((asset) => {
              const game = getGameById(asset.gameId);
              if (!game) return null;
              const href = `images/games/${game.id}/${asset.file}`;
              return (
                <a
                  key={asset.filename}
                  className="store-tile"
                  href={href}
                  download={asset.filename}
                  aria-label={`Unduh ${asset.label} (lokal)`}
                >
                  <GameImage
                    src={href}
                    alt=""
                    className="mb-2 aspect-video w-full rounded-lg object-cover"
                    width="231"
                    height="87"
                  />
                  <strong className="flex items-center gap-2">
                    <DownloadIcon size={14} className="text-hub-cyan" />
                    {asset.label}
                  </strong>
                  <span>{asset.note}</span>
                  <small className="text-[0.68rem] text-hub-muted">Tersimpan dari proyek lokal</small>
                </a>
              );
            })}
          </div>

          <dl className="info-grid">
            <div>
              <dt>Jumlah aset</dt>
              <dd>112 file WebP</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>WebP lokal</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Windows PC</dd>
            </div>
            <div>
              <dt>Sumber</dt>
              <dd>Folder proyek</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Demo edukasi</dd>
            </div>
          </dl>

          <details className="accordion">
            <summary>Informasi penting</summary>
            <p className="pb-1 text-xs leading-relaxed text-hub-muted">
              GAMEHUB tidak meng-host file game, tidak menyediakan tautan pembelian, dan tidak
              mengirim data ke server mana pun. Tombol unduh di atas hanya menyimpan artwork lokal
              yang sudah ada di folder <code>public/images</code>. Hak atas artwork dan merek game
              tetap milik pemiliknya masing-masing.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
