import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../stores/authStore.js'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // reset pinia di setiap test
  })

  it('default state isAuthenticated = false', () => {
    const auth = useAuthStore()
    expect(auth.isAuthenticated).toBe(false)
  })

  it('login() sets isAuthenticated to true with correct credentials', () => {
    const auth = useAuthStore()
    auth.login('admin', 'admin123')
    expect(auth.isAuthenticated).toBe(true)
  })

  it('login() throws error with wrong credentials', () => {
    const auth = useAuthStore()
    expect(() => auth.login('user', 'salah')).toThrow('Username atau password salah!')
  })

  it('logout() sets isAuthenticated to false', () => {
    const auth = useAuthStore()
    auth.login('admin', 'admin123')
    auth.logout()
    expect(auth.isAuthenticated).toBe(false)
  })
})
