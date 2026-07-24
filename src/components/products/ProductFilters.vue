<script setup lang="ts">
import CategoryFilter from '@/components/products/CategoryFilter.vue'
import ProductSearch from '@/components/products/ProductSearch.vue'
import ProductSort from '@/components/products/ProductSort.vue'

import type {
  ProductSortField,
  SortOrder,
} from '@/types/api'

withDefaults(
  defineProps<{
    searchTerm: string
    selectedCategory: string
    categories: string[]
    sortBy: ProductSortField
    sortOrder: SortOrder
    loading?: boolean
    loadingCategories?: boolean
    hasActiveFilters?: boolean
  }>(),
  {
    loading: false,
    loadingCategories: false,
    hasActiveFilters: false,
  },
)

const emit = defineEmits<{
  search: [value: string]
  categoryChange: [value: string]
  sortChange: [field: ProductSortField, order: SortOrder]
  reset: []
}>()
</script>

<template>
  <div
    class="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    <div class="grid gap-5 lg:grid-cols-3">
      <div>
        <label
          class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Buscar
        </label>

        <ProductSearch
          :model-value="searchTerm"
          :disabled="loading"
          @search="emit('search', $event)"
        />
      </div>

      <CategoryFilter
        :model-value="selectedCategory"
        :categories="categories"
        :disabled="loading"
        :loading="loadingCategories"
        @change="emit('categoryChange', $event)"
      />

      <ProductSort
        :sort-by="sortBy"
        :sort-order="sortOrder"
        :disabled="loading"
        @change="
          (field, order) => emit('sortChange', field, order)
        "
      />
    </div>

    <div
      v-if="hasActiveFilters"
      class="mt-5 flex items-center justify-between border-t border-gray-200 pt-5 dark:border-gray-800"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Hay filtros activos.
      </p>

      <button
        type="button"
        :disabled="loading"
        class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        @click="emit('reset')"
      >
        Limpiar filtros
      </button>
    </div>
  </div>
</template>