<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'

import BaseConfirmDialog from '@/components/base/BaseConfirmDialog.vue'
import CartList from '@/components/cart/CartList.vue'
import CartSummary from '@/components/cart/CartSummary.vue'

import { useCartStore } from '@/stores/cart.store'

const router = useRouter()
const cartStore = useCartStore()

const { items, isEmpty, totalItems, originalSubtotal, totalDiscount, total } =
  storeToRefs(cartStore)

const isClearDialogOpen = ref(false)

function handleUpdateQuantity(payload: {
  productId: number
  quantity: number
}): void {
  cartStore.updateQuantity(payload.productId, payload.quantity)
}

function openClearDialog(): void {
  isClearDialogOpen.value = true
}

function closeClearDialog(): void {
  isClearDialogOpen.value = false
}

function confirmClearCart(): void {
  cartStore.clearCart()
  closeClearDialog()
}

function goToCheckout(): void {
  if (cartStore.isEmpty) {
    return
  }

  void router.push({
    name: 'checkout',
  })
}
</script>

<template>
  <section class="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p
          class="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
        >
          Tu compra
        </p>

        <h1
          class="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl"
        >
          Carrito de compras
        </h1>

        <p v-if="!isEmpty" class="mt-3 text-gray-600 dark:text-gray-300">
          {{ totalItems }}
          {{ totalItems === 1 ? 'producto' : 'productos' }}
          en tu carrito.
        </p>
      </div>

      <button
        v-if="!isEmpty"
        type="button"
        class="self-start text-sm font-semibold text-red-600 transition hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 sm:self-auto"
        @click="openClearDialog"
      >
        Vaciar carrito
      </button>
    </div>

    <div
      v-if="isEmpty"
      class="mt-10 rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700"
    >
      <div
        class="mx-auto flex size-16 items-center justify-center rounded-full bg-indigo-100 text-3xl dark:bg-indigo-950"
        aria-hidden="true"
      >
        🛒
      </div>

      <h2 class="mt-5 text-xl font-bold text-gray-950 dark:text-white">
        Tu carrito está vacío
      </h2>

      <p class="mt-3 text-gray-600 dark:text-gray-300">
        Explora nuestro catálogo y agrega algunos productos.
      </p>

      <RouterLink
        to="/products"
        class="mt-7 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
      >
        Ver productos
      </RouterLink>
    </div>

    <div
      v-else
      class="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <CartList
        :items="items"
        @update-quantity="handleUpdateQuantity"
        @remove="cartStore.removeItem"
      />

      <div class="lg:sticky lg:top-6">
        <CartSummary
          :original-subtotal="originalSubtotal"
          :total-discount="totalDiscount"
          :total="total"
          :total-items="totalItems"
          @checkout="goToCheckout"
        />
      </div>
    </div>

    <BaseConfirmDialog
      :open="isClearDialogOpen"
      title="Vaciar carrito"
      message="Se eliminarán todos los productos del carrito."
      confirm-label="Vaciar carrito"
      @confirm="confirmClearCart"
      @cancel="closeClearDialog"
    />
  </section>
</template>
