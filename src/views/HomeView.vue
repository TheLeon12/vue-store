<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores/app.store'

const appStore = useAppStore()
const { storeName, themeName } = storeToRefs(appStore)
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl text-center">
      <span
        class="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
      >
        Proyecto configurado
      </span>

      <h1
        class="mt-6 text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-6xl"
      >
        Bienvenido a {{ storeName }}
      </h1>

      <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
        La base del proyecto está preparada con Vue 3, TypeScript, Vite, Vue
        Router, Pinia y Tailwind CSS.
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          class="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="appStore.toggleTheme"
        >
          Cambiar tema
        </button>
      </div>

      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Estado actual: {{ themeName }}
      </p>

      <div
        class="mx-auto mt-10 max-w-md rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900"
      >
        <h2 class="font-semibold text-gray-900 dark:text-white">
          Estado de Pinia
        </h2>

        <p class="mt-2 text-gray-600 dark:text-gray-300">
          El tema activo es {{ themeName }}.
        </p>
      </div>
    </div>
  </section>
</template>