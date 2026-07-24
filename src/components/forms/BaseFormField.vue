<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    label: string
    error?: string
    required?: boolean
    hint?: string
  }>(),
  {
    error: '',
    required: false,
    hint: '',
  },
)
</script>

<template>
  <div>
    <label
      :for="id"
      class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}

      <span v-if="required" class="text-red-600" aria-hidden="true"> * </span>
    </label>

    <slot
      :described-by="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
      :invalid="Boolean(error)"
    />

    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-2 text-sm text-red-600 dark:text-red-400"
      role="alert"
    >
      {{ error }}
    </p>

    <p
      v-else-if="hint"
      :id="`${id}-hint`"
      class="mt-2 text-xs text-gray-500 dark:text-gray-400"
    >
      {{ hint }}
    </p>
  </div>
</template>
