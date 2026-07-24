import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import { SHIPPING_OPTIONS } from '@/constants/checkout'
import { buildShippingAddress, generateOrderId } from '@/utils/checkout'

import type { CartItem } from '@/types/cart'
import type { CheckoutForm, CheckoutOrder } from '@/types/checkout'

const LAST_ORDER_STORAGE_KEY = 'vue-store-last-order'

function createInitialForm(): CheckoutForm {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'República Dominicana',

    shippingMethod: 'standard',
    paymentMethod: 'cash',

    cardholderName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',

    notes: '',
    acceptTerms: false,
  }
}

export const useCheckoutStore = defineStore('checkout', () => {
  const form = reactive<CheckoutForm>(createInitialForm())

  const lastOrder = ref<CheckoutOrder | null>(readStoredOrder())

  const isSubmitting = ref(false)

  const shippingCost = computed(() => {
    return (
      SHIPPING_OPTIONS.find((option) => {
        return option.id === form.shippingMethod
      })?.price ?? 0
    )
  })

  function readStoredOrder(): CheckoutOrder | null {
    try {
      const storedValue = localStorage.getItem(LAST_ORDER_STORAGE_KEY)

      if (!storedValue) {
        return null
      }

      return JSON.parse(storedValue) as CheckoutOrder
    } catch {
      return null
    }
  }

  function saveOrder(order: CheckoutOrder): void {
    lastOrder.value = order

    localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order))
  }

  function createOrder(
    items: CartItem[],
    subtotal: number,
    discount: number,
  ): CheckoutOrder {
    const order: CheckoutOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customerName: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.trim(),
      shippingAddress: buildShippingAddress(form),
      shippingMethod: form.shippingMethod,
      paymentMethod: form.paymentMethod,
      items: items.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        unitPrice: item.product.price,
        subtotal: item.product.price * item.quantity,
      })),
      subtotal,
      discount,
      shippingCost: shippingCost.value,
      total: subtotal + shippingCost.value,
    }

    saveOrder(order)

    return order
  }

  function resetForm(): void {
    Object.assign(form, createInitialForm())
  }

  function clearLastOrder(): void {
    lastOrder.value = null
    localStorage.removeItem(LAST_ORDER_STORAGE_KEY)
  }

  return {
    form,
    lastOrder,
    isSubmitting,
    shippingCost,
    createOrder,
    resetForm,
    clearLastOrder,
  }
})
