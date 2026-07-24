<script setup lang="ts">
import { SHIPPING_OPTIONS } from '@/constants/checkout'
import { formatCurrency } from '@/utils/currency'

import type { CheckoutForm } from '@/types/checkout'

defineProps<{
  form: CheckoutForm
}>()
</script>

<template>
  <section
    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    <h2 class="text-xl font-bold text-gray-950 dark:text-white">
      Método de entrega
    </h2>

    <div class="mt-6 space-y-4">
      <label
        v-for="option in SHIPPING_OPTIONS"
        :key="option.id"
        class="flex cursor-pointer gap-4 rounded-xl border p-4 transition"
        :class="
          form.shippingMethod === option.id
            ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950'
            : 'border-gray-200 hover:border-indigo-300 dark:border-gray-800 dark:hover:border-indigo-700'
        "
      >
        <input
          v-model="form.shippingMethod"
          type="radio"
          name="shipping-method"
          :value="option.id"
          class="mt-1 size-4 accent-indigo-600"
        />

        <span class="flex-1">
          <span
            class="flex items-center justify-between gap-4 font-semibold text-gray-950 dark:text-white"
          >
            <span>{{ option.name }}</span>

            <span>
              {{ option.price === 0 ? 'Gratis' : formatCurrency(option.price) }}
            </span>
          </span>

          <span class="mt-1 block text-sm text-gray-500 dark:text-gray-400">
            {{ option.description }}
          </span>
        </span>
      </label>
    </div>
  </section>
</template>
