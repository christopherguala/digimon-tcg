

<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    :class="{ show: showCart }"
    style="visibility: visible;"
    @click.self="toggleCart"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">🛒 Carrito</h5>
      <button type="button" class="btn-close" @click="toggleCart"></button>
    </div>

    <div class="offcanvas-body d-flex flex-column">
      <transition name="fade">
        <div
          v-if="cart.successMessage"
          class="alert alert-success text-center mb-3 p-2"
        >
          {{ cart.successMessage }}
        </div>
      </transition>

      <div v-if="cart.items.length > 0" class="flex-grow-1 overflow-auto">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="d-flex align-items-center justify-content-between border-bottom py-2"
        >
          <img :src="item.image" alt="" class="rounded me-2" width="50" height="50" />
          <div class="flex-grow-1">
            <p class="mb-0 fw-bold">{{ item.name }}</p>
            <small>{{ item.price }} USD</small>
          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary" @click="cart.decreaseQuantity(item.id)">−</button>
            <span class="mx-2">{{ item.quantity }}</span>
            <button class="btn btn-sm btn-outline-secondary" @click="cart.increaseQuantity(item.id)">+</button>
            <button class="btn btn-sm btn-danger ms-2" @click="cart.removeFromCart(item.id)">x</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-muted flex-grow-1 d-flex align-items-center justify-content-center">
        <p>Tu carrito está vacío</p>
      </div>
      <div class="border-top pt-3 mt-3">
        <p class="fw-bold mb-1">Total: {{ cart.totalPrice.toFixed(2) }} USD</p>
        <button class="btn btn-success w-100" @click="cart.finalizePurchase">
          Finalizar compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
defineProps({
  showCart: Boolean,
  toggleCart: Function,
});
const cart = useCartStore();
</script>

<style scoped>
.offcanvas {
  background-color: #f8f9fa;
  transition: transform 0.3s ease-in-out;
}

.offcanvas.show {
  transform: translateX(0%);
  visibility: visible;
}

.offcanvas:not(.show) {
  transform: translateX(100%);
  visibility: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>