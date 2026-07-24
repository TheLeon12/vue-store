<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'

import BaseLoader from '@/components/base/BaseLoader.vue'
import BaseMessage from '@/components/base/BaseMessage.vue'
import ProductGallery from '@/components/products/ProductGallery.vue'
import ProductInformation from '@/components/products/ProductInformation.vue'

import { useProductsStore } from '@/stores/products.store'

import type { Product } from '@/types/product'

const route = useRoute()
const productsStore = useProductsStore()

const { selectedProduct, isLoading, error } = storeToRefs(productsStore)

const productId = computed(() => {
  const rawId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id

  return Number(rawId)
})

const isValidProductId = computed(() => {
  return Number.isInteger(productId.value) && productId.value > 0
})

watch(
  productId,
  async (newProductId) => {
    productsStore.clearSelectedProduct()

    if (!Number.isInteger(newProductId) || newProductId <= 0) {
      return
    }

    await productsStore.fetchProductById(newProductId)
  },
  {
    immediate: true,
  },
)

function handleAddToCart(payload: {
  product: Product
  quantity: number
}): void {
  console.log('Producto preparado:', payload)

  /*
   * En la siguiente fase reemplazaremos este console.log
   * por cartStore.addItem().
   */
}
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <RouterLink
      to="/products"
      class="inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
    >
      ← Volver al catálogo
    </RouterLink>

    <BaseMessage
      v-if="!isValidProductId"
      class="mt-8"
      title="Identificador inválido"
      message="La dirección no contiene un identificador de producto válido."
      variant="error"
    />

    <BaseLoader
      v-else-if="isLoading"
      message="Cargando información del producto..."
    />

    <BaseMessage
      v-else-if="error"
      class="mt-8"
      title="No pudimos cargar el producto"
      :message="error"
      variant="error"
    >
      <button
        type="button"
        class="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        @click="productsStore.fetchProductById(productId)"
      >
        Intentar nuevamente
      </button>
    </BaseMessage>

    <article
      v-else-if="selectedProduct"
      class="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <ProductGallery
        :images="selectedProduct.images"
        :thumbnail="selectedProduct.thumbnail"
        :product-title="selectedProduct.title"
      />

      <ProductInformation
        :product="selectedProduct"
        @add-to-cart="handleAddToCart"
      />
    </article>

    <BaseMessage
      v-else
      class="mt-8"
      title="Producto no encontrado"
      message="No encontramos información para este producto."
      variant="error"
    />
  </section>
</template>
