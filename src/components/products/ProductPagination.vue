<script setup lang="ts">
withDefaults(
  defineProps<{
    currentPage: number
    totalPages: number
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  previous: []
  next: []
}>()
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="mt-10 flex flex-wrap items-center justify-center gap-3"
    aria-label="Paginación de productos"
  >
    <button
      type="button"
      class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      :disabled="disabled || currentPage <= 1"
      @click="emit('previous')"
    >
      Anterior
    </button>

    <span class="text-sm text-gray-600 dark:text-gray-300">
      Página
      <strong>{{ currentPage }}</strong>
      de
      <strong>{{ totalPages }}</strong>
    </span>

    <button
      type="button"
      class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      :disabled="disabled || currentPage >= totalPages"
      @click="emit('next')"
    >
      Siguiente
    </button>
  </nav>
</template>