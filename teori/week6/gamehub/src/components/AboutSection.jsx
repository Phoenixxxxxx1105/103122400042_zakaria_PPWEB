const FEATURES = [
  {
    icon: '⚡',
    title: 'INFO RINGKAS',
    text: 'Spesifikasi minimum & rekomendasi, ukuran instalasi, dan rating editorial tersaji dalam satu panel.',
  },
  {
    icon: '📚',
    title: 'KATALOG TERKURASI',
    text: '16 judul populer dengan cover, banner, dan empat screenshot lokal untuk setiap game.',
  },
  {
    icon: '🛡️',
    title: 'TANPA API EKSTERNAL',
    text: 'Pencarian, filter, sorting, dan favorit berjalan sepenuhnya di browser. Tidak ada request data ke server lain.',
  },
  {
    icon: '🧩',
    title: 'REACT + TAILWIND',
    text: 'Antarmuka modular berbasis React, styling Tailwind yang dikompilasi lokal, dan jQuery hanya untuk efek presentasi.',
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20" id="about" aria-labelledby="about-title">
      <div className="hub-container">
        <header className="mb-8 text-center">
          <p className="eyebrow">Tentang kami</p>
          <h2 className="section-title section-title-center" id="about-title">
            KENAPA GAMEHUB?
          </h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-hub-line bg-hub-card/60 p-5 transition hover:-translate-y-1 hover:border-hub-accent/50 hover:bg-hub-card"
            >
              <span
                className="inline-grid h-11 w-11 place-items-center rounded-xl border border-hub-accent/30 bg-hub-accent/10 text-xl"
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <h3 className="mt-4 text-sm font-extrabold tracking-[0.08em]">{feature.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-hub-muted">{feature.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-hub-line bg-hub-card/40 p-5 sm:grid-cols-3">
          <div>
            <strong className="block text-2xl font-black text-gradient">100% lokal</strong>
            <span className="text-xs text-hub-muted">Data &amp; gambar tanpa CDN</span>
          </div>
          <div>
            <strong className="block text-2xl font-black text-gradient">0 request</strong>
            <span className="text-xs text-hub-muted">Tidak ada API atau analytics</span>
          </div>
          <div>
            <strong className="block text-2xl font-black text-gradient">16 judul</strong>
            <span className="text-xs text-hub-muted">Lengkap dengan spesifikasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
