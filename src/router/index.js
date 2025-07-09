import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'

// Komponen utama
import Beranda from '../components/Beranda.vue'
import LaporKerusakan from '../components/LaporKerusakan.vue'
import RiwayatLaporan from '../components/RiwayatLaporan.vue'
import Tentang from '../components/Tentang.vue'
import Kontak from '../components/Kontak.vue'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/login.vue'
import Logout from '../components/logout.vue'
import Profile from '../components/Profile.vue'
import Notifikasi from '../components/Notifikasi.vue'

// Submenu Beranda (laporan berdasarkan status)
import LaporanTerkirim from '../components/views/LaporanTerkirim.vue'
import LaporanDiproses from '../components/views/LaporanDiproses.vue'
import LaporanSelesai from '../components/views/LaporanSelesai.vue'

const routes = [
  { path: '/', name: 'Beranda', component: Beranda, meta: { requiresAuth: true } },
  { path: '/lapor', name: 'LaporKerusakan', component: LaporKerusakan, meta: { requiresAuth: true } },
  { path: '/riwayat', name: 'RiwayatLaporan', component: RiwayatLaporan, meta: { requiresAuth: true } },
  { path: '/tentang', name: 'Tentang', component: Tentang, meta: { requiresAuth: true } },
  { path: '/kontak', name: 'Kontak', component: Kontak, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, adminOnly: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '/logout', name: 'logout', component: Logout, meta: { requiresAuth: true } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/notifikasi', name: 'Notifikasi', component: Notifikasi, meta: { requiresAuth: true } },

  // Rute submenu laporan berdasarkan status
  { path: '/laporan/terkirim', name: 'LaporanTerkirim', component: LaporanTerkirim, meta: { requiresAuth: true } },
  { path: '/laporan/diproses', name: 'LaporanDiproses', component: LaporanDiproses, meta: { requiresAuth: true } },
  { path: '/laporan/selesai', name: 'LaporanSelesai', component: LaporanSelesai, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.adminOnly && auth.user?.role !== 'admin') {
    return next('/')
  }

  next()
})

export default router
