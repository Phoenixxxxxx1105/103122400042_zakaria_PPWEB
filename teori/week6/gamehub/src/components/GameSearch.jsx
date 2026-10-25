import { CloseIcon, SearchIcon } from './Icon';

/**
 * Input pencarian terkontrol. State query tetap di App agar navbar dan
 * katalog memakai satu sumber kebenaran (tidak ada state ganda).
 */
export default function GameSearch({
  id,
  value,
  onChange,
  onSubmit,
  placeholder = 'Cari judul, genre, developer…',
  autoFocus = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className="search-field" role="search" onSubmit={handleSubmit}>
      <SearchIcon size={16} className="shrink-0 text-hub-muted" />
      <label className="sr-only" htmlFor={id}>
        Cari game
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && value) {
            event.stopPropagation();
            onChange('');
          }
        }}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        autoFocus={autoFocus}
        aria-label="Cari game berdasarkan judul, genre, developer, atau deskripsi"
      />
      {value ? (
        <button
          type="button"
          className="search-clear"
          aria-label="Bersihkan pencarian"
          onClick={() => onChange('')}
        >
          <CloseIcon size={14} />
        </button>
      ) : null}
      <button type="submit" className="search-submit" aria-label="Cari game">
        <SearchIcon size={15} />
      </button>
    </form>
  );
}
