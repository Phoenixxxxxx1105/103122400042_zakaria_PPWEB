import { GENRES, GENRE_COUNTS, SORT_OPTIONS } from '../data/games';
import GameSearch from './GameSearch';
import { FilterIcon, HeartIcon } from './Icon';

export default function GameFilters({
  query,
  onQueryChange,
  genre,
  onGenreChange,
  sort,
  onSortChange,
  favoritesOnly,
  onToggleFavorites,
  favoriteCount,
  resultCount,
  totalCount,
  onReset,
}) {
  const hasActiveFilter = query.trim() !== '' || genre !== 'Semua' || favoritesOnly;

  return (
    <div className="rounded-2xl border border-hub-line bg-hub-card/60 p-4 backdrop-blur-md sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label
            className="mb-1.5 flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-hub-muted"
            htmlFor="catalog-search"
          >
            <FilterIcon size={13} />
            Cari di katalog
          </label>
          <GameSearch
            id="catalog-search"
            value={query}
            onChange={onQueryChange}
            placeholder="Judul, genre, developer, atau kata kunci…"
            onSubmit={() => {
              document.getElementById('game-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          />
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-[150px] flex-1 sm:min-w-[168px] sm:flex-none">
            <label
              className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-hub-muted"
              htmlFor="sort-select"
            >
              Urutkan
            </label>
            <select
              id="sort-select"
              className="field-input !py-2.5 text-sm"
              value={sort}
              onChange={(event) => onSortChange(event.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={`btn btn-sm ${favoritesOnly ? '' : 'btn-outline'}`}
            aria-pressed={favoritesOnly}
            onClick={onToggleFavorites}
          >
            <HeartIcon size={14} filled={favoritesOnly} />
            <span>FAVORIT</span>
            <span className="chip-count">{favoriteCount}</span>
          </button>
        </div>
      </div>

      <div className="chip-scroll mt-4 flex items-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
        <button
          type="button"
          className={`chip ${genre === 'Semua' ? 'chip-active' : ''}`}
          onClick={() => onGenreChange('Semua')}
          aria-pressed={genre === 'Semua'}
        >
          SEMUA
          <span className="chip-count">{totalCount}</span>
        </button>

        {GENRES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`chip ${genre === item.id ? 'chip-active' : ''}`}
            onClick={() => onGenreChange(item.id)}
            aria-pressed={genre === item.id}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label.toUpperCase()}
            <span className="chip-count">{GENRE_COUNTS[item.id] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-hub-line pt-3">
        <p className="text-xs text-hub-muted" aria-live="polite">
          Menampilkan <strong className="text-slate-100">{resultCount}</strong> dari {totalCount} judul
          {genre !== 'Semua' ? (
            <>
              {' '}
              · genre <strong className="text-slate-100">{genre}</strong>
            </>
          ) : null}
          {query.trim() ? (
            <>
              {' '}
              · kata kunci <strong className="text-slate-100">“{query.trim()}”</strong>
            </>
          ) : null}
          {favoritesOnly ? ' · hanya favorit' : null}
        </p>

        {hasActiveFilter || sort !== 'popularity' ? (
          <button
            type="button"
            className="text-xs font-bold text-hub-cyan transition hover:text-white"
            onClick={onReset}
          >
            Reset filter
          </button>
        ) : null}
      </div>
    </div>
  );
}
