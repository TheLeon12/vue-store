<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
    role="presentation"
    @click.self="emit('cancel')"
  >
    <section
      class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
    >
      <h2 class="text-xl font-bold text-gray-950 dark:text-white">
        {{ title }}
      </h2>

      <p class="mt-3 text-gray-600 dark:text-gray-300">
        {{ message }}
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          @click="emit('cancel')"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
          @click="emit('confirm')"
        >
          Vaciar carrito
        </button>
      </div>
    </section>
  </div>
</template>