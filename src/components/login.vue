<template>
  <div class="login-wrapper">
    <div class="logo-header">
      <img src="../assets/logo2.png" alt="FixUIR Logo" />
    </div>

    <!-- SISI KIRI -->
    <div class="login-left">
      <div class="logo-row">
        <img src="../assets/Logo_UIR.png" alt="Logo UIR" class="logo-img" />
        <img src="../assets/logo1.png" alt="Ilustrasi" class="logo-img" />
      </div>

      <div class="welcome-text">
        <h1>Selamat Datang di <span class="highlight">FixUIR</span></h1>
        <p class="description">
          Aplikasi pelaporan kerusakan fasilitas kampus yang efisien dan responsif.
        </p>
        <p class="kalimat-penjelas">
          Lapor dengan cepat, pantau progres perbaikan, dan bantu wujudkan lingkungan kampus yang lebih nyaman dan tertib.
        </p>
      </div>

      <transition name="fade" mode="out-in">
        <p :key="slideIndex" class="slide-text">{{ slides[slideIndex] }}</p>
      </transition>
    </div>

    <!-- SISI KANAN -->
    <div class="login-right">
      <h2>Login Sistem</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" placeholder="Masukkan username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Masukkan password" required />
        </div>
        <button type="submit" class="btn-login">Login</button>
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const slideIndex = ref(0)

const slides = [
  '“Laporkan kerusakan hanya dalam beberapa klik.”',
  '“Pantau perkembangan perbaikan secara real-time.”',
  '“FixUIR hadir untuk kenyamanan seluruh civitas akademika.”',
]

onMounted(() => {
  setInterval(() => {
    slideIndex.value = (slideIndex.value + 1) % slides.length
  }, 5000)
})

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  try {
    await auth.login(username.value, password.value)
    router.push('/')
  } catch (err) {
    errorMsg.value = err.message
  }
}
</script>

/* KIRI */
<style scoped>
.login-wrapper {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f7faff;
  overflow: hidden;
}

.logo-header {
  position: absolute;
  top: 18px;
  left: 20px;
}
.logo-header img {
  height: 42px;
}

.login-left {
  flex: 3;
  padding: 60px 50px;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo-row {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
}

.logo-img {
  height: 140px;
  object-fit: contain;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 520px;
  margin-bottom: 20px;
}

.welcome-text h1 {
  font-size: 32px;
  color: #003c7e;
  margin-bottom: 10px;
}

.highlight {
  color: #0077cc;
  font-weight: bold;
}

.description {
  font-size: 17px;
  color: #444;
  margin-bottom: 12px;
}

.kalimat-penjelas {
  font-size: 15px;
  color: #555;
  max-width: 480px;
}

.slide-text {
  font-size: 14px;
  color: #666;
  font-style: italic;
  margin-top: 10px;
  text-align: center;
  max-width: 420px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.login-right {
  flex: 1.5;
  padding: 50px 40px;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.05);
}

.login-right h2 {
  margin-bottom: 25px;
  font-size: 24px;
  color: #003c7e;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
  color: #333;
}

input {
  width: 100%;
  padding: 12px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

input:focus {
  border-color: #004b8d;
  outline: none;
}

.btn-login {
  width: 100%;
  background-color: #004b8d;
  color: white;
  font-weight: 700;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #0060c2;
}

.error-msg {
  color: #d40000;
  font-weight: 600;
  text-align: center;
  margin-top: 15px;
}
</style>
