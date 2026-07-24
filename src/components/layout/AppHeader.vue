<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useCartStore } from '@/stores/cart.store'
import { useAppStore } from '@/stores/app.store'
import { useFavoritesStore } from '@/stores/favorites.store'

const appStore = useAppStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const { isDarkMode } = storeToRefs(appStore)
const { totalItems } = storeToRefs(cartStore)
const { totalFavorites } = storeToRefs(favoritesStore)
</script>

<template>
  <header
    class="border-b border-gray-200 bg-white transition-colors dark:border-gray-800 dark:bg-gray-900"
  >
    <div
      class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
    >
      <RouterLink
        to="/"
        class="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400"
      >
        Vue Store
      </RouterLink>

      <nav class="flex items-center gap-5" aria-label="Navegación principal">
        <RouterLink
          to="/"
          class="text-sm font-medium text-gray-600 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        >
          Inicio
        </RouterLink>

        <RouterLink
          to="/products"
          class="text-sm font-medium text-gray-600 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        >
          Productos
        </RouterLink>

        <RouterLink
          to="/favorites"
          class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        >
          <span>Favoritos</span>

          <span
            v-if="totalFavorites > 0"
            class="inline-flex min-w-6 items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-bold text-white"
            :aria-label="`${totalFavorites} productos favoritos`"
          >
            {{ totalFavorites > 99 ? '99+' : totalFavorites }}
          </span>
        </RouterLink>

        <RouterLink
          to="/cart"
          class="relative inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
        >
          <span>Carrito</span>

          <span
            v-if="totalItems > 0"
            class="inline-flex min-w-6 items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs font-bold text-white"
            :aria-label="`${totalItems} productos en el carrito`"
          >
            {{ totalItems > 99 ? '99+' : totalItems }}
          </span>
        </RouterLink>

        <button
          type="button"
          class="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          :aria-label="
            isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'
          "
          @click="appStore.toggleTheme"
        >
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </nav>
    </div>
  </header>
</template>
