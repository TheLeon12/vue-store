<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max: number
    disabled?: boolean
  }>(),
  {
    min: 1,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const canDecrease = computed(() => {
  return !props.disabled && props.modelValue > props.min
})

const canIncrease = computed(() => {
  return !props.disabled && props.modelValue < props.max
})

function normalizeValue(value: number): number {
  if (!Number.isFinite(value)) {
    return props.min
  }

  return Math.min(
    props.max,
    Math.max(props.min, Math.trunc(value)),
  )
}

function decrease(): void {
  if (!canDecrease.value) {
    return
  }

  emit(
    'update:modelValue',
    normalizeValue(props.modelValue - 1),
  )
}

function increase(): void {
  if (!canIncrease.value) {
    return
  }

  emit(
    'update:modelValue',
    normalizeValue(props.modelValue + 1),
  )
}

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)

  emit('update:modelValue', normalizeValue(value))
}
</script>

<template>
  <div>
    <label
      for="product-quantity"
      class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Cantidad
    </label>

    <div class="inline-flex items-center">
      <button
        type="button"
        class="flex size-11 items-center justify-center rounded-l-lg border border-gray-300 bg-white text-lg font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        :disabled="!canDecrease"
        aria-label="Disminuir cantidad"
        @click="decrease"
      >
        −
      </button>

      <input
        id="product-quantity"
        :value="modelValue"
        type="number"
        inputmode="numeric"
        :min="min"
        :max="max"
        :disabled="disabled"
        class="h-11 w-20 border-y border-gray-300 bg-white text-center font-semibold text-gray-900 outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        aria-label="Cantidad del producto"
        @change="handleInput"
      />

      <button
        type="button"
        class="flex size-11 items-center justify-center rounded-r-lg border border-gray-300 bg-white text-lg font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        :disabled="!canIncrease"
        aria-label="Aumentar cantidad"
        @click="increase"
      >
        +
      </button>
    </div>

    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Máximo disponible: {{ max }}
    </p>
  </div>
</template>