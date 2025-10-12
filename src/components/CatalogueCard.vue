

<template>
  <div
    class="catalogue-card card mb-4 shadow-sm"
    @click="$emit('select', product)"
    style="cursor: pointer;"
  >
    <div class="row g-0 h-100">
      <div class="col-md-5 d-flex align-items-center justify-content-center p-2">
        <img
          :src="product.image"
          :alt="product.name"
          class="img-fluid rounded card-img"
          @error="onImgError"
        />
      </div>

      <div class="col-md-7">
        <div class="card-body d-flex flex-column justify-content-between h-100">
          <h5 class="card-title">{{ product.name }}</h5>

          <p class="card-text mb-1">
            <strong>Precio:</strong> ${{ product.price }}
          </p>

          <p v-if="product.discount === true" class="text-success mb-1">
            <strong>Oferta:</strong> ${{ product.discount_price }}
          </p>

          <p v-if="product.discount === true" class="text-danger mb-1">
            <strong>Precio final:</strong> ${{ finalPrice(product) }}
          </p>

          <p class="card-text mb-2">
            <strong>Stock:</strong> {{ product.stock }}
          </p>

          <button
            class="btn"
            :class="product.stock > 0 ? 'btn-primary' : 'btn-secondary'"
            :disabled="product.stock <= 0"
            @click.stop="addProduct(product)"
          >
            {{ product.stock > 0 ? "Agregar al carrito" : "Sin stock" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { getBoosterById } from "@/services/firestoreProducts";
const cart = useCartStore();
let stockCheckInterval;

onMounted(() => {

  stockCheckInterval = setInterval(async () => {
    try {
      const booster = await getBoosterById(props.product.id);
      if (booster.stock !== props.product.stock) {
        props.product.stock = booster.stock; 
        console.log(`Stock actualizado a ${booster.stock}`);
      }
    } catch (err) {
      console.error("Error actualizando stock:", err);
    }
  }, 9000);
});

onUnmounted(() => {
  console.log(`Card destruida: ${props.product.name}. Limpiando intervalos...`);
  clearInterval(stockCheckInterval); 
});


const props = defineProps({
  product: Object,
});

function addProduct(product) {
  cart.addToCart(product);
}

function finalPrice(product) {
  const price = Number(product.price) || 0;
  const discount = product.discount === true ? Number(product.discount_price) || 0 : 0;
  return price - discount;
}

function onImgError(event) {
  event.target.src = "https://via.placeholder.com/300x400?text=No+Image";
}
</script>

<style scoped>
.catalogue-card {
  min-height: 250px;
  transition: transform 0.2s;
}
.catalogue-card:hover {
  transform: scale(1.02);
}
.card-img {
  max-height: 220px;
  object-fit: contain;
}
</style>