<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    active: boolean
    disabled?: boolean
    showLabel?: boolean
  }>(),
  {
    disabled: false,
    showLabel: false,
  },
)

const emit = defineEmits<{
  toggle: []
}>()

const accessibleLabel = computed(() => {
  return props.active
    ? 'Eliminar de favoritos'
    : 'Agregar a favoritos'
})
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :aria-label="accessibleLabel"
    :aria-pressed="active"
    class="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
    :class="
      active
        ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900'
        : 'border-gray-300 bg-white text-gray-600 hover:border-red-300 hover:text-red-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-red-800 dark:hover:text-red-300'
    "
    @click="emit('toggle')"
  >
    <span class="text-xl" aria-hidden="true">
      {{ active ? '♥' : '♡' }}
    </span>

    <span v-if="showLabel">
      {{ active ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
    </span>
  </button>
</template>