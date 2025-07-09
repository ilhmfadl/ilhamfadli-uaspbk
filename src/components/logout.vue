<template>
  <div class="logout-container">
    <p>Anda akan logout...</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  const konfirmasi = confirm('Apakah Anda yakin ingin logout?')
  if (konfirmasi) {
    auth.logout()
    router.push('/login')
  } else {
    router.back()
  }
})
</script>

<style scoped>
.logout-container {
  text-align: center;
  margin-top: 100px;
  font-size: 18px;
  color: #444;
}
</style>
