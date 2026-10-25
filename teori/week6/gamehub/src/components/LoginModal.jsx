import { useState } from 'react';
import { useDialog } from '../hooks/useDialog';
import { CheckIcon, CloseIcon, UserIcon } from './Icon';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export default function LoginModal({ onClose }) {
  const { panelRef, closeRef } = useDialog(onClose);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!email.trim()) nextErrors.email = 'Email wajib diisi.';
    else if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = 'Format email belum valid.';

    if (!password) nextErrors.password = 'Kata sandi wajib diisi.';
    else if (password.length < 8) nextErrors.password = 'Kata sandi minimal 8 karakter.';

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setMessage('');
      return;
    }

    setMessage(
      'Validasi lolos. Ini demo lokal: tidak ada autentikasi, tidak ada akun yang dibuat, dan kredensial tidak dikirim maupun disimpan.',
    );
  };

  const showInfo = (text) => {
    setMessage(text);
    setErrors({});
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal-panel !w-[min(440px,100%)] !max-h-[calc(100dvh-40px)] !min-h-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        ref={panelRef}
        tabIndex={-1}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Tutup formulir login"
          ref={closeRef}
        >
          <CloseIcon size={18} />
        </button>

        <div className="p-6 sm:p-8">
          <span className="logo-mark" aria-hidden="true">
            G
          </span>
          <h2 className="mt-4 text-2xl font-black" id="login-title">
            Selamat datang kembali
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-hub-muted">
            Masuk untuk menyimpan favorit. Favorit sebenarnya sudah tersimpan otomatis di browser —
            login ini hanya simulasi antarmuka.
          </p>

          <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-[0.72rem] leading-relaxed text-amber-200">
            <span aria-hidden="true">⚠</span>
            <span>
              Demo UI: autentikasi belum terhubung ke backend. Jangan memasukkan kata sandi asli.
            </span>
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-hub-muted" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                className="field-input"
                placeholder="kamu@contoh.com"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (errors.email) setErrors((current) => ({ ...current, email: '' }));
                  setMessage('');
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
              />
              {errors.email ? (
                <p className="field-error" id="login-email-error" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-hub-muted" htmlFor="login-password">
                Kata sandi
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="field-input pr-16"
                  placeholder="Minimal 8 karakter"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (errors.password) setErrors((current) => ({ ...current, password: '' }));
                    setMessage('');
                  }}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'login-password-error' : 'login-password-hint'}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-[0.68rem] font-bold uppercase text-hub-cyan hover:bg-white/10"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Sembunyi' : 'Lihat'}
                </button>
              </div>
              {errors.password ? (
                <p className="field-error" id="login-password-error" role="alert">
                  {errors.password}
                </p>
              ) : (
                <p className="mt-1 text-[0.68rem] text-hub-muted" id="login-password-hint">
                  Minimal 8 karakter — hanya untuk menguji validasi.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <label className="flex items-center gap-2 text-hub-muted" htmlFor="login-remember">
                <input id="login-remember" type="checkbox" className="h-4 w-4 accent-[#7c3aed]" />
                Ingat saya
              </label>
              <button
                type="button"
                className="font-semibold text-hub-cyan hover:text-white"
                onClick={() => showInfo('Fitur lupa kata sandi belum tersedia pada demo lokal ini.')}
              >
                Lupa kata sandi?
              </button>
            </div>

            <button className="btn btn-block" type="submit">
              <UserIcon size={16} />
              MASUK (DEMO)
            </button>
          </form>

          {message ? (
            <p className="form-success" role="status">
              <CheckIcon size={15} className="mt-0.5 shrink-0" />
              <span>{message}</span>
            </p>
          ) : null}

          <p className="mt-4 text-center text-xs text-hub-muted">
            Belum punya akun?{' '}
            <button
              type="button"
              className="font-semibold text-hub-cyan hover:text-white"
              onClick={() =>
                showInfo(
                  'Pendaftaran akun dinonaktifkan: GAMEHUB adalah demo frontend tanpa backend atau layanan autentikasi.',
                )
              }
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
