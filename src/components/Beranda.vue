<template>
  <div class="beranda-container">
    <section class="welcome-section">
      <h1>Selamat Datang di <span class="brand">FixUIR</span></h1>
      <p>Sampaikan laporan kerusakan fasilitas kampus dengan lebih mudah, cepat, dan efisien.</p>
    </section>

    <section class="statistik-section">
      <div class="stat-box box-total">
        <div class="icon">📋</div>
        <h2>{{ totalLaporan }}</h2>
        <p>Total Laporan</p>
      </div>
      <div class="stat-box box-terkirim">
        <div class="icon">📨</div>
        <h2>{{ laporanTerkirim }}</h2>
        <p>Terkirim</p>
      </div>
      <div class="stat-box box-diproses">
        <div class="icon">⚙️</div>
        <h2>{{ laporanDiproses }}</h2>
        <p>Diproses</p>
      </div>
      <div class="stat-box box-selesai">
        <div class="icon">✅</div>
        <h2>{{ laporanSelesai }}</h2>
        <p>Selesai</p>
      </div>
    </section>

    <section class="laporan-terbaru-section">
      <h2>Laporan Terbaru</h2>
      <div v-if="laporanTerbaru.length === 0" class="kosong">
        Belum ada laporan terbaru.
      </div>
      <div class="laporan-list">
        <div class="laporan-card" v-for="lapor in laporanTerbaru" :key="lapor.id">
          <img v-if="lapor.gambar" :src="lapor.gambar" alt="Foto kerusakan" class="laporan-img" />
          <h3>{{ lapor.judul }}</h3>

          <div class="laporan-info">
            <span class="status" :class="lapor.status.toLowerCase()">{{ lapor.status }}</span>
            <small class="tanggal">🗓 {{ lapor.tanggal }}</small>
          </div>

          <p class="lokasi">📍 {{ lapor.lokasi }}</p>
          <p class="deskripsi">
            {{ lapor.deskripsi.length > 100 ? lapor.deskripsi.slice(0, 100) + '...' : lapor.deskripsi }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const laporan = ref([])

const totalLaporan = ref(0)
const laporanTerkirim = ref(0)
const laporanDiproses = ref(0)
const laporanSelesai = ref(0)
const laporanTerbaru = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/laporan')
  const data = await res.json()
  laporan.value = data

  totalLaporan.value = data.length
  laporanTerkirim.value = data.filter(l => l.status === 'Terkirim').length
  laporanDiproses.value = data.filter(l => l.status === 'Diproses').length
  laporanSelesai.value = data.filter(l => l.status === 'Selesai').length

  laporanTerbaru.value = [...data]
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, 5)
})
</script>

<style scoped>
.beranda-container {
  padding: 40px 24px;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to right, #eaf2ff, #f7fbff);
  min-height: 100vh;
  border-radius: 10px;
}

/* Sambutan */
.welcome-section {
  background-color: #004b8d;
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 40px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.welcome-section h1 {
  font-size: 28px;
  margin-bottom: 8px;
  color: white;
}
.welcome-section .brand {
  color: #ffd500;
  font-weight: bold;
}
.welcome-section p {
  font-size: 16px;
}

.statistik-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}
.stat-box {
  min-width: 200px;
  flex: 1;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  color: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.stat-box:hover {
  transform: translateY(-5px);
}
.icon {
  font-size: 30px;
  margin-bottom: 6px;
}
.box-total {
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
}
.box-terkirim {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
}
.box-diproses {
  background: linear-gradient(135deg, #ffa751, #ff6a00);
}
.box-selesai {
  background: linear-gradient(135deg, #42e695, #3bb2b8);
}

.laporan-terbaru-section {
  margin-top: 30px;
}
.laporan-terbaru-section h2 {
  font-size: 22px;
  color: #003c7e;
  text-align: center;
  margin-bottom: 20px;
}
.kosong {
  text-align: center;
  font-style: italic;
  color: #666;
  margin-bottom: 20px;
}
.laporan-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.laporan-card {
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}
.laporan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}
.laporan-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}
.laporan-card h3 {
  font-size: 17px;
  margin-bottom: 6px;
  color: #222;
}
.laporan-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 8px;
}
.status {
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  color: white;
}
.status.terkirim {
  background-color: #007bff;
}
.status.diproses {
  background-color: #ff9800;
}
.status.selesai {
  background-color: #4caf50;
}
.tanggal {
  color: #555;
}
.deskripsi {
  font-size: 14px;
  color: #444;
}

.lokasi {
  font-size: 13px;
  color: #333;
  margin-bottom: 6px;
  font-weight: 500;
}

</style>
