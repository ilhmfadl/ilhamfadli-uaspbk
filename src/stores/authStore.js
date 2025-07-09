import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)
  const notifikasiDilihat = ref(false) // <--- Tambahkan ini

  function login(username, password) {
    const accounts = [
      {
        username: 'admin',
        password: 'admin123',
        name: 'Admin Sistem',
        email: 'admin@example.com',
        fakultas: 'Teknik Informatika',
        role: 'admin',
        photo: ''
      },
      {
        username: 'user',
        password: 'user123',
        name: 'Mahasiswa UIR',
        email: 'mahasiswa@uir.ac.id',
        fakultas: 'Fakultas Teknik',
        role: 'user',
        photo: ''
      }
    ]

    const akun = accounts.find(acc => acc.username === username && acc.password === password)

    if (akun) {
      isAuthenticated.value = true
      user.value = { ...akun }
      notifikasiDilihat.value = false // Reset saat login
    } else {
      throw new Error('Username atau password salah!')
    }
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    notifikasiDilihat.value = false
  }

  return {
    isAuthenticated,
    user,
    login,
    logout,
    notifikasiDilihat // <--- jangan lupa kembalikan
  }
})
