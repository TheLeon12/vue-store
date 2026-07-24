<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    message?: string
    variant?: 'info' | 'error'
  }>(),
  {
    message: '',
    variant: 'info',
  },
)
</script>

<template>
  <div
    class="rounded-xl border p-6"
    :class="
      variant === 'error'
        ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200'
        : 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200'
    "
    role="alert"
  >
    <h2 class="font-semibold">
      {{ title }}
    </h2>

    <p v-if="message" class="mt-2 text-sm">
      {{ message }}
    </p>

    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>
