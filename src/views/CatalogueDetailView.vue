
<template>
  <div class="catalogue-detail container my-5">
    <div v-if="product && setData" class="row">
      <!-- Imagen -->
      <div class="col-12 col-md-5 text-center mb-3 mb-md-0">
        <img
          :src="product.image"
          :alt="product.name"
          class="img-fluid shadow-lg rounded"
          style="max-height: 500px; object-fit: contain;"
        />
      </div>

      <!-- Info -->
      <div class="col-12 col-md-7">
        <h2 class="mb-3">{{ product.name }}</h2>

        <!-- Descripción -->
        <p v-if="product.type === 'booster'">
          Booster pack para Digimon TCG temporada <strong>{{ product.code }}</strong>, 
          la cual posee un total de <strong>{{ setData.content.cards }}</strong> cartas nuevas 
          para coleccionar, tradear y competir.  
          Cada booster pack de este set contiene un total de <strong>{{ product.booster.pack }}</strong> cartas, 
          distribuidas en las siguientes rarezas:
        </p>

        <p v-else-if="product.type === 'box'">
          Booster box para Digimon TCG temporada <strong>{{ product.code }}</strong>, 
          con un total de <strong>{{ setData.content.cards }}</strong> cartas nuevas para coleccionar, tradear y competir.  
          Cada box contiene <strong>{{ product.booster.pack }}</strong> boosters, 
          e incluye una carta especial llamada <em>Topper</em>, que posee un arte alternativo de un Tamer.
          Su distribución de rarezas es la siguiente:
        </p>

        <!-- Rarezas (UL) -->
        <ul>
          <li v-if="product.type === 'booster'">Comunes: {{ product.booster.common }}</li>
          <li v-if="product.type === 'booster'">Poco común: {{ product.booster.uncommon }}</li>
          <li v-if="product.type === 'booster'">Index: {{ product.booster.index }}</li>
          <li v-if="product.type === 'booster'">
            {{ product.booster.more_rares }} de cualquiera de estas categorías: Rara, Super Rara, Secreta o Arte alternativo
          </li>

          <li v-if="product.type === 'box'">Comunes: {{ product.booster.common }}</li>
          <li v-if="product.type === 'box'">Poco común: {{ product.booster.uncommon }}</li>
          <li v-if="product.type === 'box'">Raras: {{ product.booster.rare }}</li>
          <li v-if="product.type === 'box'">Super raras: {{ product.booster.super_rare }}</li>
          <li v-if="product.type === 'box'">Index: {{ product.booster.index }}</li>
          <li v-if="product.type === 'box'">Topper card: {{ product.booster.topper }}</li>
          <li v-if="product.type === 'box'">
            {{ product.booster.more_rares }} carta secreta o arte alternativo adicional
          </li>
        </ul>

        <!-- Link al set -->
        <p class="mt-3">
          Para saber qué cartas puedes obtener en este set, revisa la información del 
          <a href="#" class="fw-bold text-decoration-none">{{ setData.name }}</a>.
        </p>

        <!-- Precio, stock y botón -->
        <div class="mt-4">
          <p>
            <span v-if="product.discount" class="text-success fw-bold me-2">
              Oferta: ${{ product.discount_price }}
            </span>
            <span class="text-muted text-decoration-line-through me-2" v-if="product.discount">
              ${{ product.price }}
            </span>
            <span v-else class="fw-bold">Precio: ${{ product.price }}</span>
          </p>

          <p><strong>Stock:</strong> {{ product.stock }}</p>

          <button
            class="btn"
            :class="product.stock > 0 ? 'btn-primary' : 'btn-secondary'"
            :disabled="product.stock <= 0"
            @click="addToCart(product)"
          >
            {{ product.stock > 0 ? "Agregar al carrito" : "Sin stock" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Cargando -->
    <div v-else class="text-center my-5">
      <div class="spinner-border text-primary"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBoosterById, getSetByCode } from "@/services/firestoreProducts";

const route = useRoute();
const product = ref(null);
const setData = ref(null);

onMounted(async () => {
  try {
    // 🧩 Traemos booster por ID desde Firestore
    const current = await getBoosterById(route.params.id);
    product.value = current;

    if (current && current.code) {
      // 🧩 Traemos set por código (ej: BT1)
      const data = await getSetByCode(current.code);
      setData.value = data.length > 0 ? data[0] : null;
    }
  } catch (err) {
    console.error("Error cargando detalle:", err);
  }
});

function addToCart(product) {
  console.log("Agregar al carrito desde detalle:", product);
}
</script>

<style scoped>
.catalogue-detail {
  min-height: 70vh;
}
</style>