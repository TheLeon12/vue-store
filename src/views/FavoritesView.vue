<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import BaseConfirmDialog from '@/components/base/BaseConfirmDialog.vue'
import FavoritesGrid from '@/components/favorites/FavoritesGrid.vue'

import { useFavoritesStore } from '@/stores/favorites.store'

const favoritesStore = useFavoritesStore()

const {
  products,
  totalFavorites,
  isEmpty,
} = storeToRefs(favoritesStore)

const isClearDialogOpen = ref(false)

function openClearDialog(): void {
  isClearDialogOpen.value = true
}

function closeClearDialog(): void {
  isClearDialogOpen.value = false
}

function confirmClearFavorites(): void {
  favoritesStore.clearFavorites()
  closeClearDialog()
}
</script>

<template>
  <section
    class="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
  >
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p
          class="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
        >
          Tu selección
        </p>

        <h1
          class="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl"
        >
          Productos favoritos
        </h1>

        <p
          v-if="!isEmpty"
          class="mt-3 text-gray-600 dark:text-gray-300"
        >
          Tienes {{ totalFavorites }}
          {{
            totalFavorites === 1
              ? 'producto favorito'
              : 'productos favoritos'
          }}.
        </p>
      </div>

      <button
        v-if="!isEmpty"
        type="button"
        class="self-start text-sm font-semibold text-red-600 transition hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 sm:self-auto"
        @click="openClearDialog"
      >
        Eliminar todos
      </button>
    </div>

    <div
      v-if="isEmpty"
      class="mt-10 rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700"
    >
      <div
        class="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-3xl dark:bg-red-950"
        aria-hidden="true"
      >
        ♡
      </div>

      <h2 class="mt-5 text-xl font-bold text-gray-950 dark:text-white">
        No tienes productos favoritos
      </h2>

      <p class="mt-3 text-gray-600 dark:text-gray-300">
        Guarda los productos que te interesen para encontrarlos fácilmente.
      </p>

      <RouterLink
        to="/products"
        class="mt-7 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
      >
        Explorar productos
      </RouterLink>
    </div>

    <FavoritesGrid
      v-else
      class="mt-10"
      :products="products"
    />

  <BaseConfirmDialog
  :open="isClearDialogOpen"
  title="Eliminar todos los favoritos"
  message="Se eliminarán todos los productos guardados como favoritos."
  confirm-label="Eliminar favoritos"
  @confirm="confirmClearFavorites"
  @cancel="closeClearDialog"
/>
  </section>
</template>