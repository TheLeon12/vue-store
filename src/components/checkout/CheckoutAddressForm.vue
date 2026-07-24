<script setup lang="ts">
import BaseFormField from '@/components/forms/BaseFormField.vue'

import type { CheckoutErrors, CheckoutForm } from '@/types/checkout'

defineProps<{
  form: CheckoutForm
  errors: CheckoutErrors
}>()
</script>

<template>
  <section
    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
  >
    <h2 class="text-xl font-bold text-gray-950 dark:text-white">
      Dirección de envío
    </h2>

    <div class="mt-6 grid gap-5 sm:grid-cols-2">
      <BaseFormField
        id="address"
        label="Dirección"
        :error="errors.address"
        required
        class="sm:col-span-2"
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="address"
            v-model="form.address"
            type="text"
            autocomplete="street-address"
            placeholder="Calle, número y sector"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField id="city" label="Ciudad" :error="errors.city" required>
        <template #default="{ describedBy, invalid }">
          <input
            id="city"
            v-model="form.city"
            type="text"
            autocomplete="address-level2"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField
        id="province"
        label="Provincia o estado"
        :error="errors.province"
        required
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="province"
            v-model="form.province"
            type="text"
            autocomplete="address-level1"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField
        id="postal-code"
        label="Código postal"
        :error="errors.postalCode"
        required
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="postal-code"
            v-model="form.postalCode"
            type="text"
            autocomplete="postal-code"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField id="country" label="País" :error="errors.country" required>
        <template #default="{ describedBy, invalid }">
          <select
            id="country"
            v-model="form.country"
            autocomplete="country-name"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          >
            <option value="">Selecciona un país</option>
            <option value="República Dominicana">República Dominicana</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="México">México</option>
            <option value="España">España</option>
          </select>
        </template>
      </BaseFormField>

      <BaseFormField
        id="notes"
        label="Notas del pedido"
        hint="Opcional"
        class="sm:col-span-2"
      >
        <template #default="{ describedBy }">
          <textarea
            id="notes"
            v-model="form.notes"
            rows="4"
            :aria-describedby="describedBy"
            placeholder="Indicaciones de entrega u otra información..."
            class="form-input resize-y"
          />
        </template>
      </BaseFormField>
    </div>
  </section>
</template>
