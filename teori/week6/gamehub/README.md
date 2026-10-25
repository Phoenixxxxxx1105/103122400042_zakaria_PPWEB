# GAMEHUB

Katalog game PC lokal yang dibangun ulang dari proyek HTML/CSS GAMEHUB menggunakan **React + Vite**, **Tailwind CSS**, dan **jQuery** untuk efek presentasi. Seluruh data katalog dan artwork tersedia di dalam proyek — tidak ada API, CDN, iframe, analytics, atau tautan keluar saat aplikasi dijalankan.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · jQuery 4

> Semua dependency dipasang lewat npm dan di-bundle secara lokal. Aplikasi tidak memuat resource dari CDN, API, atau layanan pihak ketiga saat dijalankan.

---

## 1. Fitur

- **Katalog 16 game** dengan cover, banner, capsule, empat screenshot, deskripsi, developer, publisher, tanggal rilis, ukuran, dan spesifikasi.
- **Pencarian** berdasarkan judul, genre, developer, publisher, platform, tag, dan kata kunci deskripsi (satu sumber state untuk navbar dan katalog).
- **Filter 10 genre** (Action, Adventure, RPG, FPS, Racing, Horror, Strategy, Open World, Simulation, Sports) dengan jumlah judul yang dihitung dari data.
- **Sorting** berdasarkan popularitas, rating, rilis terbaru/terlama, ukuran terkecil/terbesar.
- **Favorit** dengan `localStorage` (key `gamehub:favorites:v1`) yang tersinkron antar tab; filter "Favorit" dan tombol favorit di navbar.
- **Modal detail game** dengan tab Informasi / Spesifikasi / Screenshot, requirement minimum & rekomendasi, serta penanda data terverifikasi vs contoh.
- **Featured slider** dengan autoplay, tombol sebelumnya/berikutnya, dot, dukungan keyboard, dan jeda saat hover/fokus.
- **Galeri screenshot** dengan lightbox lokal, navigasi panah, hitungan gambar, dan fokus yang kembali ke pemicu.
- **Mobile navigation** dengan tombol hamburger, penutupan lewat Escape/tautan, dan scroll body terkunci saat terbuka.
- **Form demo**: newsletter dan login memiliki validasi email/kata sandi, pesan error, pesan sukses, dan keterangan jelas bahwa tidak ada data yang dikirim atau autentikasi nyata.
- **Pusat aset lokal**: unduh banner/cover/screenshot WebP langsung dari folder `public` (bukan file game, bukan tautan luar).
- **Back to top**, scroll progress, efek tilt 3D, dan parallax ringan melalui jQuery.
- **Responsif** untuk desktop, tablet, dan ponsel; mendukung `prefers-reduced-motion`, `:focus-visible`, serta fallback gambar SVG lokal.

## 2. Teknologi

| Bagian | Teknologi |
| --- | --- |
| UI | React 19 (JSX, hooks, StrictMode) |
| Build/dev | Vite 8 + `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`, dikompilasi lokal) + CSS khusus |
| Efek presentasi | jQuery 4 (dipasang lewat npm, bukan CDN) |
| Data | `src/data/games.js` (objek lokal, tanpa fetch) |
| Penyimpanan | `localStorage` hanya untuk daftar favorit |

Tidak digunakan: Vue, Angular, Next.js, backend Node/PHP, database, API eksternal, Firebase/Supabase, OAuth, atau CDN runtime.

## 3. Menjalankan proyek

Prasyarat: **Node.js 20.19+** atau **22.12+** dan npm.

```bash
npm install

npm run dev

npm run build

npm run preview
```

Hasil build berupa situs statis di `dist/`. Folder tersebut **tidak bisa dibuka dengan klik dua kali `index.html`** karena browser membatasi ES module pada protokol `file://`. Jalankan `npm run preview` atau serve `dist/` dengan static server lokal apa pun.

`vite.config.js` memakai `base: './'`, sehingga build juga dapat di-serve dari subfolder, misalnya `http://localhost:8080/gamehub/`.

## 4. Struktur proyek

```text
gamehub/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── fallback/
│       │   ├── fallback-cover.svg
│       │   └── fallback-wide.svg
│       └── games/
│           └── <slug>/
│               ├── cover.webp      # potret 2:3
│               ├── header.webp     # banner 16:9
│               ├── capsule.webp    # logo kecil
│               └── ss-1..4.webp    # screenshot
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── FeaturedGames.jsx
│   │   ├── GameCatalog.jsx
│   │   ├── GameFilters.jsx
│   │   ├── GameSearch.jsx
│   │   ├── GameCard.jsx
│   │   ├── GameBadges.jsx
│   │   ├── GameImage.jsx
│   │   ├── GameDetailsModal.jsx
│   │   ├── GameCategories.jsx
│   │   ├── NewReleases.jsx
│   │   ├── ScreenshotGallery.jsx
│   │   ├── ScreenshotLightbox.jsx
│   │   ├── DownloadCenter.jsx
│   │   ├── AboutSection.jsx
│   │   ├── Newsletter.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Footer.jsx
│   │   ├── BackToTop.jsx
│   │   ├── Toast.jsx
│   │   └── Icon.jsx
│   ├── data/
│   │   └── games.js
│   ├── hooks/
│   │   ├── useFavorites.js
│   │   └── useDialog.js
│   ├── scripts/
│   │   └── jquery-effects.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── App.jsx
│   └── main.jsx
│
├── legacy/                 # arsip HTML/CSS versi lama (bukan bagian build)
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── .gitignore
```

## 5. Data game dan sumber

Semua data ada di [src/data/games.js](src/data/games.js) dan diimpor oleh komponen React. Tidak ada permintaan jaringan untuk mengambil data.

- **12 game katalog** berasal dari file sumber GAMEHUB (kartu, modal, dan halaman detail). Spesifikasi serta tanggal rilisnya ditandai `requirements.verified: true` dan mencantumkan sumber “Steam appdetails (tercatat pada sumber proyek, Okt 2026)”.
- **4 game Rilis Baru** (Black Myth: Wukong, Monster Hunter Wilds, Indiana Jones and the Great Circle, DOOM: The Dark Ages) juga sudah ada pada file sumber, tetapi belum memiliki tabel requirement. Spesifikasinya diisi sebagai **contoh editorial** (`verified: false`) dan selalu ditampilkan dengan peringatan kuning di modal — bukan kutipan resmi.
- **Rating ★ adalah penilaian editorial GAMEHUB**, bukan skor resmi toko. Ini ditulis pada kartu, modal, dan catatan section.
- **Ukuran instalasi** dapat berubah antar versi/update. Untuk Resident Evil 4, sumber tidak mencantumkan baris storage sehingga nilainya ditandai perkiraan.
- Popularitas adalah skor editorial yang dipakai untuk sorting “Terpopuler”.

### Artwork

Seluruh 112 file WebP (16 game × 7 aset) disalin ke `public/images/games/<slug>/` dengan nama file asli yang dipertahankan. Hak atas artwork dan merek game tetap milik pemiliknya; proyek ini adalah demo edukasi dan tidak meng-host file game.

Jika sebuah gambar gagal dimuat, komponen `GameImage` otomatis menampilkan fallback SVG lokal dari `public/images/fallback/` (tidak ada request ke placeholder eksternal).

## 6. Batasan demo (disengaja)

- **Login bukan autentikasi nyata.** Form hanya memvalidasi email dan panjang kata sandi (min. 8 karakter). Kredensial tidak dikirim, tidak disimpan, dan tidak dibuat sesi. Halaman menampilkan peringatan agar tidak memakai kata sandi asli.
- **Newsletter tidak mengirim email.** Setelah validasi, hanya muncul pesan sukses dan toast yang menjelaskan bahwa data tidak dikirim.
- **Favorit hanya tersimpan di browser** melalui `localStorage`; tidak ada akun server.
- **Pusat unduhan** hanya menyimpan artwork lokal. Tidak ada file game, tautan pembelian, atau pengalihan ke situs lain.
- Pencarian/filter/sorting berjalan sepenuhnya di memori browser.

## 7. jQuery: batas penggunaan

[jQuery-effects.js](src/scripts/jquery-effects.js) hanya menangani efek presentasi yang tidak mengubah state React:

1. Scroll progress bar (`transform: scaleX`).
2. Tilt 3D kartu melalui CSS variable `--tilt-x` / `--tilt-y`.
3. Parallax blob hero melalui `--parallax-y`.
4. Smooth scroll untuk tautan internal bertanda `data-jq-scroll` (footer).

Semua handler memakai namespace `.gamehubFx`. Fungsi `initJQueryEffects()` mengembalikan `dispose` yang melepas seluruh listener dan mereset CSS variable; `App` memanggilnya di dalam `useEffect` sehingga aman pada StrictMode maupun hot reload. jQuery tidak pernah merender UI, menyimpan state aplikasi, atau mengubah DOM yang dikelola React.

## 8. Tailwind dan CSS khusus

- `src/styles/index.css`: `@import "tailwindcss"`, token `@theme`, reset, background grid, dan keyframes.
- `src/styles/components.css`: kelas visual bersama (tombol, badge, cover, kartu, modal, tabel requirement, toast, dll.).
- `src/styles/responsive.css`: breakpoint navigasi mobile, modal, tabel, dan penyesuaian kecil.

Utility Tailwind dipakai untuk layout, grid, spacing, typography, dan responsive. CSS khusus dipakai untuk gradient, glow, animasi, overlay, dan pola visual yang tidak efisien sebagai utility. Tidak ada Tailwind Play CDN; CSS dikompilasi oleh Vite ke `dist/assets/*.css`.

## 9. Aksesibilitas & responsivitas

- Dialog (detail game, login, lightbox) mengunci scroll, menjebak fokus Tab, menutup dengan Escape/backdrop, dan mengembalikan fokus ke elemen pemicu. Dialog bertumpuk memakai stack agar Escape hanya menutup dialog teratas.
- Tab detail game mengikuti pola WAI-ARIA: panah kiri/kanan, Home, dan End memindahkan fokus sekaligus mengaktifkan tab; hanya tab aktif yang berada di urutan Tab; panel tab dapat difokuskan.
- Tautan "Lewati ke konten" memindahkan fokus ke `<main tabindex="-1">`, dan Escape pada menu mobile mengembalikan fokus ke tombol hamburger.
- Navigasi memakai landmark, `aria-current`, label tombol, dan `aria-pressed` untuk favorit.
- Notifikasi memakai `role="status"`/`aria-live`; error form memakai `role="alert"` dan `aria-invalid`.
- Animasi dinonaktifkan/diringankan saat `prefers-reduced-motion: reduce`.
- Grid katalog 2 kolom di ponsel, 3 di tablet, 4 di desktop; filter genre dapat digeser horizontal di layar kecil, dan baris pencarian/urutan/favorit otomatis turun ke baris baru pada layar sempit.
- Filter genre dan mode favorit dapat dipakai bersamaan; chip genre tetap menampilkan pilihan aktif dan pesan kosong menjelaskan kombinasi filter yang sedang berlaku.

## 10. Pemeriksaan yang sudah dilakukan

- `npm run build` berhasil (React, Tailwind, jQuery ter-bundle lokal).
- Pencarian judul/genre/developer diuji; 10 filter genre diuji dan jumlah kartu cocok dengan hitungan chip.
- Sorting popularitas, rating, rilis, dan ukuran diuji.
- Modal detail, tab, lightbox, Escape, fokus, dan scroll lock diuji.
- Favorit, filter favorit, dan persistensi setelah reload diuji.
- Validasi newsletter dan login diuji (kosong, format salah, valid).
- Layout diperiksa pada 320, 375, 768, 1024, 1280, dan 1440 px: tidak ada horizontal overflow, navigasi desktop/mobile, grid 2/3/4 kolom, serta modal full-screen di ponsel berjalan sesuai breakpoint.
- Hasil `npm run build` dijalankan lewat `npm run preview`: 16 kartu tampil, 59 gambar termuat tanpa error, dan modal detail berfungsi pada build produksi.
- Tidak ada tautan `http(s)` eksternal, iframe, atau request gambar eksternal pada aplikasi.
- Semua 176 referensi aset (cover, banner, capsule, screenshot) pada dataset diverifikasi ada di `public/images/`.
- Audit aksesibilitas manual: struktur heading, alt gambar, label kontrol, nama tombol/tautan, referensi `aria-*`, ID unik, serta kontras 350+ elemen teks diperiksa tanpa temuan yang tersisa.

## 11. Arsip versi lama

Folder [legacy/](legacy/) menyimpan salinan HTML/CSS/halaman detail versi sebelumnya sebagai referensi. Folder ini **tidak diikutsertakan dalam build Vite** dan tidak dipakai aplikasi React. Tautan toko eksternal pada arsip sudah dinonaktifkan dan path gambarnya diarahkan ke aset lokal agar arsip tetap dapat dibuka tanpa koneksi internet.

---

© 2026 GAMEHUB — proyek demo frontend untuk tugas PPWEB. Hak masing-masing pemilik konten game tetap dihormati.
