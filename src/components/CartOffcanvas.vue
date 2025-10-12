

<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    :class="{ show: showCart }"
    style="visibility: visible;"
    @click.self="toggleCart"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Carrito</h5>
      <button type="button" class="btn-close" @click="toggleCart"></button>
    </div>

    <div class="offcanvas-body">
      <div v-if="cart.items.length === 0">
        <p>Tu carrito está vacío.</p>
      </div>

      <div v-else>
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="d-flex align-items-center mb-3 border-bottom pb-2"
        >
          <img
            :src="item.image"
            alt=""
            style="width: 60px; height: 60px; object-fit: contain;"
            class="me-3"
          />
          <div class="flex-grow-1">
            <h6 class="mb-1">{{ item.name }}</h6>
            <p class="mb-1 text-muted">${{ item.price }}</p>
            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary" @click="cart.decreaseQuantity(item.id)">−</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button class="btn btn-sm btn-outline-secondary" @click="cart.increaseQuantity(item.id)">+</button>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <h6>Total: ${{ cart.totalPrice }}</h6>
          <button class="btn btn-success w-100 mt-2" @click="cart.finalizePurchase">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";

const props = defineProps({
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
</style>