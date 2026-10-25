import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Tumpukan dialog: Escape dan focus trap hanya aktif pada dialog teratas,
// sementara scroll body tetap terkunci selama salah satu dialog terbuka.
const dialogStack = [];
let savedOverflow = '';

/**
 * Perilaku dialog bersama untuk modal game, login, dan lightbox:
 * kunci scroll body, tutup dengan Escape, jebakan fokus Tab,
 * dan mengembalikan fokus ke elemen pemicu saat ditutup.
 */
export function useDialog(onClose) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const token = Symbol('gamehub-dialog');
    dialogStack.push(token);
    const isTop = () => dialogStack[dialogStack.length - 1] === token;

    const previouslyFocused = document.activeElement;
    if (dialogStack.length === 1) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    const focusTimer = window.setTimeout(() => {
      if (isTop()) closeRef.current?.focus();
    }, 30);

    const handleKeyDown = (event) => {
      if (!isTop()) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const nodes = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (node) => node.offsetParent !== null || node === document.activeElement,
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      const position = dialogStack.indexOf(token);
      if (position !== -1) dialogStack.splice(position, 1);
      if (dialogStack.length === 0) {
        document.body.style.overflow = savedOverflow;
      }
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  return { panelRef, closeRef };
}
