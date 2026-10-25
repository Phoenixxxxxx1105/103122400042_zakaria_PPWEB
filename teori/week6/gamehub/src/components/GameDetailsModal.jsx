import { useState } from 'react';
import { useDialog } from '../hooks/useDialog';
import GameImage from './GameImage';
import { GenreBadge, RatingBadge, TagBadge } from './GameBadges';
import { CheckIcon, CloseIcon, DownloadIcon, HeartIcon } from './Icon';

const TABS = [
  { id: 'info', label: 'Informasi' },
  { id: 'specs', label: 'Spesifikasi' },
  { id: 'gallery', label: 'Screenshot' },
];

const REQ_ROWS = [
  ['os', 'OS'],
  ['processor', 'Prosesor'],
  ['ram', 'RAM'],
  ['gpu', 'GPU'],
  ['directx', 'DirectX'],
  ['storage', 'Penyimpanan'],
];

function RequirementTable({ title, requirements, idSuffix }) {
  return (
    <div>
      <h3 className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-hub-cyan" id={`${idSuffix}-title`}>
        {title}
      </h3>
      <table className="req-table" aria-labelledby={`${idSuffix}-title`}>
        <tbody>
          {REQ_ROWS.map(([key, label]) => (
            <tr key={key}>
              <th scope="row">{label}</th>
              <td>{requirements[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GameDetailsModal({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenLightbox,
}) {
  const [tab, setTab] = useState('info');
  const { panelRef, closeRef } = useDialog(onClose);

  // Pola tablist WAI-ARIA: panah kiri/kanan, Home, dan End memindahkan
  // fokus sekaligus mengaktifkan tab. Hanya tab aktif yang masuk urutan Tab.
  const handleTabKeyDown = (event) => {
    const currentIndex = TABS.findIndex((item) => item.id === tab);
    const lastIndex = TABS.length - 1;
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    else if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lastIndex;

    if (nextIndex === null) return;
    event.preventDefault();
    const nextTab = TABS[nextIndex];
    setTab(nextTab.id);
    document.getElementById(`tab-${nextTab.id}`)?.focus();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-modal-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="pointer-events-none sticky top-3 z-20 flex h-0 justify-end pr-3">
          <button
            type="button"
            className="modal-close !static pointer-events-auto"
            onClick={onClose}
            aria-label="Tutup detail game"
            ref={closeRef}
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="modal-banner">
          <GameImage
            src={game.banner}
            alt={`Banner resmi ${game.title}`}
            width="460"
            height="215"
            loading="lazy"
          />
        </div>

        <div className="p-5 sm:p-7">
          <div className="badge-row">
            <GenreBadge>{game.genreLabel}</GenreBadge>
            <RatingBadge rating={game.rating} source={game.ratingSource} />
            <TagBadge tag={game.tag} />
            <span className="badge badge-verified">
              <span aria-hidden="true">✓</span> DATA LOKAL
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl" id="game-modal-title">
            {game.title}
          </h2>
          <p className="mt-1 text-sm text-hub-cyan">{game.tagline}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">{game.description}</p>

          <dl className="fact-list fact-list-3 mt-5 rounded-xl border border-hub-line bg-white/[0.03] p-4">
            <div>
              <dt>Developer</dt>
              <dd>{game.developer}</dd>
            </div>
            <div>
              <dt>Publisher</dt>
              <dd>{game.publisher}</dd>
            </div>
            <div>
              <dt>Rilis</dt>
              <dd>{game.releaseDate}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>{game.platform}</dd>
            </div>
            <div>
              <dt>Ukuran</dt>
              <dd>{game.sizeLabel}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>★ {game.rating.toFixed(1)} / 5</dd>
            </div>
          </dl>

          <div
            className="mt-6 flex flex-wrap gap-2 border-b border-hub-line pb-3 modal-tabs"
            role="tablist"
            aria-label="Bagian detail game"
            onKeyDown={handleTabKeyDown}
          >
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={tab === item.id}
                aria-controls={`panel-${item.id}`}
                tabIndex={tab === item.id ? 0 : -1}
                className="modal-tab"
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === 'info' ? (
            <div className="mt-4" role="tabpanel" id="panel-info" aria-labelledby="tab-info" tabIndex={0}>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-hub-cyan">Fitur utama</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                {game.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckIcon size={15} className="mt-0.5 shrink-0 text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-hub-line bg-white/[0.03] p-4 text-xs leading-relaxed text-hub-muted">
                <strong className="text-slate-200">Sumber data lokal.</strong> Informasi developer,
                publisher, tanggal rilis, ukuran, dan rating editorial diambil dari data proyek
                GAMEHUB. Rating ★ adalah penilaian editorial GAMEHUB, bukan skor resmi toko.
              </div>
            </div>
          ) : null}

          {tab === 'specs' ? (
            <div className="mt-4" role="tabpanel" id="panel-specs" aria-labelledby="tab-specs" tabIndex={0}>
              <div className="grid gap-5 lg:grid-cols-2">
                <RequirementTable
                  title="Persyaratan minimum"
                  requirements={game.requirements.minimum}
                  idSuffix={`min-${game.id}`}
                />
                <RequirementTable
                  title="Persyaratan rekomendasi"
                  requirements={game.requirements.recommended}
                  idSuffix={`rec-${game.id}`}
                />
              </div>

              {game.requirements.verified ? (
                <p className="req-note">
                  Sumber: {game.requirements.source}. Spesifikasi dapat berubah lewat pembaruan;
                  cek sumber resmi untuk data terkini.
                </p>
              ) : (
                <p className="req-warning" role="note">
                  <span aria-hidden="true">⚠</span>
                  <span>
                    Data contoh: spesifikasi untuk game ini belum terverifikasi pada sumber proyek.
                    Anggap sebagai perkiraan editorial GAMEHUB, bukan kutipan resmi.
                  </span>
                </p>
              )}
            </div>
          ) : null}

          {tab === 'gallery' ? (
            <div className="mt-4" role="tabpanel" id="panel-gallery" aria-labelledby="tab-gallery" tabIndex={0}>
              <div className="grid gap-3 sm:grid-cols-2">
                {game.screenshots.map((shot, index) => (
                  <button
                    key={shot.src}
                    type="button"
                    className="shot group text-left"
                    onClick={() => onOpenLightbox(game.screenshots, index, game.title)}
                    aria-label={`Perbesar ${shot.alt}`}
                  >
                    <GameImage src={shot.src} alt={shot.alt} width="800" height="500" />
                    <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 text-transparent transition group-hover:bg-black/35 group-hover:text-white">
                      <span className="text-xs font-bold uppercase tracking-[0.14em]">Perbesar</span>
                    </span>
                  </button>
                ))}
              </div>
              <p className="req-note">
                Semua screenshot tersedia lokal di <code>public/images/games/{game.id}/</code>.
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hub-line pt-4">
            <button
              type="button"
              className={`btn btn-sm ${isFavorite ? 'btn-outline' : ''}`}
              onClick={() => onToggleFavorite(game.id)}
              aria-pressed={isFavorite}
            >
              <HeartIcon size={15} filled={isFavorite} />
              {isFavorite ? 'HAPUS FAVORIT' : 'TAMBAH FAVORIT'}
            </button>

            <a
              className="btn btn-outline btn-sm"
              href={game.cover}
              download={`gamehub-${game.id}-cover.webp`}
            >
              <DownloadIcon size={15} />
              UNDUH COVER (LOKAL)
            </a>

            <button type="button" className="btn btn-ghost btn-sm ml-auto" onClick={onClose}>
              TUTUP
            </button>
          </div>
          <p className="mt-3 text-[0.68rem] leading-relaxed text-hub-muted">
            GAMEHUB tidak meng-host file game dan tidak mengarahkan ke situs lain. Tautan unduhan di
            atas hanya menyimpan artwork lokal dari proyek ini.
          </p>
        </div>
      </div>
    </div>
  );
}
