<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue'

import type { CartItem as CartItemType } from '@/types/cart'

defineProps<{
  items: CartItemType[]
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
</script>

<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:px-7"
  >
    <CartItem
      v-for="item in items"
      :key="item.product.id"
      :item="item"
      @update-quantity="emit('updateQuantity', $event)"
      @remove="emit('remove', $event)"
    />
  </div>
</template>