#FixUIR – Aplikasi Pelaporan Kerusakan Fasilitas Kampus

FixUIR adalah sebuah aplikasi web berbasis Vue 3 yang bertujuan untuk mempermudah proses pelaporan kerusakan fasilitas kampus oleh mahasiswa maupun pihak internal. Sistem ini menyediakan fitur pelaporan, notifikasi status, serta pengelolaan laporan yang efisien.

## Deskripsi Proyek
FixUIR dikembangkan sebagai solusi digital untuk menangani pelaporan kerusakan di lingkungan kampus. Pengguna dapat mengisi form pelaporan dengan informasi lengkap seperti judul, lokasi, deskripsi, dan gambar kerusakan. Setiap laporan akan memiliki status yang dikelola oleh admin, mulai dari `Terkirim`, `Diproses`, hingga `Selesai`.

## Poin-Poin Penting
- **Login Pengguna**: Mendukung login untuk dua role: `user` (mahasiswa) dan `admin`.
- **Form Pelaporan**: Pengguna dapat mengirim laporan kerusakan lengkap dengan gambar dan deskripsi.
- **Notifikasi Dinamis**: Notifikasi muncul ketika ada laporan dengan status `Terkirim` atau `Diproses`.
- **Submenu Laporan**: Laporan dikelompokkan berdasarkan status (`Terkirim`, `Diproses`, `Selesai`) di bawah menu *Beranda*.
- **Statistik Laporan**: Beranda menampilkan jumlah laporan per status serta laporan terbaru.
- **Akses Admin**: Admin memiliki akses ke *Dashboard* untuk memproses dan mengubah status laporan.
- **State Management**: Menggunakan Pinia untuk mengelola autentikasi dan status notifikasi.
- **Routing Terstruktur**: Menggunakan Vue Router untuk navigasi halaman.
- **Realtime Testing**: Dilengkapi dengan Vitest untuk pengujian unit, dan mendukung mode watch (otomatis menguji ulang saat file berubah).
- **Mock API**: Menggunakan `json-server` untuk menyimpan data laporan secara lokal selama pengembangan.

