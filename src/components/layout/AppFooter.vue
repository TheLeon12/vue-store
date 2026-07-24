<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="border-t border-gray-200 bg-white transition-colors dark:border-gray-800 dark:bg-gray-900"
  >
    <div
      class="mx-auto w-full max-w-7xl px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8"
    >
      © {{ currentYear }} Vue Store · Vue 3, TypeScript y Vite · MS Industries
    </div>
  </footer>
</template>