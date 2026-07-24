<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    class="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8"
  >
    <div>
      <p class="text-base font-semibold text-indigo-600">Error 404</p>

      <h1
        class="mt-4 text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl"
      >
        Página no encontrada
      </h1>

      <p class="mt-6 text-lg text-gray-600">
        La dirección que intentaste visitar no existe.
      </p>

      <RouterLink
        to="/"
        class="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
      >
        Volver al inicio
      </RouterLink>
    </div>
  </section>
</template>
