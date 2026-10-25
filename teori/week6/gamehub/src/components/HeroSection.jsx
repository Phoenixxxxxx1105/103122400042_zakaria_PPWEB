import { HERO_STATS, getGameById } from '../data/games';
import GameImage from './GameImage';
import { ArrowRightIcon, GamepadIcon, StarIcon } from './Icon';

const HERO_GAME = getGameById('elden-ring');
const SIDE_GAME = getGameById('cyberpunk-2077');

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24" id="home" aria-labelledby="hero-title">
      <div
        className="hero-blob left-[-8%] top-[-10%] h-[420px] w-[420px]"
        style={{ background: 'rgba(124, 58, 237, 0.55)' }}
        data-parallax="0.16"
        aria-hidden="true"
      />
      <div
        className="hero-blob right-[-6%] top-[18%] h-[360px] w-[360px]"
        style={{ background: 'rgba(6, 182, 212, 0.4)', animationDelay: '1.4s' }}
        data-parallax="-0.1"
        aria-hidden="true"
      />

      <div className="hub-container grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <span className="badge badge-verified">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
            PUSTAKA GAME PC ANDAL
          </span>

          <h1
            className="mt-5 text-[2.2rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            id="hero-title"
          >
            TEMUKAN
            <br />
            <span className="text-gradient">GAME FAVORITMU</span>
            <br />
            BERIKUTNYA
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-hub-muted sm:text-base">
            GAMEHUB adalah katalog game PC yang bersih dan terkurasi. Telusuri menurut genre,
            bandingkan spesifikasi, cek ukuran file dan rating — semua data dan artwork tersedia
            lokal, tanpa API eksternal.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a className="btn" href="#games">
              <GamepadIcon size={16} />
              JELAJAHI GAME
            </a>
            <a className="btn btn-outline" href="#popular">
              GAME TERPOPULER
              <ArrowRightIcon size={16} />
            </a>
          </div>

          <ul className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-hub-line pt-6 sm:flex sm:flex-wrap sm:gap-y-4">
            <li>
              <strong className="block text-2xl font-black">{HERO_STATS.totalGames}</strong>
              <span className="text-xs uppercase tracking-[0.12em] text-hub-muted">Judul lengkap</span>
            </li>
            <li>
              <strong className="flex items-center gap-1.5 text-2xl font-black">
                {HERO_STATS.averageRating}
                <StarIcon size={16} className="text-amber-300" />
              </strong>
              <span className="text-xs uppercase tracking-[0.12em] text-hub-muted">Rating editorial</span>
            </li>
            <li>
              <strong className="block text-2xl font-black">{HERO_STATS.totalGenres}</strong>
              <span className="text-xs uppercase tracking-[0.12em] text-hub-muted">Genre</span>
            </li>
            <li>
              <strong className="block text-2xl font-black">100%</strong>
              <span className="text-xs uppercase tracking-[0.12em] text-hub-muted">Aset lokal</span>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto flex h-[430px] w-full max-w-[440px] items-center justify-center sm:h-[500px]">
          <span className="hero-ring inset-6" aria-hidden="true" />
          <span className="hero-ring inset-16 opacity-70" aria-hidden="true" />
          <span
            className="absolute left-2 top-10 h-2.5 w-2.5 rounded-full bg-hub-cyan shadow-[0_0_18px_rgba(6,182,212,0.9)]"
            aria-hidden="true"
          />
          <span
            className="absolute right-6 top-24 h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_18px_rgba(232,121,249,0.9)]"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-16 left-8 h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_14px_rgba(167,139,250,0.9)]"
            aria-hidden="true"
          />

          <div className="hero-cover">
            <GameImage
              src={HERO_GAME.cover}
              alt={`Cover resmi ${HERO_GAME.title} (artwork lokal GAMEHUB)`}
              variant="cover"
              loading="eager"
              fetchPriority="high"
              width="300"
              height="450"
            />
            <span className="hero-cover-text">
              MAIN TANPA
              <br />
              BATAS
            </span>
          </div>

          <div className="float-card float-card-1 left-[-10%] top-[6%]">
            <GameImage
              src={SIDE_GAME.capsule}
              alt=""
              className="!h-10 !w-16"
              width="231"
              height="87"
            />
            <div>
              <strong>Cyberpunk 2077</strong>
              <small>★ 4.6 · 70 GB</small>
            </div>
          </div>

          <div className="float-card float-card-2 bottom-[15%] right-0">
            <div>
              <strong className="flex items-center gap-1 text-emerald-300">
                ✓ Data lokal
              </strong>
              <small>16 judul · 10 genre</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
