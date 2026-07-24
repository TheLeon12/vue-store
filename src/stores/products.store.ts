import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getProductById,
  getProducts,
} from '@/services/products.service'

import type { ApiError } from '@/types/api'
import type { Product } from '@/types/product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const selectedProduct = ref<Product | null>(null)

  const total = ref(0)
  const limit = ref(12)
  const skip = ref(0)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const currentPage = computed(() => {
    return Math.floor(skip.value / limit.value) + 1
  })

  const totalPages = computed(() => {
    return Math.ceil(total.value / limit.value)
  })

  async function fetchProducts(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const response = await getProducts({
        limit: limit.value,
        skip: skip.value,
      })

      products.value = response.products
      total.value = response.total
    } catch (caughtError) {
      const apiError = caughtError as ApiError

      error.value =
        apiError.message || 'No fue posible cargar los productos'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProductById(id: number): Promise<void> {
    isLoading.value = true
    error.value = null
    selectedProduct.value = null

    try {
      selectedProduct.value = await getProductById(id)
    } catch (caughtError) {
      const apiError = caughtError as ApiError

      error.value =
        apiError.message || 'No fue posible cargar el producto'
    } finally {
      isLoading.value = false
    }
  }

  async function goToPage(page: number): Promise<void> {
    if (page < 1 || page > totalPages.value) {
      return
    }

    skip.value = (page - 1) * limit.value

    await fetchProducts()
  }

  async function nextPage(): Promise<void> {
    await goToPage(currentPage.value + 1)
  }

  async function previousPage(): Promise<void> {
    await goToPage(currentPage.value - 1)
  }

  function clearSelectedProduct(): void {
    selectedProduct.value = null
  }

  return {
    products,
    selectedProduct,
    total,
    limit,
    skip,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchProducts,
    fetchProductById,
    goToPage,
    nextPage,
    previousPage,
    clearSelectedProduct,
  }
})