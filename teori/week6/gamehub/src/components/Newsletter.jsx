import { useState } from 'react';
import { CheckIcon } from './Icon';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export default function Newsletter({ notify }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setError('Email wajib diisi.');
      setSuccess(false);
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError('Format email belum valid. Contoh: nama@email.com');
      setSuccess(false);
      return;
    }

    setError('');
    setSuccess(true);
    setEmail('');
    notify?.(
      'Simulasi newsletter: validasi berhasil, tetapi email tidak dikirim dan tidak disimpan di server mana pun.',
      'success',
    );
  };

  return (
    <section className="pb-20" id="newsletter" aria-labelledby="newsletter-title">
      <div className="hub-container">
        <div className="newsletter-box relative overflow-hidden rounded-3xl border border-hub-accent/35 bg-[linear-gradient(140deg,#151a2d,#0b101c)] px-5 py-8 sm:px-9">
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-hub-cyan/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow">Newsletter demo</p>
              <h2 className="section-title" id="newsletter-title">
                TETAP TERHUBUNG
              </h2>
              <p className="mt-3 max-w-md text-sm text-hub-muted">
                Dapatkan rilis game terbaru, pembaruan katalog, dan berita gaming. Form ini adalah
                simulasi lokal tanpa backend.
              </p>
            </div>

            <form className="w-full" onSubmit={handleSubmit} noValidate>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-hub-muted" htmlFor="newsletter-email">
                Alamat email
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    className="field-input"
                    placeholder="Masukkan email kamu"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError('');
                      if (success) setSuccess(false);
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'newsletter-error' : 'newsletter-hint'}
                  />
                  {error ? (
                    <p className="field-error" id="newsletter-error" role="alert">
                      {error}
                    </p>
                  ) : null}
                </div>
                <button className="btn shrink-0" type="submit">
                  LANGGANAN
                </button>
              </div>

              <p className="mt-2 text-[0.7rem] leading-relaxed text-hub-muted" id="newsletter-hint">
                Demo lokal — data tidak dikirim ke server. Hanya validasi format email yang berjalan.
              </p>

              {success ? (
                <p className="form-success" role="status">
                  <CheckIcon size={15} className="mt-0.5 shrink-0" />
                  <span>
                    Email valid! Ini hanya simulasi: tidak ada langganan yang dibuat dan tidak ada
                    data yang dikirim.
                  </span>
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
