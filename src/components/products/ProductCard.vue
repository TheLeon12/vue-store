<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { formatCurrency } from '@/utils/currency'

import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
  >
    <RouterLink
      :to="{
        name: 'product-detail',
        params: { id: product.id },
      }"
      class="block overflow-hidden bg-gray-100 dark:bg-gray-800"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="aspect-square w-full object-contain p-4 transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </RouterLink>

    <div class="flex flex-1 flex-col p-5">
      <p
        class="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
      >
        {{ product.category }}
      </p>

      <h2 class="mt-2 text-lg font-semibold text-gray-950 dark:text-white">
        <RouterLink
          :to="{
            name: 'product-detail',
            params: { id: product.id },
          }"
          class="transition hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {{ product.title }}
        </RouterLink>
      </h2>

      <p class="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <span class="text-xl font-bold text-gray-950 dark:text-white">
          {{ formatCurrency(product.price) }}
        </span>

        <span class="text-sm text-amber-600 dark:text-amber-400">
          ★ {{ product.rating.toFixed(1) }}
        </span>
      </div>

      <div class="mt-3">
        <span
          class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
          :class="
            product.stock > 10
              ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
              : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
          "
        >
          {{
            product.stock > 10
              ? `${product.stock} disponibles`
              : `Solo quedan ${product.stock}`
          }}
        </span>
      </div>

      <RouterLink
        :to="{
          name: 'product-detail',
          params: { id: product.id },
        }"
        class="mt-5 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-500"
      >
        Ver producto
      </RouterLink>
    </div>
  </article>
</template>