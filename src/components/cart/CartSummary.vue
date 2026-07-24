<script setup lang="ts">
import { formatCurrency } from '@/utils/currency'

defineProps<{
  originalSubtotal: number
  totalDiscount: number
  total: number
  totalItems: number
}>()

const emit = defineEmits<{
  checkout: []
}>()
</script>

<template>
  <aside
    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    <h2 class="text-xl font-bold text-gray-950 dark:text-white">
      Resumen de compra
    </h2>

    <dl class="mt-6 space-y-4">
      <div class="flex items-center justify-between gap-4">
        <dt class="text-gray-600 dark:text-gray-300">Productos</dt>

        <dd class="font-medium text-gray-950 dark:text-white">
          {{ totalItems }}
        </dd>
      </div>

      <div class="flex items-center justify-between gap-4">
        <dt class="text-gray-600 dark:text-gray-300">Subtotal</dt>

        <dd class="font-medium text-gray-950 dark:text-white">
          {{ formatCurrency(originalSubtotal) }}
        </dd>
      </div>

      <div
        v-if="totalDiscount > 0"
        class="flex items-center justify-between gap-4"
      >
        <dt class="text-green-700 dark:text-green-400">Descuentos</dt>

        <dd class="font-medium text-green-700 dark:text-green-400">
          −{{ formatCurrency(totalDiscount) }}
        </dd>
      </div>

      <div
        class="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-800"
      >
        <dt class="text-lg font-bold text-gray-950 dark:text-white">Total</dt>

        <dd class="text-2xl font-bold text-gray-950 dark:text-white">
          {{ formatCurrency(total) }}
        </dd>
      </div>
    </dl>

    <p class="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400">
      Los impuestos y costos de envío se calcularán durante el checkout.
    </p>

    <button
      type="button"
      class="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      @click="emit('checkout')"
    >
      Continuar al checkout
    </button>
  </aside>
</template>
