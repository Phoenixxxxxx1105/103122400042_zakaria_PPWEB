/**
 * GAMEHUB — jquery-effects.js
 *
 * jQuery dipakai hanya untuk efek presentasi yang tidak mengubah state React:
 *   1. Progress bar scroll (menulis CSS transform pada #scroll-progress).
 *   2. Tilt 3D pada kartu lewat CSS variable (--tilt-x / --tilt-y).
 *   3. Parallax ringan pada blob hero (CSS variable --parallax-y).
 *   4. Smooth scroll untuk tautan bertanda data-jq-scroll.
 *
 * Semua handler memakai namespace `.gamehubFx` dan dibersihkan lewat fungsi
 * dispose, sehingga tidak menumpuk ketika komponen dipasang ulang.
 * jQuery tidak pernah mengubah state React atau merender teks.
 */
import $ from 'jquery';

const NS = '.gamehubFx';

export function initJQueryEffects() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const progressEl = document.getElementById('scroll-progress');
  let rafId = null;

  const updateScrollEffects = () => {
    rafId = null;
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

    if (progressEl) {
      progressEl.style.transform = `scaleX(${ratio})`;
    }

    if (!reducedMotion) {
      $('[data-parallax]').each(function () {
        const speed = Number($(this).attr('data-parallax')) || 0.12;
        const offset = Math.min(window.scrollY, 800) * speed;
        this.style.setProperty('--parallax-y', `${offset}px`);
      });
    }
  };

  const onScroll = () => {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(updateScrollEffects);
    }
  };

  $(window).on(`scroll${NS} resize${NS}`, onScroll);

  if (finePointer && !reducedMotion) {
    $(document).on(`mousemove${NS}`, '[data-tilt]', function (event) {
      const rect = this.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      this.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
      this.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
    });

    $(document).on(`mouseleave${NS}`, '[data-tilt]', function () {
      this.style.removeProperty('--tilt-x');
      this.style.removeProperty('--tilt-y');
    });
  }

  $(document).on(`click${NS}`, '[data-jq-scroll]', function (event) {
    const target = $(this).attr('href');
    if (!target || !target.startsWith('#')) return;
    const $target = $(target);
    if (!$target.length) return;
    event.preventDefault();
    $('html, body')
      .stop(true)
      .animate(
        { scrollTop: Math.max(0, $target.offset().top - 80) },
        reducedMotion ? 0 : 520,
      );
  });

  updateScrollEffects();

  return function disposeJQueryEffects() {
    if (rafId !== null) window.cancelAnimationFrame(rafId);
    $(window).off(NS);
    $(document).off(NS);
    $('[data-tilt]').each(function () {
      this.style.removeProperty('--tilt-x');
      this.style.removeProperty('--tilt-y');
    });
    $('[data-parallax]').each(function () {
      this.style.removeProperty('--parallax-y');
    });
    if (progressEl) progressEl.style.transform = 'scaleX(0)';
  };
}
