<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'

import BaseConfirmDialog from '@/components/base/BaseConfirmDialog.vue'
import CheckoutAddressForm from '@/components/checkout/CheckoutAddressForm.vue'
import CheckoutContactForm from '@/components/checkout/CheckoutContactForm.vue'
import CheckoutPaymentForm from '@/components/checkout/CheckoutPaymentForm.vue'
import CheckoutShippingMethod from '@/components/checkout/CheckoutShippingMethod.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'

import { useCartStore } from '@/stores/cart.store'
import { useCheckoutStore } from '@/stores/checkout.store'

import { hasCheckoutErrors, validateCheckoutForm } from '@/utils/checkout'

import type { CheckoutErrors } from '@/types/checkout'

const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

const { items, isEmpty, total, totalDiscount } = storeToRefs(cartStore)

const { form, isSubmitting } = storeToRefs(checkoutStore)

const errors = reactive<CheckoutErrors>({})
const isConfirmationOpen = ref(false)

function clearErrors(): void {
  Object.keys(errors).forEach((field) => {
    delete errors[field as keyof CheckoutErrors]
  })
}

async function focusFirstInvalidField(): Promise<void> {
  await nextTick()

  const invalidField = document.querySelector<HTMLElement>(
    '[aria-invalid="true"]',
  )

  invalidField?.focus()
}

async function validateForm(): Promise<boolean> {
  clearErrors()

  const validationErrors = validateCheckoutForm(form.value)

  Object.assign(errors, validationErrors)

  if (hasCheckoutErrors(errors)) {
    await focusFirstInvalidField()
    return false
  }

  return true
}

async function requestOrderConfirmation(): Promise<void> {
  const isValid = await validateForm()

  if (!isValid) {
    return
  }

  isConfirmationOpen.value = true
}

function cancelConfirmation(): void {
  isConfirmationOpen.value = false
}

async function submitOrder(): Promise<void> {
  isConfirmationOpen.value = false
  isSubmitting.value = true

  try {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 1200)
    })

    const order = checkoutStore.createOrder(
      items.value,
      total.value,
      totalDiscount.value,
    )

    cartStore.clearCart()
    checkoutStore.resetForm()

    await router.push({
      name: 'checkout-success',
      query: {
        order: order.id,
      },
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <RouterLink
      to="/cart"
      class="inline-flex text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
    >
      ← Volver al carrito
    </RouterLink>

    <div class="mt-6">
      <p
        class="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
      >
        Finalizar compra
      </p>

      <h1
        class="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl"
      >
        Checkout
      </h1>
    </div>

    <div
      v-if="isEmpty"
      class="mt-10 rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700"
    >
      <h2 class="text-xl font-bold text-gray-950 dark:text-white">
        No hay productos para procesar
      </h2>

      <p class="mt-3 text-gray-600 dark:text-gray-300">
        Agrega productos al carrito antes de iniciar el checkout.
      </p>

      <RouterLink
        to="/products"
        class="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
      >
        Ver productos
      </RouterLink>
    </div>

    <form
      v-else
      class="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]"
      novalidate
      @submit.prevent="requestOrderConfirmation"
    >
      <div class="space-y-6">
        <CheckoutContactForm :form="form" :errors="errors" />

        <CheckoutAddressForm :form="form" :errors="errors" />

        <CheckoutShippingMethod :form="form" />

        <CheckoutPaymentForm :form="form" :errors="errors" />

        <section
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <label class="flex items-start gap-3">
            <input
              v-model="form.acceptTerms"
              type="checkbox"
              class="mt-1 size-4 rounded accent-indigo-600"
              :aria-invalid="Boolean(errors.acceptTerms)"
              aria-describedby="accept-terms-error"
            />

            <span class="text-sm leading-6 text-gray-600 dark:text-gray-300">
              Acepto los términos y confirmo que los datos proporcionados son
              correctos.
            </span>
          </label>

          <p
            v-if="errors.acceptTerms"
            id="accept-terms-error"
            class="mt-2 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {{ errors.acceptTerms }}
          </p>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{
              isSubmitting
                ? 'Procesando pedido...'
                : 'Revisar y completar pedido'
            }}
          </button>
        </section>
      </div>

      <div class="lg:sticky lg:top-6">
        <CheckoutSummary
          :items="items"
          :subtotal="total"
          :discount="totalDiscount"
          :shipping-method="form.shippingMethod"
        />
      </div>
    </form>

    <BaseConfirmDialog
      :open="isConfirmationOpen"
      title="Confirmar pedido"
      message="Se creará una orden simulada y el carrito será vaciado."
      confirm-label="Completar pedido"
      @confirm="submitOrder"
      @cancel="cancelConfirmation"
    />
  </section>
</template>
