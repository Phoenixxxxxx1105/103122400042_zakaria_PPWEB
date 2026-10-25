import { useEffect } from 'react';
import { useDialog } from '../hooks/useDialog';
import GameImage from './GameImage';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from './Icon';

export default function ScreenshotLightbox({ images, startIndex, title, onClose, onNavigate }) {
  const total = images.length;
  const index = ((startIndex % total) + total) % total;
  const shot = images[index];
  const { panelRef, closeRef } = useDialog(onClose);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate(-1);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onNavigate]);

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`Screenshot ${title}, gambar ${index + 1} dari ${total}`}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-200">
            {title}
            <span className="ml-2 text-xs font-normal text-hub-muted">
              {index + 1} / {total}
            </span>
          </p>
          <button
            type="button"
            ref={closeRef}
            className="modal-close !relative !right-0 !top-0"
            onClick={() => onClose()}
            aria-label="Tutup pratinjau gambar"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <figure>
          <GameImage src={shot.src} alt={shot.alt} loading="eager" />
          <figcaption className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <span className="text-xs text-slate-300">{shot.caption}</span>
            <span className="editorial-note">Artwork lokal GAMEHUB</span>
          </figcaption>
        </figure>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => onNavigate(-1)}
            aria-label="Gambar sebelumnya"
          >
            <ArrowLeftIcon size={15} />
            SEBELUMNYA
          </button>
          <span className="hidden text-xs text-hub-muted sm:inline">
            Gunakan tombol ← → untuk berpindah
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => onNavigate(1)}
            aria-label="Gambar berikutnya"
          >
            BERIKUTNYA
            <ArrowRightIcon size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
