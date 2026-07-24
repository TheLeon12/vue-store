<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    images: string[]
    thumbnail?: string
    productTitle: string
  }>(),
  {
    thumbnail: '',
  },
)

const selectedImageIndex = ref(0)

const availableImages = computed(() => {
  const combinedImages = [...props.images]

  if (props.thumbnail && !combinedImages.includes(props.thumbnail)) {
    combinedImages.unshift(props.thumbnail)
  }

  return combinedImages.filter(Boolean)
})

const selectedImage = computed(() => {
  return availableImages.value[selectedImageIndex.value] ?? props.thumbnail
})

watch(
  availableImages,
  () => {
    selectedImageIndex.value = 0
  },
  {
    immediate: true,
  },
)

function selectImage(index: number): void {
  if (index < 0 || index >= availableImages.value.length) {
    return
  }

  selectedImageIndex.value = index
}

function showPreviousImage(): void {
  if (availableImages.value.length <= 1) {
    return
  }

  selectedImageIndex.value =
    selectedImageIndex.value === 0
      ? availableImages.value.length - 1
      : selectedImageIndex.value - 1
}

function showNextImage(): void {
  if (availableImages.value.length <= 1) {
    return
  }

  selectedImageIndex.value =
    selectedImageIndex.value === availableImages.value.length - 1
      ? 0
      : selectedImageIndex.value + 1
}
</script>

<template>
  <div>
    <div
      class="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
    >
      <img
        v-if="selectedImage"
        :src="selectedImage"
        :alt="productTitle"
        class="aspect-square w-full object-contain p-8 sm:p-12"
      />

      <div
        v-else
        class="flex aspect-square items-center justify-center p-8 text-gray-500 dark:text-gray-400"
      >
        Imagen no disponible
      </div>

      <template v-if="availableImages.length > 1">
        <button
          type="button"
          class="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-gray-900 shadow transition hover:bg-white dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
          aria-label="Mostrar imagen anterior"
          @click="showPreviousImage"
        >
          ‹
        </button>

        <button
          type="button"
          class="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-gray-900 shadow transition hover:bg-white dark:bg-gray-800/90 dark:text-white dark:hover:bg-gray-800"
          aria-label="Mostrar imagen siguiente"
          @click="showNextImage"
        >
          ›
        </button>
      </template>
    </div>

    <div
      v-if="availableImages.length > 1"
      class="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5"
    >
      <button
        v-for="(image, index) in availableImages"
        :key="`${image}-${index}`"
        type="button"
        class="overflow-hidden rounded-xl border bg-gray-100 transition dark:bg-gray-900"
        :class="
          selectedImageIndex === index
            ? 'border-indigo-600 ring-2 ring-indigo-200 dark:border-indigo-400 dark:ring-indigo-950'
            : 'border-gray-200 hover:border-indigo-300 dark:border-gray-800 dark:hover:border-indigo-700'
        "
        :aria-label="`Mostrar imagen ${index + 1} de ${productTitle}`"
        :aria-pressed="selectedImageIndex === index"
        @click="selectImage(index)"
      >
        <img
          :src="image"
          :alt="`${productTitle}, imagen ${index + 1}`"
          class="aspect-square w-full object-contain p-2"
          loading="lazy"
        />
      </button>
    </div>
  </div>
</template>
