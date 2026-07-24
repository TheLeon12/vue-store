<script setup lang="ts">
import ProductCard from '@/components/products/ProductCard.vue'

import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>