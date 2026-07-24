import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

import {
  calculateCartDiscount,
  calculateCartOriginalSubtotal,
  calculateCartTotal,
} from '@/utils/cart'

import type {
  AddToCartPayload,
  CartItem,
} from '@/types/cart'

const CART_STORAGE_KEY = 'vue-store-cart'

export const useCartStore = defineStore('cart', () => {
  const items = useStorage<CartItem[]>(
    CART_STORAGE_KEY,
    [],
    localStorage,
  )

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  const uniqueItemsCount = computed(() => {
    return items.value.length
  })

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  })

  const originalSubtotal = computed(() => {
    return calculateCartOriginalSubtotal(items.value)
  })

  const totalDiscount = computed(() => {
    return calculateCartDiscount(items.value)
  })

  const total = computed(() => {
    return calculateCartTotal(items.value)
  })

  function findItem(productId: number): CartItem | undefined {
    return items.value.find((item) => {
      return item.product.id === productId
    })
  }

  function getItemQuantity(productId: number): number {
    return findItem(productId)?.quantity ?? 0
  }

  function normalizeQuantity(
    quantity: number,
    stock: number,
  ): number {
    if (!Number.isFinite(quantity)) {
      return 1
    }

    const normalizedStock = Math.max(0, Math.trunc(stock))

    if (normalizedStock === 0) {
      return 0
    }

    return Math.min(
      normalizedStock,
      Math.max(1, Math.trunc(quantity)),
    )
  }

  function addItem(payload: AddToCartPayload): boolean {
    const { product } = payload

    if (product.stock <= 0) {
      return false
    }

    const requestedQuantity = normalizeQuantity(
      payload.quantity,
      product.stock,
    )

    if (requestedQuantity === 0) {
      return false
    }

    const existingItem = findItem(product.id)

    if (existingItem) {
      const newQuantity = normalizeQuantity(
        existingItem.quantity + requestedQuantity,
        product.stock,
      )

      existingItem.quantity = newQuantity
      existingItem.product = product

      return true
    }

    items.value.push({
      product,
      quantity: requestedQuantity,
    })

    return true
  }

  function updateQuantity(
    productId: number,
    quantity: number,
  ): void {
    const item = findItem(productId)

    if (!item) {
      return
    }

    item.quantity = normalizeQuantity(
      quantity,
      item.product.stock,
    )
  }

  function increaseQuantity(productId: number): void {
    const item = findItem(productId)

    if (!item) {
      return
    }

    updateQuantity(productId, item.quantity + 1)
  }

  function decreaseQuantity(productId: number): void {
    const item = findItem(productId)

    if (!item) {
      return
    }

    if (item.quantity <= 1) {
      return
    }

    updateQuantity(productId, item.quantity - 1)
  }

  function removeItem(productId: number): void {
    items.value = items.value.filter((item) => {
      return item.product.id !== productId
    })
  }

  function clearCart(): void {
    items.value = []
  }


  return {
    items,
    isEmpty,
    uniqueItemsCount,
    totalItems,
    originalSubtotal,
    totalDiscount,
    total,
    findItem,
    getItemQuantity,
    addItem,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  }
})