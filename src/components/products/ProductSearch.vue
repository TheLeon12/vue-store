<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    disabled?: boolean
  }>(),
  {
    modelValue: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

const localValue = ref(props.modelValue)

const runSearch = useDebounceFn(() => {
  emit('search', localValue.value)
}, 500)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== localValue.value) {
      localValue.value = newValue
    }
  },
)

function handleInput(): void {
  emit('update:modelValue', localValue.value)
  void runSearch()
}

function clearSearch(): void {
  localValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<template>
  <div class="relative">
    <label for="product-search" class="sr-only">
      Buscar productos
    </label>

    <input
      id="product-search"
      v-model="localValue"
      type="search"
      placeholder="Buscar productos..."
      autocomplete="off"
      :disabled="disabled"
      class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-24 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-950"
      @input="handleInput"
      @keydown.enter.prevent="emit('search', localValue)"
    />

    <button
      v-if="localValue"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      aria-label="Limpiar búsqueda"
      @click="clearSearch"
    >
      Limpiar
    </button>
  </div>
</template>