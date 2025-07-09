<template>
  <div class="profile-container">
    <div class="card-glow">
      <div class="card-header">
        <img
          class="profile-pic"
          :src="user.photo || defaultAvatar"
          alt="Foto Profil"
        />
        <h2>{{ user.name }}</h2>
        <p class="role">{{ user.role.toUpperCase() }}</p>
      </div>

      <div class="card-body">
        <div class="info-line">
          <span class="label">Email</span>
          <span class="value">{{ user.email }}</span>
        </div>
        <div class="info-line">
          <span class="label">Fakultas</span>
          <span class="value">{{ user.fakultas }}</span>
        </div>
      </div>

      <button @click="logout" class="btn-logout">Keluar Akun</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import { computed } from 'vue'

const router = useRouter()
const auth = useAuthStore()

const user = computed(() => auth.user || {
  name: 'Guest',
  email: '-',
  fakultas: '-',
  role: '-',
  photo: ''
})

const defaultAvatar = 'https://www.gravatar.com/avatar/?d=mp&s=200'

function logout() {
  router.push('/logout')
}
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(to right, #eaf2ff, #f7fbff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  border-radius: 10px;
}

.card-glow {
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  border-radius: 16px;
  padding: 30px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: fadeIn 0.7s ease;
}

.card-glow:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
  text-align: center;
  margin-bottom: 24px;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #2196f3;
  box-shadow: 0 0 12px rgba(33, 150, 243, 0.5);
  margin-bottom: 12px;
}

.card-header h2 {
  margin: 0;
  color: #1a237e;
  font-size: 24px;
}

.role {
  background-color: #2196f3;
  color: white;
  font-weight: bold;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 13px;
  margin-top: 6px;
}

.card-body {
  margin-top: 10px;
  padding: 12px 0;
  border-top: 1px solid #eee;
}

.info-line {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  color: #333;
}

.label {
  font-weight: bold;
  color: #444;
}

.value {
  color: #555;
}

.btn-logout {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #e53935;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-logout:hover {
  background-color: #c62828;
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
