<template>
  <div class="notifikasi-container">
    <h2>🔔 Notifikasi Laporan</h2>

    <div v-if="notifikasiUser.length === 0" class="kosong">
      Tidak ada notifikasi saat ini.
    </div>

    <ul class="notifikasi-list">
      <li v-for="notif in notifikasiUser" :key="notif.id" class="notif-item">
        <div class="notif-icon" :class="notif.status.toLowerCase()">
          <span v-if="notif.status === 'Terkirim'">📤</span>
          <span v-else-if="notif.status === 'Diproses'">⚙️</span>
          <span v-else>✅</span>
        </div>
        <div class="notif-content">
          <p class="notif-judul">{{ notif.judul }}</p>
          <p class="notif-status">
            Status: <span :class="['badge', notif.status.toLowerCase()]">{{ notif.status }}</span>
          </p>
          <p class="notif-date">🗓 {{ notif.tanggal }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const semuaLaporan = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/laporan')
  semuaLaporan.value = res.data

  auth.notifikasiDilihat = true
})

const notifikasiUser = computed(() =>
  semuaLaporan.value
    .filter(lapor =>
      lapor.email === auth.user.email &&
      ['Terkirim', 'Diproses', 'Selesai'].includes(lapor.status)
    )
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
)
</script>


<style scoped>
.notifikasi-container {
  max-width: 750px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 26px;
  color: #004b8d;
}

.kosong {
  text-align: center;
  font-style: italic;
  color: #777;
  font-size: 15px;
}

.notifikasi-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notif-item {
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 14px;
  background: #f8fbff;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-items: center;
  transition: transform 0.2s ease;
}
.notif-item:hover {
  transform: translateY(-3px);
}

.notif-icon {
  font-size: 30px;
  padding: 12px;
  border-radius: 50%;
  background-color: #e0ecff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  height: 54px;
}

.notif-content {
  flex: 1;
}

.notif-judul {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  color: #003c7e;
}

.notif-status {
  font-size: 14px;
  margin-bottom: 6px;
  color: #444;
}

.notif-date {
  font-size: 13px;
  color: #777;
}

.badge {
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  font-size: 13px;
  margin-left: 4px;
}
.badge.terkirim {
  background-color: #2196f3;
}
.badge.diproses {
  background-color: #ff9800;
}
.badge.selesai {
  background-color: #4caf50;
}
</style>
