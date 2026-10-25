import { useEffect } from 'react';
import { CloseIcon } from './Icon';

const TONE_ICON = {
  success: '✓',
  error: '⚠',
  info: 'ℹ',
};

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(onDismiss, 4600);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="toast" data-tone={toast.tone ?? 'info'} role="status" aria-live="polite">
      <span aria-hidden="true" className="mt-0.5 text-hub-cyan">
        {TONE_ICON[toast.tone] ?? TONE_ICON.info}
      </span>
      <p className="flex-1">{toast.message}</p>
      <button
        type="button"
        className="rounded p-1 text-hub-muted transition hover:bg-white/10 hover:text-white"
        onClick={onDismiss}
        aria-label="Tutup notifikasi"
      >
        <CloseIcon size={14} />
      </button>
    </div>
  );
}
