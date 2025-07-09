<template>
  <header class="header">
    <img src="../assets/logo2.png" alt="FixUIR Logo" class="logo-img" />
    
    <router-link to="/profile" class="profile-icon" aria-label="Profile">
      <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30" fill="white">
        <path d="M12 12c2.7 0 5.5-1.3 5.5-4.5S14.7 3 12 3 6.5 4.3 6.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z"/>
      </svg>
    </router-link>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  padding: 16px 28px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', sans-serif;
}

.logo-img {
  margin-left: 1%;
  height: 45px;
  object-fit: contain;
}

.profile-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #004b8d;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  transition: background-color 0.3s;
}

.profile-icon:hover {
  background-color: #ffd500;
}
</style>
