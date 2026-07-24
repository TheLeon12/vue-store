<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
  }>(),
  {
    message: 'Cargando productos...',
  },
)
</script>

<template>
  <div
    class="flex min-h-72 flex-col items-center justify-center gap-4"
    role="status"
    aria-live="polite"
  >
    <div
      class="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600 dark:border-gray-700 dark:border-t-indigo-400"
    />

    <p class="text-sm text-gray-600 dark:text-gray-300">
      {{ message }}
    </p>
  </div>
</template>