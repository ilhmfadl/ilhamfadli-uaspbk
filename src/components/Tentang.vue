<template>
  <div class="tentang-wrapper">
    <div class="tentang-glass">
      <h2><i class="fas fa-info-circle"></i> Tentang Sistem</h2>

      <p>
        <strong>FixUIR</strong> adalah sistem pelaporan kerusakan fasilitas kampus berbasis web yang
        dirancang untuk mempermudah civitas akademika dalam menyampaikan laporan
        secara cepat, akurat, dan efisien.
      </p>

      <p>
        Sistem ini dilengkapi fitur modern seperti form laporan dinamis, riwayat pelaporan real-time,
        serta dashboard pemantauan status untuk petugas teknis. Setiap laporan yang dikirim
        langsung diteruskan ke bagian terkait untuk penanganan segera.
      </p>

      <p>
        Kami terus berinovasi agar FixUIR menjadi solusi digital yang mendukung kenyamanan
        lingkungan kampus yang lebih baik. Jika Anda memiliki kritik, saran, atau pertanyaan 
        silakan kunjungi halaman <router-link to="/kontak" class="link-kontak">Kontak Kami</router-link>.
      </p>
    </div>
  </div>
</template>

<style scoped>

.tentang-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(to right, #eaf2ff, #f7fbff);
  font-family: 'Segoe UI', sans-serif;
  border-radius: 10px;
}

.tentang-glass {
  max-width: 760px;
  padding: 40px;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #222;
  animation: fadeIn 0.6s ease-in-out;
}

.tentang-glass h2 {
  text-align: center;
  font-size: 28px;
  color: #004b8d;
  margin-bottom: 24px;
}

.tentang-glass h2 i {
  margin-right: 8px;
  color: #008cff;
}

.tentang-glass p {
  font-size: 16.5px;
  line-height: 1.7;
  margin-bottom: 20px;
  text-align: justify;
  color: #333;
}

.link-kontak {
  color: #0070c9;
  font-weight: 600;
  text-decoration: none;
}

.link-kontak:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
