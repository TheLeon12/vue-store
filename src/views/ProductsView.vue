<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import BaseLoader from '@/components/base/BaseLoader.vue'
import BaseMessage from '@/components/base/BaseMessage.vue'
import ProductFilters from '@/components/products/ProductFilters.vue'
import ProductGrid from '@/components/products/ProductGrid.vue'
import ProductPagination from '@/components/products/ProductPagination.vue'

import { useProductsStore } from '@/stores/products.store'

import type { ProductSortField, SortOrder } from '@/types/api'

const productsStore = useProductsStore()

const {
  products,
  categories,
  total,
  searchTerm,
  selectedCategory,
  sortBy,
  sortOrder,
  isLoading,
  isLoadingCategories,
  error,
  currentPage,
  totalPages,
  hasActiveFilters,
} = storeToRefs(productsStore)

onMounted(() => {
  void Promise.all([
    productsStore.fetchCategories(),
    products.value.length === 0
      ? productsStore.fetchProducts()
      : Promise.resolve(),
  ])
})

function handleSearch(value: string): void {
  void productsStore.setSearchTerm(value)
}

function handleCategoryChange(category: string): void {
  void productsStore.setCategory(category)
}

function handleSortChange(field: ProductSortField, order: SortOrder): void {
  void productsStore.setSort(field, order)
}

function handleReset(): void {
  void productsStore.resetFilters()
}
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p
          class="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
        >
          Catálogo
        </p>

        <h1
          class="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl"
        >
          Nuestros productos
        </h1>

        <p class="mt-3 text-gray-600 dark:text-gray-300">
          Busca, filtra y ordena los productos disponibles.
        </p>
      </div>

      <p
        v-if="!isLoading && !error"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ total }}
        {{ total === 1 ? 'producto encontrado' : 'productos encontrados' }}
      </p>
    </div>

    <ProductFilters
      :search-term="searchTerm"
      :selected-category="selectedCategory"
      :categories="categories"
      :sort-by="sortBy"
      :sort-order="sortOrder"
      :loading="isLoading"
      :loading-categories="isLoadingCategories"
      :has-active-filters="hasActiveFilters"
      @search="handleSearch"
      @category-change="handleCategoryChange"
      @sort-change="handleSortChange"
      @reset="handleReset"
    />

    <BaseLoader
      v-if="isLoading && products.length === 0"
      message="Cargando productos..."
    />

    <BaseMessage
      v-else-if="error"
      title="No pudimos cargar los productos"
      :message="error"
      variant="error"
    >
      <button
        type="button"
        class="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        @click="productsStore.fetchProducts"
      >
        Intentar nuevamente
      </button>
    </BaseMessage>

    <BaseMessage
      v-else-if="products.length === 0"
      title="No encontramos productos"
      message="Prueba con otro término o elimina los filtros activos."
    >
      <button
        v-if="hasActiveFilters"
        type="button"
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
        @click="handleReset"
      >
        Limpiar filtros
      </button>
    </BaseMessage>

    <template v-else>
      <div
        v-if="isLoading"
        class="mb-6 rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
        role="status"
      >
        Actualizando productos...
      </div>

      <ProductGrid :products="products" />

      <ProductPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :disabled="isLoading"
        @previous="productsStore.previousPage"
        @next="productsStore.nextPage"
      />
    </template>
  </section>
</template>
