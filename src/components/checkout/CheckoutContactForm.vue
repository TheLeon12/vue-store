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
      Información de contacto
    </h2>

    <div class="mt-6 grid gap-5 sm:grid-cols-2">
      <BaseFormField
        id="first-name"
        label="Nombre"
        :error="errors.firstName"
        required
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="first-name"
            v-model="form.firstName"
            type="text"
            autocomplete="given-name"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField
        id="last-name"
        label="Apellido"
        :error="errors.lastName"
        required
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="last-name"
            v-model="form.lastName"
            type="text"
            autocomplete="family-name"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField
        id="email"
        label="Correo electrónico"
        :error="errors.email"
        required
      >
        <template #default="{ describedBy, invalid }">
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="nombre@correo.com"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>

      <BaseFormField id="phone" label="Teléfono" :error="errors.phone" required>
        <template #default="{ describedBy, invalid }">
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            placeholder="+1 809 000 0000"
            :aria-describedby="describedBy"
            :aria-invalid="invalid"
            class="form-input"
          />
        </template>
      </BaseFormField>
    </div>
  </section>
</template>
