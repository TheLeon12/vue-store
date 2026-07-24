<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import ProductRating from '@/components/products/ProductRating.vue'
import QuantitySelector from '@/components/products/QuantitySelector.vue'

import FavoriteButton from '@/components/favorites/FavoriteButton.vue'
import { useFavoritesStore } from '@/stores/favorites.store'

import {
  calculateDiscountedPrice,
  formatCurrency,
  roundCurrency,
} from '@/utils/currency'
import { formatCategoryName } from '@/utils/text'

import type { Product } from '@/types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: [
    payload: {
      product: Product
      quantity: number
    },
  ]
}>()

const quantity = ref(1)
const showAddedMessage = ref(false)

const discountedPrice = computed(() => {
  return roundCurrency(
    calculateDiscountedPrice(
      props.product.price,
      props.product.discountPercentage,
    ),
  )
})

const hasDiscount = computed(() => {
  return props.product.discountPercentage > 0
})

const isOutOfStock = computed(() => {
  return props.product.stock <= 0
})

const maximumQuantity = computed(() => {
  if (props.product.stock <= 0) {
    return 1
  }

  const minimumOrderQuantity = props.product.minimumOrderQuantity ?? 1

  return Math.max(1, props.product.stock, minimumOrderQuantity)
})

const minimumQuantity = computed(() => {
  if (isOutOfStock.value) {
    return 1
  }

  return Math.min(props.product.minimumOrderQuantity ?? 1, props.product.stock)
})

const totalPrice = computed(() => {
  return roundCurrency(discountedPrice.value * quantity.value)
})

const favoritesStore = useFavoritesStore()

const isFavorite = computed(() => {
  return favoritesStore.isFavorite(props.product.id)
})

watch(
  () => props.product.id,
  () => {
    quantity.value = minimumQuantity.value
    showAddedMessage.value = false
  },
  {
    immediate: true,
  },
)

function toggleFavorite(): void {
  favoritesStore.toggleFavorite(props.product)
}

function addToCart(): void {
  if (isOutOfStock.value) {
    return
  }

  emit('addToCart', {
    product: props.product,
    quantity: quantity.value,
  })

  showAddedMessage.value = true

  window.setTimeout(() => {
    showAddedMessage.value = false
  }, 2500)
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center gap-3">
      <span
        class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
      >
        {{ formatCategoryName(product.category) }}
      </span>

      <span
        v-if="product.brand"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ product.brand }}
      </span>

      <span v-if="product.sku" class="text-sm text-gray-500 dark:text-gray-400">
        SKU: {{ product.sku }}
      </span>
    </div>

    <h1
      class="mt-4 text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-5xl"
    >
      {{ product.title }}
    </h1>

    <div class="mt-5">
  <FavoriteButton
    :active="isFavorite"
    show-label
    @toggle="toggleFavorite"
  />
</div>

    <div class="mt-4">
      <ProductRating
        :rating="product.rating"
        :review-count="product.reviews?.length ?? 0"
      />
    </div>

    <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
      {{ product.description }}
    </p>

    <div class="mt-7 flex flex-wrap items-end gap-3">
      <span class="text-3xl font-bold text-gray-950 dark:text-white">
        {{ formatCurrency(discountedPrice) }}
      </span>

      <span
        v-if="hasDiscount"
        class="text-lg text-gray-500 line-through dark:text-gray-400"
      >
        {{ formatCurrency(product.price) }}
      </span>

      <span
        v-if="hasDiscount"
        class="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-950 dark:text-red-300"
      >
        -{{ product.discountPercentage.toFixed(0) }}%
      </span>
    </div>

    <div
      class="mt-7 rounded-xl border p-4"
      :class="
        isOutOfStock
          ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950'
          : product.stock <= 10
            ? 'border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950'
            : 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'
      "
    >
      <p
        class="font-semibold"
        :class="
          isOutOfStock
            ? 'text-red-700 dark:text-red-300'
            : product.stock <= 10
              ? 'text-orange-700 dark:text-orange-300'
              : 'text-green-700 dark:text-green-300'
        "
      >
        <template v-if="isOutOfStock"> Producto agotado </template>

        <template v-else-if="product.stock <= 10">
          Solo quedan {{ product.stock }} unidades
        </template>

        <template v-else> Disponible: {{ product.stock }} unidades </template>
      </p>

      <p
        v-if="product.availabilityStatus"
        class="mt-1 text-sm text-gray-600 dark:text-gray-300"
      >
        {{ product.availabilityStatus }}
      </p>
    </div>

    <div
      v-if="!isOutOfStock"
      class="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end"
    >
      <QuantitySelector
        v-model="quantity"
        :min="minimumQuantity"
        :max="maximumQuantity"
      />

      <button
        type="button"
        class="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="addToCart"
      >
        Agregar al carrito · {{ formatCurrency(totalPrice) }}
      </button>
    </div>

    <button
      v-else
      type="button"
      disabled
      class="mt-7 w-full cursor-not-allowed rounded-xl bg-gray-300 px-6 py-3 font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400"
    >
      Producto no disponible
    </button>

    <p
      v-if="showAddedMessage"
      class="mt-4 rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-950 dark:text-green-300"
      role="status"
      aria-live="polite"
    >
      Producto agregado correctamente al carrito.
    </p>

    <dl
      class="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800"
    >
      <div
        v-if="product.shippingInformation"
        class="grid gap-1 px-4 py-4 sm:grid-cols-3"
      >
        <dt class="font-medium text-gray-900 dark:text-white">Envío</dt>

        <dd class="text-gray-600 dark:text-gray-300 sm:col-span-2">
          {{ product.shippingInformation }}
        </dd>
      </div>

      <div
        v-if="product.warrantyInformation"
        class="grid gap-1 px-4 py-4 sm:grid-cols-3"
      >
        <dt class="font-medium text-gray-900 dark:text-white">Garantía</dt>

        <dd class="text-gray-600 dark:text-gray-300 sm:col-span-2">
          {{ product.warrantyInformation }}
        </dd>
      </div>

      <div
        v-if="product.returnPolicy"
        class="grid gap-1 px-4 py-4 sm:grid-cols-3"
      >
        <dt class="font-medium text-gray-900 dark:text-white">Devolución</dt>

        <dd class="text-gray-600 dark:text-gray-300 sm:col-span-2">
          {{ product.returnPolicy }}
        </dd>
      </div>

      <div v-if="product.weight" class="grid gap-1 px-4 py-4 sm:grid-cols-3">
        <dt class="font-medium text-gray-900 dark:text-white">Peso</dt>

        <dd class="text-gray-600 dark:text-gray-300 sm:col-span-2">
          {{ product.weight }}
        </dd>
      </div>
    </dl>
  </div>
</template>
