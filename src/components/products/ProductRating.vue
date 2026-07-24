<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    rating: number
    reviewCount?: number
  }>(),
  {
    reviewCount: 0,
  },
)

const roundedRating = computed(() => {
  return Math.round(props.rating)
})

const stars = computed(() => {
  return Array.from({ length: 5 }, (_, index) => {
    return index < roundedRating.value
  })
})
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2"
    :aria-label="`Valoración: ${rating.toFixed(1)} de 5`"
  >
    <div class="flex" aria-hidden="true">
      <span
        v-for="(filled, index) in stars"
        :key="index"
        class="text-lg"
        :class="
          filled
            ? 'text-amber-500'
            : 'text-gray-300 dark:text-gray-700'
        "
      >
        ★
      </span>
    </div>

    <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">
      {{ rating.toFixed(1) }}
    </span>

    <span
      v-if="reviewCount > 0"
      class="text-sm text-gray-500 dark:text-gray-400"
    >
      ({{ reviewCount }}
      {{ reviewCount === 1 ? 'reseña' : 'reseñas' }})
    </span>
  </div>
</template>