<template>
  <div class="bg-riwayat">
  <div class="riwayat-container">
    <h2>Riwayat Laporan</h2>

    <div v-if="laporan.length === 0" class="kosong">
      Belum ada laporan yang masuk.
    </div>

    <div class="laporan-list">
      <div class="laporan-card" v-for="(item, index) in laporan" :key="index">
        <div class="laporan-section">
          <h3 class="laporan-title">
            <i class="fas fa-tools"></i> {{ item.judul }}
          </h3>
        </div>

        <div class="laporan-section info-points">
          <p><i class="fas fa-map-marker-alt icon"></i> <strong>Lokasi:</strong> {{ item.lokasi }}</p>
          <p><i class="fas fa-calendar-alt icon"></i> <strong>Tanggal:</strong> {{ item.tanggal }}</p>
          <p>
            <i class="fas fa-info-circle icon"></i> <strong>Status:</strong>
            <span :class="item.status === 'Selesai' ? 'badge-selesai' : 'badge-proses'">
              {{ item.status }}
            </span>
          </p>
        </div>

        <div class="laporan-section">
          <p class="laporan-label"><i class="fas fa-align-left icon"></i> <strong>Deskripsi Kerusakan:</strong></p>
          <p class="laporan-deskripsi">{{ item.deskripsi }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const laporanSemua = ref([])
const auth = useAuthStore()

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/laporan')
    laporanSemua.value = res.data.reverse()
  } catch (error) {
    console.error('Gagal memuat data laporan:', error)
  }
})

const laporan = computed(() => {
  return laporanSemua.value.filter(item => item.email === auth.user.email)
})
</script>


<style scoped>

.bg-riwayat{
  padding: 40px 24px;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to right, #eaf2ff, #f7fbff);
  min-height: 100vh;
  border-radius: 10px;
}
.riwayat-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  color: #003c7e;
  margin-bottom: 30px;
  font-size: 26px;
}

.kosong {
  text-align: center;
  font-style: italic;
  color: #777;
}

.laporan-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.laporan-card {
  padding: 24px;
  border-radius: 12px;
  background-color: #f9fbff;
  border: 1px solid #d9e7f6;
  transition: all 0.3s ease;
}

.laporan-card:hover {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.laporan-title {
  font-size: 20px;
  margin-bottom: 12px;
  color: #004b8d;
}

.laporan-section {
  margin-bottom: 16px;
}

.info-points p {
  margin: 4px 0;
  font-size: 15px;
  color: #333;
}

.icon {
  color: #004b8d;
  margin-right: 6px;
}

.laporan-label {
  margin-bottom: 6px;
  font-size: 15px;
  color: #222;
}

.laporan-deskripsi {
  font-size: 15px;
  color: #444;
  background-color: #eef4ff;
  padding: 12px;
  border-radius: 6px;
  line-height: 1.5;
}

.badge-selesai {
  background-color: #d4f8d4;
  color: #2e7d32;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 13px;
}

.badge-proses {
  background-color: #fff3cd;
  color: #a87900;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 13px;
}
</style>
