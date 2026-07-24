<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import QuantitySelector from '@/components/products/QuantitySelector.vue'

import {
  getCartItemSubtotal,
  getCartItemUnitPrice,
} from '@/utils/cart'
import { formatCurrency } from '@/utils/currency'

import type { CartItem } from '@/types/cart'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  updateQuantity: [
    payload: {
      productId: number
      quantity: number
    },
  ]
  remove: [productId: number]
}>()

const unitPrice = computed(() => {
  return getCartItemUnitPrice(props.item)
})

const subtotal = computed(() => {
  return getCartItemSubtotal(props.item)
})

function handleQuantityChange(quantity: number): void {
  emit('updateQuantity', {
    productId: props.item.product.id,
    quantity,
  })
}
</script>

<template>
  <article
    class="grid gap-5 border-b border-gray-200 py-6 last:border-b-0 dark:border-gray-800 sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_auto]"
  >
    <RouterLink
      :to="{
        name: 'product-detail',
        params: {
          id: item.product.id,
        },
      }"
      class="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900"
    >
      <img
        :src="item.product.thumbnail"
        :alt="item.product.title"
        class="aspect-square h-full w-full object-contain p-3"
        loading="lazy"
      />
    </RouterLink>

    <div>
      <p
        class="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
      >
        {{ item.product.category }}
      </p>

      <h2 class="mt-2 text-lg font-semibold text-gray-950 dark:text-white">
        <RouterLink
          :to="{
            name: 'product-detail',
            params: {
              id: item.product.id,
            },
          }"
          class="transition hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {{ item.product.title }}
        </RouterLink>
      </h2>

      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Precio unitario: {{ formatCurrency(unitPrice) }}
      </p>

      <div class="mt-4">
        <QuantitySelector
          :model-value="item.quantity"
          :min="1"
          :max="Math.max(1, item.product.stock)"
          @update:model-value="handleQuantityChange"
        />
      </div>

      <button
        type="button"
        class="mt-4 text-sm font-semibold text-red-600 transition hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
        @click="emit('remove', item.product.id)"
      >
        Eliminar
      </button>
    </div>

    <div class="lg:min-w-32 lg:text-right">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Subtotal
      </p>

      <p class="mt-1 text-xl font-bold text-gray-950 dark:text-white">
        {{ formatCurrency(subtotal) }}
      </p>

      <p
        v-if="item.quantity >= item.product.stock"
        class="mt-2 text-xs font-medium text-orange-600 dark:text-orange-400"
      >
        Máximo disponible
      </p>
    </div>
  </article>
</template>