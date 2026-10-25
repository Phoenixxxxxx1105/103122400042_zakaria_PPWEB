import { useEffect, useState } from 'react';

const FALLBACKS = {
  cover: 'images/fallback/fallback-cover.svg',
  wide: 'images/fallback/fallback-wide.svg',
};

/**
 * Gambar lokal GAMEHUB dengan fallback SVG lokal (tanpa request eksternal).
 * `variant` menentukan fallback potret (cover) atau lanskap (banner/screenshot).
 */
export default function GameImage({
  src,
  alt,
  variant = 'wide',
  className = '',
  loading = 'lazy',
  fetchPriority,
  ...rest
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const fallback = FALLBACKS[variant] ?? FALLBACKS.wide;

  return (
    <img
      src={failed ? fallback : src}
      alt={failed ? `${alt} (gambar pengganti)` : alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
