import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getProductById,
  getProductCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from '@/services/products.service'

import type {
  ApiError,
  ProductSortField,
  SortOrder,
} from '@/types/api'
import type { Product } from '@/types/product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const selectedProduct = ref<Product | null>(null)
  const categories = ref<string[]>([])

  const total = ref(0)
  const limit = ref(12)
  const skip = ref(0)

  const searchTerm = ref('')
  const selectedCategory = ref('')
  const sortBy = ref<ProductSortField>('')
  const sortOrder = ref<SortOrder>('asc')

  const isLoading = ref(false)
  const isLoadingCategories = ref(false)
  const error = ref<string | null>(null)

  const currentPage = computed(() => {
    return Math.floor(skip.value / limit.value) + 1
  })

  const totalPages = computed(() => {
    if (total.value === 0) {
      return 1
    }

    return Math.ceil(total.value / limit.value)
  })

  const hasActiveFilters = computed(() => {
    return (
      searchTerm.value.trim() !== '' ||
      selectedCategory.value !== '' ||
      sortBy.value !== ''
    )
  })

  async function fetchProducts(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      const commonParams = {
        limit: limit.value,
        skip: skip.value,
        sortBy: sortBy.value,
        order: sortOrder.value,
      }

      const normalizedSearch = searchTerm.value.trim()

      let response

      /*
       * DummyJSON no proporciona un endpoint que combine directamente
       * búsqueda y categoría. En esta primera versión, la búsqueda tiene
       * prioridad sobre la categoría.
       */
      if (normalizedSearch) {
        response = await searchProducts(normalizedSearch, commonParams)
      } else if (selectedCategory.value) {
        response = await getProductsByCategory(
          selectedCategory.value,
          commonParams,
        )
      } else {
        response = await getProducts(commonParams)
      }

      products.value = response.products
      total.value = response.total
    } catch (caughtError) {
      const apiError = caughtError as ApiError

      products.value = []
      total.value = 0
      error.value =
        apiError.message || 'No fue posible cargar los productos'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCategories(): Promise<void> {
    if (categories.value.length > 0) {
      return
    }

    isLoadingCategories.value = true

    try {
      categories.value = await getProductCategories()
    } catch (caughtError) {
      const apiError = caughtError as ApiError

      error.value =
        apiError.message || 'No fue posible cargar las categorías'
    } finally {
      isLoadingCategories.value = false
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

  async function applyFilters(): Promise<void> {
    skip.value = 0
    await fetchProducts()
  }

  async function setSearchTerm(value: string): Promise<void> {
    searchTerm.value = value

    /*
     * Al buscar, limpiamos la categoría porque la API no combina ambos
     * filtros directamente.
     */
    if (value.trim()) {
      selectedCategory.value = ''
    }

    await applyFilters()
  }

  async function setCategory(category: string): Promise<void> {
    selectedCategory.value = category

    if (category) {
      searchTerm.value = ''
    }

    await applyFilters()
  }

  async function setSort(
    field: ProductSortField,
    order: SortOrder,
  ): Promise<void> {
    sortBy.value = field
    sortOrder.value = order
    await applyFilters()
  }

  async function resetFilters(): Promise<void> {
    searchTerm.value = ''
    selectedCategory.value = ''
    sortBy.value = ''
    sortOrder.value = 'asc'
    skip.value = 0

    await fetchProducts()
  }

  async function goToPage(page: number): Promise<void> {
    if (
      page < 1 ||
      page > totalPages.value ||
      page === currentPage.value
    ) {
      return
    }

    skip.value = (page - 1) * limit.value

    await fetchProducts()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
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
    categories,
    total,
    limit,
    skip,
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
    fetchProducts,
    fetchCategories,
    fetchProductById,
    applyFilters,
    setSearchTerm,
    setCategory,
    setSort,
    resetFilters,
    goToPage,
    nextPage,
    previousPage,
    clearSelectedProduct,
  }
})