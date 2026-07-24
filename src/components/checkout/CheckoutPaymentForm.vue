<script setup lang="ts">
import BaseFormField from '@/components/forms/BaseFormField.vue'

import { PAYMENT_OPTIONS } from '@/constants/checkout'
import {
  formatCardNumber,
  normalizeCardCvc,
  normalizeCardExpiry,
} from '@/utils/checkout'

import type { CheckoutErrors, CheckoutForm } from '@/types/checkout'

defineProps<{
  form: CheckoutForm
  errors: CheckoutErrors
}>()

function handleCardNumber(form: CheckoutForm, event: Event): void {
  const target = event.target as HTMLInputElement

  form.cardNumber = formatCardNumber(target.value)
}

function handleCardExpiry(form: CheckoutForm, event: Event): void {
  const target = event.target as HTMLInputElement

  form.cardExpiry = normalizeCardExpiry(target.value)
}

function handleCardCvc(form: CheckoutForm, event: Event): void {
  const target = event.target as HTMLInputElement

  form.cardCvc = normalizeCardCvc(target.value)
}
</script>

<template>
  <section
    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    <h2 class="text-xl font-bold text-gray-950 dark:text-white">
      Método de pago
    </h2>

    <div class="mt-6 space-y-4">
      <label
        v-for="option in PAYMENT_OPTIONS"
        :key="option.id"
        class="flex cursor-pointer gap-4 rounded-xl border p-4 transition"
        :class="
          form.paymentMethod === option.id
            ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950'
            : 'border-gray-200 hover:border-indigo-300 dark:border-gray-800 dark:hover:border-indigo-700'
        "
      >
        <input
          v-model="form.paymentMethod"
          type="radio"
          name="payment-method"
          :value="option.id"
          class="mt-1 size-4 accent-indigo-600"
        />

        <span>
          <span class="block font-semibold text-gray-950 dark:text-white">
            {{ option.name }}
          </span>

          <span class="mt-1 block text-sm text-gray-500 dark:text-gray-400">
            {{ option.description }}
          </span>
        </span>
      </label>
    </div>

    <div
      v-if="form.paymentMethod === 'card'"
      class="mt-6 grid gap-5 sm:grid-cols-2"
    >
      <BaseFormField
        id="cardholder-name"
        label="Nombre del titular"
        :error="errors.cardholderName"
        required
        class="sm:col-span-2"
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="cardholder-name"
            v-model="form.cardholderName"
            type="text"
            autocomplete="cc-name"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField
        id="card-number"
        label="Número de tarjeta"
        :error="errors.cardNumber"
        required
        class="sm:col-span-2"
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="card-number"
            :value="form.cardNumber"
            type="text"
            inputmode="numeric"
            autocomplete="cc-number"
            placeholder="0000 0000 0000 0000"
            maxlength="19"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
            @input="handleCardNumber(form, $event)"
          />
        </template>
      </BaseFormField>

      <BaseFormField
        id="card-expiry"
        label="Vencimiento"
        :error="errors.cardExpiry"
        required
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="card-expiry"
            :value="form.cardExpiry"
            type="text"
            inputmode="numeric"
            autocomplete="cc-exp"
            placeholder="MM/AA"
            maxlength="5"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
            @input="handleCardExpiry(form, $event)"
          />
        </template>
      </BaseFormField>

      <BaseFormField id="card-cvc" label="CVC" :error="errors.cardCvc" required>
        <template #default="{ describedBy, invalid }">
          <input
            id="card-cvc"
            :value="form.cardCvc"
            type="password"
            inputmode="numeric"
            autocomplete="cc-csc"
            placeholder="123"
            maxlength="4"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
            @input="handleCardCvc(form, $event)"
          />
        </template>
      </BaseFormField>

      <p
        class="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200 sm:col-span-2"
      >
        Este formulario es una simulación. No introduzcas datos bancarios
        reales.
      </p>
    </div>
  </section>
</template>
