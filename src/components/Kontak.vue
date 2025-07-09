<template>
  <div class="kontak-wrapper">
    <div class="kontak-card">
      <h2>Hubungi Kami</h2>
      <p class="intro">
        Ada pertanyaan atau masalah? Kirim pesan Anda atau hubungi kami langsung melalui kontak berikut.
      </p>

      <form @submit.prevent="submitPesan" novalidate class="form-kontak">
        <div class="form-field">
          <label for="nama"><i class="fas fa-user"></i> Nama Lengkap</label>
          <input type="text" id="nama" v-model="form.nama" placeholder="Masukkan nama Anda" />
        </div>

        <div class="form-field">
          <label for="email"><i class="fas fa-envelope"></i> Email</label>
          <input type="email" id="email" v-model="form.email" placeholder="Email aktif Anda" />
        </div>

        <div class="form-field full">
          <label for="pesan"><i class="fas fa-comment-dots"></i> Pesan</label>
          <textarea id="pesan" v-model="form.pesan" placeholder="Tulis pesan Anda di sini..."></textarea>
        </div>

        <button type="submit" class="btn-submit">Kirim Pesan</button>
        <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
      </form>

      <div class="kontak-info">
        <h3><i class="fas fa-phone-alt"></i> Kontak Informasi</h3>
        <p><i class="fas fa-phone"></i> (0761) 1234567</p>
        <p><i class="fas fa-envelope"></i> support@uir.ac.id</p>
        <p><i class="fas fa-map-marker-alt"></i> Jl. HR. Soebrantas No.123, Pekanbaru</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  nama: '',
  email: '',
  pesan: '',
})

const successMsg = ref('')

function submitPesan() {
  if (!form.nama.trim() || !form.email.trim() || !form.pesan.trim()) {
    alert('Mohon isi semua data dengan lengkap!')
    return
  }

  successMsg.value = 'Pesan Anda telah terkirim. Terima kasih!'
  form.nama = ''
  form.email = ''
  form.pesan = ''
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.kontak-wrapper {
  background: linear-gradient(to right, #eef3fb, #f7fbff);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
  border-radius: 10px;
}

.kontak-card {
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  border-radius: 16px;
  padding: 40px;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  color: #004b8d;
  font-size: 28px;
  margin-bottom: 10px;
}

.intro {
  text-align: center;
  color: #444;
  margin-bottom: 30px;
  font-size: 16px;
}

.form-kontak {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.full {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
  font-size: 14px;
}

label i {
  margin-right: 6px;
  color: #004b8d;
}

input,
textarea {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s;
  background: #fefefe;
}

input:focus,
textarea:focus {
  border-color: #004b8d;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.btn-submit {
  grid-column: 1 / -1;
  margin-top: 10px;
  background-color: #004b8d;
  color: white;
  padding: 14px 0;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background-color: #0066cc;
}

.success-msg {
  grid-column: 1 / -1;
  text-align: center;
  color: #2e7d32;
  font-weight: 600;
  margin-top: 16px;
  font-size: 15px;
}

.kontak-info {
  margin-top: 40px;
  background: #f0f7ff;
  padding: 20px 25px;
  border-radius: 12px;
  color: #004b8d;
}

.kontak-info h3 {
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
}

.kontak-info p {
  margin: 6px 0;
  font-size: 15px;
  display: flex;
  align-items: center;
}

.kontak-info i {
  margin-right: 10px;
}
</style>
