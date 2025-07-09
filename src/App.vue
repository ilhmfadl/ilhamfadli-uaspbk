<template>
  <div id="app">
    <Header v-if="!isLoginPage" />

    <div class="layout" v-if="!isLoginPage">
      <Navbar />
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <!-- Jika halaman login -->
    <router-view v-if="isLoginPage" />

    <Footer v-if="!isLoginPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
</script>

<style>
.layout {
  display: flex;
  flex: 1;
}
</style>
