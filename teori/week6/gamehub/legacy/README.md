# Arsip versi lama GAMEHUB

Folder ini menyimpan salinan HTML/CSS/halaman detail GAMEHUB sebelum migrasi ke React + Vite.

- **Bukan bagian dari aplikasi.** Vite hanya membangun `index.html` di root dan folder `src/`; isi `legacy/` tidak masuk ke `dist/`.
- Path gambar telah diarahkan ke `public/images/` agar aset yang sama tetap dapat dibuka.
- Tautan toko eksternal (`store.steampowered.com`) dinonaktifkan menjadi `#` supaya arsip tidak mengarahkan pengguna ke situs lain.
- Path CSS dan tautan antarhalaman sudah disesuaikan dengan struktur folder arsip.

Aplikasi yang digunakan ada di root proyek (`npm run dev`), bukan di folder ini.
