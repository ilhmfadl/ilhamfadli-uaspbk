<template>
  <div class="lapor-wrapper">
    <div class="lapor-card">
      <h2>Lapor Kerusakan</h2>

      <form @submit.prevent="submitLaporan" novalidate>
        <div class="form-grid">
          <div class="form-group">
            <label for="judul">Judul</label>
            <input type="text" id="judul" v-model="laporan.judul" placeholder="Contoh: AC Tidak Menyala" />
          </div>

          <div class="form-group">
            <label for="fakultas">Fakultas</label>
            <select id="fakultas" v-model="laporan.fakultas">
              <option value="" disabled selected>Pilih Fakultas</option>
              <option>Fakultas Teknik</option>
              <option>Fakultas Ekonomi</option>
              <option>Fakultas Ilmu Komputer</option>
              <option>Fakultas Hukum</option>
              <option>Fakultas Pertanian</option>
            </select>
          </div>

          <div class="form-group">
            <label for="gedung">Gedung</label>
            <input type="text" id="gedung" v-model="laporan.gedung" placeholder="Contoh: Gedung B" />
          </div>

          <div class="form-group">
            <label for="ruangan">Ruangan</label>
            <input type="text" id="ruangan" v-model="laporan.ruangan" placeholder="Contoh: 305" />
          </div>

          <div class="form-group">
            <label for="tanggal">Tanggal Lapor</label>
            <input type="date" id="tanggal" v-model="laporan.tanggal" />
          </div>

          <div class="form-group full">
            <label for="deskripsi">Deskripsi</label>
            <textarea id="deskripsi" v-model="laporan.deskripsi" placeholder="Jelaskan kerusakan secara rinci..."></textarea>
          </div>

          <div class="form-group full">
            <label for="gambar">Foto Kerusakan</label>
            <input type="file" id="gambar" @change="handleFileUpload" accept="image/*" />
          </div>

          <div v-if="preview" class="preview full">
            <img :src="preview" alt="Preview Gambar" />
          </div>
        </div>

        <button type="submit" class="btn-submit">Kirim Laporan</button>
      </form>

      <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()

const laporan = reactive({
  judul: '',
  deskripsi: '',
  fakultas: '',
  gedung: '',
  ruangan: '',
  lokasi: '',
  tanggal: '',
  gambar: '',
  email: auth.user.email 
})

const preview = ref('')
const successMsg = ref('')

watch(() => [laporan.gedung, laporan.ruangan], () => {
  laporan.lokasi = laporan.gedung && laporan.ruangan
    ? `${laporan.gedung} Ruang ${laporan.ruangan}`
    : ''
})

function handleFileUpload(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      laporan.gambar = reader.result
      preview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

async function submitLaporan() {
  if (!laporan.judul || !laporan.deskripsi || !laporan.fakultas || !laporan.gedung || !laporan.ruangan || !laporan.tanggal) {
    alert('Mohon lengkapi semua data!')
    return
  }

  try {
    await axios.post('http://localhost:3000/laporan', {
      ...laporan,
      email: auth.user.email,
      status: 'Terkirim'
    })
    successMsg.value = 'Laporan berhasil dikirim!'

    // reset form
    Object.assign(laporan, {
      judul: '', deskripsi: '', fakultas: '', gedung: '',
      ruangan: '', lokasi: '', tanggal: '', gambar: '',
      email: auth.user.email
    })
    preview.value = ''
  } catch (err) {
    alert('Gagal mengirim laporan.')
  }
}
</script>


<style scoped>
.lapor-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(to right, #eef3fb, #f7fbff);
  border-radius: 10px;

}

.lapor-card {
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 30px;
  max-width: 750px;
  width: 100%;
}

h2 {
  text-align: center;
  color: #004b8d;
  margin-bottom: 24px;
  font-size: 26px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.full {
  grid-column: 1 / -1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

input[type="text"],
input[type="date"],
textarea,
select {
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.3s;
  background: #fefefe;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #004b8d;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.preview img {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 8px;
  border: 1px solid #ddd;
}

.btn-submit {
  margin-top: 24px;
  width: 100%;
  background-color: #004b8d;
  color: white;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-submit:hover {
  background-color: #005fc4;
}

.success-msg {
  text-align: center;
  margin-top: 20px;
  color: #2e7d32;
  font-weight: 600;
}
</style>
