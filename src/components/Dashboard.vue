<template>
  <div class ="bg-dashboard">
  <div class="dashboard">
    <h2>Dashboard Laporan Kerusakan</h2>

    <div class="filter-buttons">
      <button
        v-for="option in filterOptions"
        :key="option"
        :class="{ active: filterStatus === option }"
        @click="filterStatus = option"
      >
        {{ option }}
      </button>
    </div>

    <table class="laporan-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Judul</th>
          <th>Fakultas</th>
          <th>Lokasi</th>
          <th>Tanggal</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(laporan, index) in filteredLaporan" :key="laporan.id">
          <td>{{ laporan.id }}</td>
          <td>{{ laporan.judul }}</td>
          <td>{{ laporan.fakultas }}</td>
          <td>{{ laporan.lokasi }}</td>
          <td>{{ laporan.tanggal }}</td>
          <td>
            <select v-model="laporan.status" @change="ubahStatus(laporan)">
              <option value="Terkirim">Terkirim</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </td>
          <td>
            <button class="btn-detail" @click="tampilkanDetail(laporan)">Detail</button>
            <button class="btn-delete" @click="hapusLaporan(index)">Hapus</button>
          </td>
        </tr>
        <tr v-if="filteredLaporan.length === 0">
          <td colspan="7" class="kosong">Tidak ada laporan.</td>
        </tr>
      </tbody>
    </table>
  </div>

    <div v-if="showModal" class="modal-overlay" @click.self="tutupModal">
      <div class="modal-content">
        <h3>📋 Detail Laporan</h3>
        <div class="detail-row"><strong>Judul:</strong> <span>{{ selected.judul }}</span></div>
        <div class="detail-row"><strong>Fakultas:</strong> <span>{{ selected.fakultas }}</span></div>
        <div class="detail-row"><strong>Gedung:</strong> <span>{{ selected.gedung }}</span></div>
        <div class="detail-row"><strong>Ruangan:</strong> <span>{{ selected.ruangan }}</span></div>
        <div class="detail-row"><strong>Lokasi:</strong> <span>{{ selected.lokasi }}</span></div>
        <div class="detail-row"><strong>Tanggal:</strong> <span>{{ selected.tanggal }}</span></div>
        <div class="detail-row">
          <strong>Status:</strong>
          <span :class="'status-label ' + selected.status.toLowerCase()">
            {{ selected.status }}
          </span>
        </div>
        <div class="detail-row full">
          <strong>Deskripsi:</strong>
          <p class="deskripsi">{{ selected.deskripsi }}</p>
        </div>
        <div v-if="selected.gambar" class="img-wrapper">
          <img :src="selected.gambar" alt="Foto Kerusakan" />
        </div>
        <button class="btn-close" @click="tutupModal">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const laporanList = ref([])
const showModal = ref(false)
const selected = ref({})
const filterStatus = ref('Semua')
const filterOptions = ['Semua', 'Terkirim', 'Diproses', 'Selesai']

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/laporan')
  laporanList.value = res.data
})

function tampilkanDetail(lapor) {
  selected.value = lapor
  showModal.value = true
}
function tutupModal() {
  showModal.value = false
}

async function hapusLaporan(index) {
  const confirmDelete = confirm('Hapus laporan ini?')
  if (!confirmDelete) return
  const laporan = laporanList.value[index]
  await axios.delete(`http://localhost:3000/laporan/${laporan.id}`)
  laporanList.value.splice(index, 1)
}

async function ubahStatus(laporan) {
  try {
    await axios.patch(`http://localhost:3000/laporan/${laporan.id}`, {
      status: laporan.status
    })
  } catch (err) {
    alert('Gagal mengubah status')
  }
}

const filteredLaporan = computed(() => {
  if (filterStatus.value === 'Semua') return laporanList.value
  return laporanList.value.filter(l => l.status === filterStatus.value)
})
</script>

<style scoped>

.bg-dashboard{
  padding: 40px 24px;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(to right, #eaf2ff, #f7fbff);
  min-height: 100vh;
  border-radius: 10px;
}
.dashboard {
  max-width: 1100px;
  margin: auto;
  background: linear-gradient(135deg, #e3f2fd, #e8f5e9);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #004b8d;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}
.filter-buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #dbe7f4;
  color: #004b8d;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}
.filter-buttons button.active,
.filter-buttons button:hover {
  background-color: #004b8d;
  color: white;
}

.laporan-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

.laporan-table thead {
  background-color: #004b8d;
  color: white;
}

.laporan-table th,
.laporan-table td {
  padding: 12px 14px;
  border: 1px solid #ccc;
  text-align: left;
}

.laporan-table tbody tr:hover {
  background-color: #eef6ff;
}

select {
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btn-detail,
.btn-delete {
  margin: 2px;
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.btn-detail {
  background-color: #2196f3;
}
.btn-delete {
  background-color: #d9534f;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: linear-gradient(to right, #eaf2ff, #f7fbff);
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}
.modal-content h3 {
  margin-bottom: 18px;
  color: #004b8d;
}
.detail-row {
  margin-bottom: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 15px;
}
.detail-row strong {
  min-width: 100px;
  color: #004b8d;
}
.detail-row span {
  color: #333;
}
.detail-row.full {
  flex-direction: column;
}
.deskripsi {
  background-color: #f8f9fb;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  color: #555;
  margin-top: 4px;
  font-size: 14px;
}
.img-wrapper img {
  margin-top: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  max-width: 100%;
}
.status-label {
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: bold;
}
.status-label.terkirim {
  background-color: #d6eaff;
  color: #0056b3;
}
.status-label.diproses {
  background-color: #fff3cd;
  color: #856404;
}
.status-label.selesai {
  background-color: #d4edda;
  color: #155724;
}
.btn-close {
  margin-top: 20px;
  background: #004b8d;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}
.kosong {
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 12px;
}
</style>
