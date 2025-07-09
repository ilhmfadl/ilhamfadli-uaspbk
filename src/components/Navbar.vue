<template>
  <nav class="sidebar">
    <!-- Beranda Dropdown -->
    <div class="dropdown-toggle">
      <router-link to="/" class="link-text">Beranda</router-link>
      <span class="arrow" @click="toggleBeranda">{{ showBerandaSubmenu ? '▲' : '▼' }}</span>
    </div>
    <section v-if="showBerandaSubmenu" class="submenu-link">
      <router-link to="/laporan/terkirim">Terkirim</router-link>
      <router-link to="/laporan/diproses">Diproses</router-link>
      <router-link to="/laporan/selesai">Selesai</router-link>
    </section>

    <!-- Menu Lain -->
    <router-link to="/lapor">Lapor Kerusakan</router-link>
    <router-link to="/riwayat">Riwayat Laporan</router-link>

    <router-link to="/notifikasi" class="nav-link">
      Notifikasi
      <span
        v-if="jumlahNotifikasi > 0 && !auth.notifikasiDilihat"
        class="badge"
      >
        {{ jumlahNotifikasi }}
      </span>
    </router-link>

    <router-link v-if="isAdmin" to="/dashboard">Dashboard</router-link>
    <router-link to="/kontak">Kontak</router-link>
    <router-link to="/tentang">Tentang Sistem</router-link>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/authStore.js'

const auth = useAuthStore()
const isAdmin = computed(() => auth.user?.role === 'admin')

const semuaLaporan = ref([])
const showBerandaSubmenu = ref(false)

function toggleBeranda() {
  showBerandaSubmenu.value = !showBerandaSubmenu.value
}

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/laporan')
    semuaLaporan.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data laporan:', err)
  }
})

const jumlahNotifikasi = computed(() =>
  semuaLaporan.value.filter(item =>
    item.email === auth.user.email &&
    ['Terkirim', 'Diproses'].includes(item.status)
  ).length
)
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  padding: 20px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
}

.sidebar a,
.dropdown-toggle {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 6px;
  transition: 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.sidebar a.router-link-exact-active {
  background-color: #004b8d;
  color: white;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 1px;
  border-radius: 6px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 0;
}

.submenu-link {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  margin-top: 4px;
  gap: 6px;
}

.sidebar a,
.sidebar .dropdown-toggle {
  margin: 0; 
}

.badge {
  background: #e53935;
  color: white;
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 999px;
  font-weight: bold;
  margin-left: 8px;
  animation: pulse 1s infinite ease-in-out;
}


@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.arrow {
  font-size: 12px;
  color: #555;
}
</style>
