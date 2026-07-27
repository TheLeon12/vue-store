<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import ProductCard from '@/components/products/ProductCard.vue'

import { getProducts } from '@/services/products.service'

import type { Product } from '@/types/product'

interface FeaturedCategory {
  name: string
  description: string
  icon: string
  slug: string
}

interface StoreBenefit {
  title: string
  description: string
  icon: string
}

const featuredProducts = ref<Product[]>([])
const isLoadingProducts = ref(false)
const productsError = ref('')

const categories: FeaturedCategory[] = [
  {
    name: 'Electrónica',
    description: 'Tecnología y dispositivos para tu día a día.',
    icon: '📱',
    slug: 'smartphones',
  },
  {
    name: 'Moda',
    description: 'Ropa y accesorios para todos los estilos.',
    icon: '👕',
    slug: 'mens-shirts',
  },
  {
    name: 'Belleza',
    description: 'Productos para el cuidado personal.',
    icon: '✨',
    slug: 'beauty',
  },
  {
    name: 'Hogar',
    description: 'Todo lo necesario para renovar tus espacios.',
    icon: '🏠',
    slug: 'home-decoration',
  },
  {
    name: 'Muebles',
    description: 'Comodidad y estilo para cada habitación.',
    icon: '🛋️',
    slug: 'furniture',
  },
  {
    name: 'Deportes',
    description: 'Artículos para mantenerte siempre activo.',
    icon: '⚽',
    slug: 'sports-accessories',
  },
]

const benefits: StoreBenefit[] = [
  {
    title: 'Envíos rápidos',
    description:
      'Recibe tus productos de forma rápida y segura en la dirección indicada.',
    icon: '🚚',
  },
  {
    title: 'Compra segura',
    description:
      'Disfruta de una experiencia de compra clara, sencilla y protegida.',
    icon: '🔒',
  },
  {
    title: 'Productos destacados',
    description:
      'Explora una selección amplia de productos para diferentes necesidades.',
    icon: '⭐',
  },
]

async function loadFeaturedProducts(): Promise<void> {
  isLoadingProducts.value = true
  productsError.value = ''

  try {
    const response = await getProducts({
      limit: 4,
      skip: 0,
      sortBy: 'rating',
      order: 'desc',
    })

    featuredProducts.value = response.products
  } catch {
    productsError.value = 'No fue posible cargar los productos destacados.'
  } finally {
    isLoadingProducts.value = false
  }
}

onMounted(() => {
  void loadFeaturedProducts()
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="relative overflow-hidden border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.18),transparent_40%)]"
        aria-hidden="true"
      />

      <div
        class="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28"
      >
        <div>
          <span
            class="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300"
          >
            Tienda virtual creada con Vue 3
          </span>

          <h1
            class="mt-6 max-w-3xl text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Descubre productos
            <span class="text-indigo-600 dark:text-indigo-400">
              increíbles
            </span>
            para ti
          </h1>

          <p
            class="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Explora nuestro catálogo, guarda tus productos favoritos y disfruta
            de una experiencia de compra rápida, moderna y sencilla.
          </p>

          <div class="mt-8 flex flex-col gap-4 sm:flex-row">
            <RouterLink
              to="/products"
              class="inline-flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              Explorar productos
              <span class="ml-2" aria-hidden="true">→</span>
            </RouterLink>

            <RouterLink
              to="/favorites"
              class="inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-indigo-700 dark:hover:text-indigo-400"
            >
              <span class="mr-2 text-lg" aria-hidden="true">♡</span>
              Ver favoritos
            </RouterLink>
          </div>

          <dl
            class="mt-10 grid grid-cols-2 gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 sm:grid-cols-4"
          >
            <div>
              <dt class="text-2xl font-bold text-gray-950 dark:text-white">
                100+
              </dt>

              <dd class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Productos
              </dd>
            </div>

            <div>
              <dt class="text-2xl font-bold text-gray-950 dark:text-white">
                20+
              </dt>

              <dd class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Categorías
              </dd>
            </div>

            <div>
              <dt class="text-2xl font-bold text-gray-950 dark:text-white">
                24/7
              </dt>

              <dd class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Disponible
              </dd>
            </div>

            <div>
              <dt class="text-2xl font-bold text-gray-950 dark:text-white">
                100%
              </dt>

              <dd class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Responsive
              </dd>
            </div>
          </dl>
        </div>

        <!-- Hero visual -->
        <div class="relative mx-auto w-full max-w-xl">
          <div
            class="absolute -left-6 top-16 size-32 rounded-full bg-indigo-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div
            class="absolute -right-8 bottom-10 size-40 rounded-full bg-purple-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div
            class="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:p-8"
          >
            <div
              class="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p
                    class="text-sm font-semibold uppercase tracking-wider text-indigo-100"
                  >
                    Vue Store
                  </p>

                  <h2 class="mt-3 text-2xl font-bold sm:text-3xl">
                    Todo lo que buscas en un solo lugar
                  </h2>
                </div>

                <span
                  class="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl"
                  aria-hidden="true"
                >
                  🛍️
                </span>
              </div>

              <p class="mt-4 text-indigo-100">
                Productos, favoritos, carrito y checkout dentro de una
                experiencia moderna.
              </p>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <RouterLink
                to="/products"
                class="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-indigo-700"
              >
                <span
                  class="flex size-11 items-center justify-center rounded-xl bg-indigo-100 text-xl dark:bg-indigo-950"
                  aria-hidden="true"
                >
                  🔍
                </span>

                <h3
                  class="mt-4 font-bold text-gray-950 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
                >
                  Explorar
                </h3>

                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Busca y filtra productos.
                </p>
              </RouterLink>

              <RouterLink
                to="/favorites"
                class="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-red-800"
              >
                <span
                  class="flex size-11 items-center justify-center rounded-xl bg-red-100 text-xl dark:bg-red-950"
                  aria-hidden="true"
                >
                  ♥
                </span>

                <h3
                  class="mt-4 font-bold text-gray-950 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400"
                >
                  Favoritos
                </h3>

                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Guarda lo que te gusta.
                </p>
              </RouterLink>

              <RouterLink
                to="/cart"
                class="group col-span-2 flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-indigo-700"
              >
                <span
                  class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl dark:bg-green-950"
                  aria-hidden="true"
                >
                  🛒
                </span>

                <span>
                  <span
                    class="block font-bold text-gray-950 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
                  >
                    Carrito de compras
                  </span>

                  <span
                    class="mt-1 block text-sm text-gray-500 dark:text-gray-400"
                  >
                    Administra tus productos y completa tu pedido.
                  </span>
                </span>

                <span
                  class="ml-auto text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                  aria-hidden="true"
                >
                  →
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="bg-gray-50 py-16 dark:bg-gray-900/40 sm:py-20">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <p
            class="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
          >
            Categorías
          </p>

          <h2
            class="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl"
          >
            Encuentra lo que necesitas
          </h2>

          <p class="mt-4 text-gray-600 dark:text-gray-300">
            Explora algunas de las categorías disponibles en nuestro catálogo.
          </p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="category in categories"
            :key="category.slug"
            :to="{
              path: '/products',
              query: {
                category: category.slug,
              },
            }"
            class="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-700"
          >
            <div class="flex items-start gap-4">
              <span
                class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition group-hover:scale-110 dark:bg-indigo-950"
                aria-hidden="true"
              >
                {{ category.icon }}
              </span>

              <div>
                <h3
                  class="text-lg font-bold text-gray-950 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
                >
                  {{ category.name }}
                </h3>

                <p
                  class="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400"
                >
                  {{ category.description }}
                </p>

                <span
                  class="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  Explorar categoría
                  <span
                    class="ml-2 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Productos destacados -->
    <section class="bg-white py-16 dark:bg-gray-950 sm:py-20">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
            >
              Recomendados
            </p>

            <h2
              class="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl"
            >
              Productos destacados
            </h2>

            <p class="mt-4 text-gray-600 dark:text-gray-300">
              Una selección de los productos mejor valorados.
            </p>
          </div>

          <RouterLink
            to="/products"
            class="inline-flex min-h-11 items-center font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
          >
            Ver todos los productos
            <span class="ml-2" aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <div
          v-if="isLoadingProducts"
          class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          role="status"
          aria-label="Cargando productos destacados"
        >
          <div
            v-for="index in 4"
            :key="index"
            class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              class="aspect-square animate-pulse bg-gray-200 dark:bg-gray-800"
            />

            <div class="space-y-4 p-5">
              <div
                class="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800"
              />

              <div
                class="h-6 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-800"
              />

              <div
                class="h-11 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
              />
            </div>
          </div>
        </div>

        <div
          v-else-if="productsError"
          class="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          role="alert"
        >
          <p class="font-semibold">
            {{ productsError }}
          </p>

          <button
            type="button"
            class="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            @click="loadFeaturedProducts"
          >
            Intentar nuevamente
          </button>
        </div>

        <div
          v-else-if="featuredProducts.length > 0"
          class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Beneficios -->
    <section class="bg-gray-50 py-16 dark:bg-gray-900/40 sm:py-20">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6 md:grid-cols-3">
          <article
            v-for="benefit in benefits"
            :key="benefit.title"
            class="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <span
              class="flex size-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl dark:bg-indigo-950"
              aria-hidden="true"
            >
              {{ benefit.icon }}
            </span>

            <h2 class="mt-5 text-xl font-bold text-gray-950 dark:text-white">
              {{ benefit.title }}
            </h2>

            <p class="mt-3 leading-7 text-gray-600 dark:text-gray-300">
              {{ benefit.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="bg-white py-16 dark:bg-gray-950 sm:py-20">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-12 text-white shadow-xl sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14"
        >
          <div
            class="absolute -right-16 -top-20 size-64 rounded-full bg-white/10"
            aria-hidden="true"
          />

          <div class="relative max-w-2xl">
            <p
              class="text-sm font-semibold uppercase tracking-wider text-indigo-100"
            >
              Comienza ahora
            </p>

            <h2 class="mt-3 text-3xl font-bold sm:text-4xl">
              ¿Listo para encontrar tu próximo producto?
            </h2>

            <p class="mt-4 text-lg text-indigo-100">
              Visita el catálogo completo, utiliza nuestros filtros y guarda tus
              productos favoritos.
            </p>
          </div>

          <div
            class="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:ml-10"
          >
            <RouterLink
              to="/products"
              class="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              Ver catálogo
              <span class="ml-2" aria-hidden="true">→</span>
            </RouterLink>

            <RouterLink
              to="/cart"
              class="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Abrir carrito
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
