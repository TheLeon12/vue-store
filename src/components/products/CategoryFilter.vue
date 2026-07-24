<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    categories: string[]
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    disabled: false,
    loading: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  const value = target.value

  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div>
    <label
      for="category-filter"
      class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Categoría
    </label>

    <select
      id="category-filter"
      :value="modelValue"
      :disabled="disabled || loading"
      class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-950"
      @change="handleChange"
    >
      <option value="">
        {{ loading ? 'Cargando categorías...' : 'Todas las categorías' }}
      </option>

      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>
