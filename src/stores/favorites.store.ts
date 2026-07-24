import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import type { FavoriteItem } from '@/types/favorite'
import type { Product } from '@/types/product'

const FAVORITES_STORAGE_KEY = 'vue-store-favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  const items = useStorage<FavoriteItem[]>(
    FAVORITES_STORAGE_KEY,
    [],
    localStorage,
  )

  const totalFavorites = computed(() => {
    return items.value.length
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  const products = computed(() => {
    return items.value.map((item) => item.product)
  })

  function isFavorite(productId: number): boolean {
    return items.value.some((item) => {
      return item.product.id === productId
    })
  }

  function addFavorite(product: Product): boolean {
    if (isFavorite(product.id)) {
      return false
    }

    items.value.push({
      product,
      addedAt: new Date().toISOString(),
    })

    return true
  }

  function removeFavorite(productId: number): boolean {
    const initialLength = items.value.length

    items.value = items.value.filter((item) => {
      return item.product.id !== productId
    })

    return items.value.length !== initialLength
  }

  function toggleFavorite(product: Product): boolean {
    if (isFavorite(product.id)) {
      removeFavorite(product.id)
      return false
    }

    addFavorite(product)
    return true
  }

  function clearFavorites(): void {
    items.value = []
  }

  function sanitizeFavorites(): void {
    if (!Array.isArray(items.value)) {
      items.value = []
      return
    }

    const productIds = new Set<number>()

    items.value = items.value.filter((item) => {
      const productId = item?.product?.id

      if (
        !Number.isInteger(productId) ||
        productId <= 0 ||
        productIds.has(productId)
      ) {
        return false
      }

      productIds.add(productId)
      return true
    })
  }

  sanitizeFavorites()

  return {
    items,
    products,
    totalFavorites,
    isEmpty,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  }
})