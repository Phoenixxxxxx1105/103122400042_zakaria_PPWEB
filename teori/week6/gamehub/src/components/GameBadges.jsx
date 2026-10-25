const TAG_STYLES = {
  POPULER: { className: 'badge-popular', icon: '🔥' },
  TRENDING: { className: 'badge-trending', icon: '⚡' },
  BARU: { className: 'badge-new', icon: '✦' },
  TERVERIFIKASI: { className: 'badge-verified', icon: '✓' },
  TERBARU: { className: 'badge-updated', icon: '↑' },
};

export function TagBadge({ tag }) {
  if (!tag) return null;
  const style = TAG_STYLES[tag] ?? { className: 'badge-genre', icon: '' };
  return (
    <span className={`badge ${style.className}`}>
      <span aria-hidden="true">{style.icon}</span>
      {tag}
    </span>
  );
}

export function RatingBadge({ rating, source = 'Editorial GAMEHUB', className = '' }) {
  return (
    <span
      className={`badge badge-rating ${className}`.trim()}
      title={`Rating ${rating.toFixed(1)} / 5 — ${source}`}
    >
      <span aria-hidden="true">★</span>
      <span className="sr-only">Rating </span>
      {rating.toFixed(1)}
    </span>
  );
}

export function GenreBadge({ children }) {
  return <span className="badge badge-genre">{children}</span>;
}
