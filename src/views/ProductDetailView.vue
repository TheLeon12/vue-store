<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'

import BaseLoader from '@/components/base/BaseLoader.vue'
import BaseMessage from '@/components/base/BaseMessage.vue'

import { useProductsStore } from '@/stores/products.store'
import { formatCurrency } from '@/utils/currency'

const route = useRoute()
const productsStore = useProductsStore()

const { selectedProduct, isLoading, error } = storeToRefs(productsStore)

const productId = computed(() => Number(route.params.id))

const isValidProductId = computed(() => {
  return Number.isInteger(productId.value) && productId.value > 0
})

onMounted(() => {
  if (!isValidProductId.value) {
    return
  }

  void productsStore.fetchProductById(productId.value)
})

onUnmounted(() => {
  productsStore.clearSelectedProduct()
})
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <RouterLink
      to="/products"
      class="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
    >
      ← Volver a productos
    </RouterLink>

    <BaseMessage
      v-if="!isValidProductId"
      class="mt-8"
      title="Identificador inválido"
      message="El identificador del producto no es válido."
      variant="error"
    />

    <BaseLoader
      v-else-if="isLoading"
      message="Cargando producto..."
    />

    <BaseMessage
      v-else-if="error"
      class="mt-8"
      title="No pudimos cargar el producto"
      :message="error"
      variant="error"
    />

    <article
      v-else-if="selectedProduct"
      class="mt-8 grid gap-10 lg:grid-cols-2"
    >
      <div class="overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
        <img
          :src="selectedProduct.images[0] || selectedProduct.thumbnail"
          :alt="selectedProduct.title"
          class="aspect-square w-full object-contain p-8"
        />
      </div>

      <div class="flex flex-col justify-center">
        <p
          class="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
        >
          {{ selectedProduct.category }}
        </p>

        <h1
          class="mt-3 text-4xl font-bold tracking-tight text-gray-950 dark:text-white"
        >
          {{ selectedProduct.title }}
        </h1>

        <p class="mt-5 text-lg text-gray-600 dark:text-gray-300">
          {{ selectedProduct.description }}
        </p>

        <p class="mt-6 text-3xl font-bold text-gray-950 dark:text-white">
          {{ formatCurrency(selectedProduct.price) }}
        </p>

        <div class="mt-5 flex flex-wrap gap-3 text-sm">
          <span
            class="rounded-full bg-amber-100 px-3 py-1 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
          >
            ★ {{ selectedProduct.rating.toFixed(1) }}
          </span>

          <span
            class="rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-950 dark:text-green-300"
          >
            {{ selectedProduct.stock }} disponibles
          </span>
        </div>
      </div>
    </article>
  </section>
</template>