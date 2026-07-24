<script setup lang="ts">
import { computed } from 'vue'

import type {
  ProductSortField,
  SortOrder,
} from '@/types/api'

const props = withDefaults(
  defineProps<{
    sortBy: ProductSortField
    sortOrder: SortOrder
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  change: [field: ProductSortField, order: SortOrder]
}>()

const selectedOption = computed(() => {
  if (!props.sortBy) {
    return ''
  }

  return `${props.sortBy}:${props.sortOrder}`
})

function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement
  const value = target.value

  if (!value) {
    emit('change', '', 'asc')
    return
  }

  const [field, order] = value.split(':') as [
    ProductSortField,
    SortOrder,
  ]

  emit('change', field, order)
}
</script>

<template>
  <div>
    <label
      for="product-sort"
      class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Ordenar por
    </label>

    <select
      id="product-sort"
      :value="selectedOption"
      :disabled="disabled"
      class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-950"
      @change="handleChange"
    >
      <option value="">Orden predeterminado</option>
      <option value="title:asc">Nombre: A–Z</option>
      <option value="title:desc">Nombre: Z–A</option>
      <option value="price:asc">Precio: menor a mayor</option>
      <option value="price:desc">Precio: mayor a menor</option>
      <option value="rating:desc">Mejor valoración</option>
      <option value="rating:asc">Menor valoración</option>
      <option value="stock:desc">Mayor disponibilidad</option>
      <option value="stock:asc">Menor disponibilidad</option>
    </select>
  </div>
</template>