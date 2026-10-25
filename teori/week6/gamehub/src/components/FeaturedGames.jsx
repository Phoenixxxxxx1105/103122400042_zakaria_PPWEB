import { useCallback, useEffect, useState } from 'react';
import { FEATURED_IDS, getGameById } from '../data/games';
import GameImage from './GameImage';
import { GenreBadge, RatingBadge, TagBadge } from './GameBadges';
import { ArrowLeftIcon, ArrowRightIcon } from './Icon';

const FEATURED = FEATURED_IDS.map(getGameById).filter(Boolean);
const AUTOPLAY_MS = 7000;

export default function FeaturedGames({ onOpenGame }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = FEATURED.length;
  const game = FEATURED[index];

  const goTo = useCallback(
    (next) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || total < 2) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const handleKeyDown = (event) => {
    if (event.target.closest('input, textarea, select')) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  return (
    <section className="pb-16 pt-4 sm:pb-20" id="featured" aria-labelledby="featured-title">
      <div className="hub-container">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Pilihan editor</p>
            <h2 className="section-title" id="featured-title">
              GAME UNGGULAN
            </h2>
          </div>
          <span className="editorial-note">Rating ★ adalah nilai editorial GAMEHUB.</span>
        </header>

        <div
          className="relative"
          role="group"
          aria-roledescription="carousel"
          aria-label="Slider game unggulan"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
          onKeyDown={handleKeyDown}
        >
          <article
            key={game.id}
            className="relative overflow-hidden rounded-[26px] border border-hub-line bg-hub-surface shadow-[0_28px_70px_rgba(0,0,0,0.5)]"
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${total}: ${game.title}`}
          >
            <GameImage
              src={game.banner}
              alt=""
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-md"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(100deg,#080b12_12%,rgba(8,11,18,0.92)_45%,rgba(8,11,18,0.35)_100%)]"
              aria-hidden="true"
            />
            <div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: game.accent }}
              aria-hidden="true"
            />              <div
                className="absolute inset-0 bg-[#080b12]/25"
                aria-hidden="true"
              />

              <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
              <div style={{ animation: 'fade-up 0.5s ease both' }}>
                <p className="eyebrow">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · Sedang
                  unggulan
                </p>
                <h3 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">{game.title}</h3>
                <div className="badge-row mt-3">
                  <GenreBadge>{game.genreLabel}</GenreBadge>
                  <RatingBadge rating={game.rating} source={game.ratingSource} />
                  <TagBadge tag={game.tag} />
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
                  {game.shortDescription}
                </p>

                <dl className="fact-list mt-5 max-w-lg">
                  <div>
                    <dt>Rilis</dt>
                    <dd>{game.releaseDate}</dd>
                  </div>
                  <div>
                    <dt>Developer</dt>
                    <dd>{game.developer}</dd>
                  </div>
                  <div>
                    <dt>Ukuran</dt>
                    <dd>{game.sizeLabel}</dd>
                  </div>
                  <div>
                    <dt>Platform</dt>
                    <dd>{game.platform}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="btn" type="button" onClick={() => onOpenGame(game.id)}>
                    LIHAT GAME
                  </button>
                  <a className="btn btn-outline" href="#games">
                    JELAJAHI KATALOG
                    <ArrowRightIcon size={16} />
                  </a>
                </div>
              </div>

              <div className="relative mx-auto hidden w-full max-w-[230px] sm:block">
                <div className="cover cover-portrait rotate-2 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
                  <GameImage
                    src={game.cover}
                    alt={`Cover ${game.title}`}
                    variant="cover"
                    width="300"
                    height="450"
                  />
                </div>
              </div>
            </div>
          </article>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="icon-btn"
                onClick={() => goTo(index - 1)}
                aria-label="Slide unggulan sebelumnya"
              >
                <ArrowLeftIcon size={16} />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => goTo(index + 1)}
                aria-label="Slide unggulan berikutnya"
              >
                <ArrowRightIcon size={16} />
              </button>
              <span className="ml-2 text-xs text-hub-muted" aria-live="polite">
                {index + 1} / {total}
              </span>
            </div>

            <div className="flex items-center gap-2" role="tablist" aria-label="Pilih slide unggulan">
              {FEATURED.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`Slide ${dotIndex + 1}: ${item.title}`}
                  onClick={() => goTo(dotIndex)}
                  className={`h-2 rounded-full transition-all ${
                    dotIndex === index ? 'w-7 bg-gradient-to-r from-hub-accent to-hub-cyan' : 'w-2 bg-white/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
