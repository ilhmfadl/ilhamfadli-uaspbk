import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LaporKerusakan from '../components/LaporKerusakan.vue'
import axios from 'axios'
import { createTestingPinia } from '@pinia/testing'

// Mock Axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn()
  }
}))

describe('LaporKerusakan.vue', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: {} })
  })

  it('render form input', () => {
    const wrapper = mount(LaporKerusakan, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            auth: {
              user: { email: 'test@email.com' }
            }
          }
        })]
      }
    })

    expect(wrapper.find('#judul').exists()).toBe(true)
    expect(wrapper.find('#deskripsi').exists()).toBe(true)
    expect(wrapper.find('#fakultas').exists()).toBe(true)
    expect(wrapper.find('#gedung').exists()).toBe(true)
    expect(wrapper.find('#ruangan').exists()).toBe(true)
    expect(wrapper.find('#tanggal').exists()).toBe(true)
    expect(wrapper.find('#gambar').exists()).toBe(true)
  })

  it('submit data form berhasil menampilkan pesan sukses', async () => {
    const wrapper = mount(LaporKerusakan, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            auth: {
              user: { email: 'test@email.com' }
            }
          }
        })]
      }
    })

    await wrapper.find('#judul').setValue('Kursi patah')
    await wrapper.find('#deskripsi').setValue('Kaki kursi patah')
    await wrapper.find('#fakultas').setValue('Fakultas Teknik')
    await wrapper.find('#gedung').setValue('Gedung A')
    await wrapper.find('#ruangan').setValue('101')
    await wrapper.find('#tanggal').setValue('2025-07-08')

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Laporan berhasil dikirim')
  })
})
