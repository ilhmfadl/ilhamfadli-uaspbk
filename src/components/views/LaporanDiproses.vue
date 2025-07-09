<template>
  <div class="beranda-container">
    <section class="welcome-section">
      <h1>Laporan <span class="brand">Diproses</span></h1>
      <p>Berikut laporan yang sedang dalam proses penanganan.</p>
    </section>

    <section class="laporan-terbaru-section">
      <div v-if="laporan.length === 0" class="kosong">
        Tidak ada laporan yang sedang diproses.
      </div>
      <div class="laporan-list">
        <div class="laporan-card" v-for="lapor in laporan" :key="lapor.id">
          <img v-if="lapor.gambar" :src="lapor.gambar" class="laporan-img" />
          <h3>{{ lapor.judul }}</h3>
          <div class="laporan-info">
            <span class="status diproses">{{ lapor.status }}</span>
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

onMounted(async () => {
  const res = await fetch('http://localhost:3000/laporan')
  const data = await res.json()
  laporan.value = data.filter(l => l.status === 'Diproses')
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


.welcome-section {
  background-color: #004b8d;
  color: white;
  padding: 24px 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.welcome-section h1 {
  font-size: 26px;
  margin-bottom: 6px;
  color: white;
}
.welcome-section .brand {
  color: #ffb74d;
  font-weight: bold;
}
.welcome-section p {
  font-size: 15px;
}

.laporan-terbaru-section {
  margin-top: 20px;
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
  background: linear-gradient(135deg, #e3f2fd, #fff3e0);
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
.status.diproses {
  background-color: #ff9800;
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
