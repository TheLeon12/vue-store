<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'

import { useCheckoutStore } from '@/stores/checkout.store'
import { formatCurrency } from '@/utils/currency'

const route = useRoute()
const checkoutStore = useCheckoutStore()

const { lastOrder } = storeToRefs(checkoutStore)

const orderId = computed(() => {
  const queryOrder = route.query.order

  return Array.isArray(queryOrder) ? (queryOrder[0] ?? '') : (queryOrder ?? '')
})

const validOrder = computed(() => {
  if (!lastOrder.value) {
    return null
  }

  if (orderId.value && lastOrder.value.id !== orderId.value) {
    return null
  }

  return lastOrder.value
})
</script>

<template>
  <section class="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
    <div
      v-if="validOrder"
      class="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-12"
    >
      <div
        class="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-700 dark:bg-green-950 dark:text-green-300"
        aria-hidden="true"
      >
        ✓
      </div>

      <p
        class="mt-6 text-sm font-semibold uppercase tracking-wide text-green-700 dark:text-green-400"
      >
        Pedido completado
      </p>

      <h1 class="mt-3 text-3xl font-bold text-gray-950 dark:text-white">
        Gracias por tu compra
      </h1>

      <p class="mt-4 text-gray-600 dark:text-gray-300">
        Tu orden simulada fue creada correctamente.
      </p>

      <dl
        class="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 text-left dark:divide-gray-800 dark:border-gray-800"
      >
        <div class="grid gap-1 px-5 py-4 sm:grid-cols-3">
          <dt class="font-medium text-gray-950 dark:text-white">Orden</dt>

          <dd class="text-gray-600 dark:text-gray-300 sm:col-span-2">
            {{ validOrder.id }}
          </dd>
        </div>

        <div class="grid gap-1 px-5 py-4 sm:grid-cols-3">
          <dt class="font-medium text-gray-950 dark:text-white">Cliente</dt>

          <dd class="text-gray-600 dark:text-gray-300 sm:col-span-2">
            {{ validOrder.customerName }}
          </dd>
        </div>

        <div class="grid gap-1 px-5 py-4 sm:grid-cols-3">
          <dt class="font-medium text-gray-950 dark:text-white">Dirección</dt>

          <dd class="text-gray-600 dark:text-gray-300 sm:col-span-2">
            {{ validOrder.shippingAddress }}
          </dd>
        </div>

        <div class="grid gap-1 px-5 py-4 sm:grid-cols-3">
          <dt class="font-medium text-gray-950 dark:text-white">Total</dt>

          <dd
            class="text-lg font-bold text-gray-950 dark:text-white sm:col-span-2"
          >
            {{ formatCurrency(validOrder.total) }}
          </dd>
        </div>
      </dl>

      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink
          to="/products"
          class="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
        >
          Seguir comprando
        </RouterLink>

        <RouterLink
          to="/"
          class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Ir al inicio
        </RouterLink>
      </div>
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700"
    >
      <h1 class="text-2xl font-bold text-gray-950 dark:text-white">
        No encontramos esta orden
      </h1>

      <p class="mt-3 text-gray-600 dark:text-gray-300">
        La orden pudo haber sido eliminada o el identificador no coincide.
      </p>

      <RouterLink
        to="/products"
        class="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
      >
        Volver al catálogo
      </RouterLink>
    </div>
  </section>
</template>
