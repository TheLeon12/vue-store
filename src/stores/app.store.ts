import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

const THEME_STORAGE_KEY = 'vue-store-theme'

export const useAppStore = defineStore('app', () => {
  const storeName = ref('Vue Store')

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

  const isDarkMode = ref(savedTheme === 'dark')

  const themeName = computed(() =>
    isDarkMode.value ? 'Modo oscuro' : 'Modo claro',
  )

  function applyTheme(): void {
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  function toggleTheme(): void {
    isDarkMode.value = !isDarkMode.value
  }

  watch(
    isDarkMode,
    (darkModeEnabled) => {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        darkModeEnabled ? 'dark' : 'light',
      )

      applyTheme()
    },
    {
      immediate: true,
    },
  )

  return {
    storeName,
    isDarkMode,
    themeName,
    toggleTheme,
  }
})
