<script setup lang="ts">
import { computed } from 'vue'

import { SHIPPING_OPTIONS } from '@/constants/checkout'
import { formatCurrency } from '@/utils/currency'

import type { CartItem } from '@/types/cart'
import type { ShippingMethod } from '@/types/checkout'

const props = defineProps<{
  items: CartItem[]
  subtotal: number
  discount: number
  shippingMethod: ShippingMethod
}>()

const shippingCost = computed(() => {
  return (
    SHIPPING_OPTIONS.find((option) => {
      return option.id === props.shippingMethod
    })?.price ?? 0
  )
})

const finalTotal = computed(() => {
  return props.subtotal + shippingCost.value
})
</script>

<template>
  <aside
    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    <h2 class="text-xl font-bold text-gray-950 dark:text-white">
      Resumen del pedido
    </h2>

    <ul class="mt-6 space-y-4">
      <li v-for="item in items" :key="item.product.id" class="flex gap-4">
        <div
          class="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <img
            :src="item.product.thumbnail"
            :alt="item.product.title"
            class="size-full object-contain p-1"
          />

          <span
            class="absolute right-0 top-0 flex size-5 items-center justify-center rounded-bl-lg bg-indigo-600 text-xs font-bold text-white"
          >
            {{ item.quantity }}
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate font-medium text-gray-950 dark:text-white">
            {{ item.product.title }}
          </p>

          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.quantity }} ×
            {{ formatCurrency(item.product.price) }}
          </p>
        </div>
      </li>
    </ul>

    <dl
      class="mt-6 space-y-4 border-t border-gray-200 pt-6 dark:border-gray-800"
    >
      <div class="flex justify-between gap-4">
        <dt class="text-gray-600 dark:text-gray-300">Subtotal</dt>

        <dd class="font-medium text-gray-950 dark:text-white">
          {{ formatCurrency(subtotal + discount) }}
        </dd>
      </div>

      <div v-if="discount > 0" class="flex justify-between gap-4">
        <dt class="text-green-700 dark:text-green-400">Descuentos</dt>

        <dd class="font-medium text-green-700 dark:text-green-400">
          −{{ formatCurrency(discount) }}
        </dd>
      </div>

      <div class="flex justify-between gap-4">
        <dt class="text-gray-600 dark:text-gray-300">Envío</dt>

        <dd class="font-medium text-gray-950 dark:text-white">
          {{ shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost) }}
        </dd>
      </div>

      <div
        class="flex justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-800"
      >
        <dt class="text-lg font-bold text-gray-950 dark:text-white">Total</dt>

        <dd class="text-2xl font-bold text-gray-950 dark:text-white">
          {{ formatCurrency(finalTotal) }}
        </dd>
      </div>
    </dl>
  </aside>
</template>
