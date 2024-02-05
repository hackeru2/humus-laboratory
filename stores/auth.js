// stores/car.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({})

  const isAdmin = computed(() => false)
  return { user, isAdmin }
})
