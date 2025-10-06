

<template>
  <div class="catalogue-grid container my-4">
    <div class="mb-3">
      <input
        v-model="filter"
        type="text"
        class="form-control"
        placeholder="Buscar por nombre, código o tipo..."
      />
    </div>

    <div class="row">
  <div
    v-for="product in filteredBoosters"
    :key="product.id"
    class="col-12 col-md-6"
  >
    <CatalogueCard
      :product="product"
      @add-to-cart="handleAddToCart"
      @select="goToDetail"
    />
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import CatalogueCard from "./CatalogueCard.vue";
import { getBoosters } from "@/services/firestoreProducts";

const router = useRouter(); 
const boosters = ref([]);
const filter = ref("");

onMounted(async () => {
  try {
    boosters.value = await getBoosters();
  } catch (err) {
    console.error("Error al cargar boosters:", err);
  }
});

const filteredBoosters = computed(() => {
  if (!filter.value) return boosters.value;
  const term = filter.value.toLowerCase();
  return boosters.value.filter(
    (b) =>
      b.name.toLowerCase().includes(term) ||
      b.code.toLowerCase().includes(term) ||
      b.type.toLowerCase().includes(term)
  );
});

function handleAddToCart(booster) {
  console.log("Agregar al carrito:", booster);
}

function goToDetail(product) {
  console.log("Redirigir a detalle con ID:", product.id);
  router.push({
    name: "catalogue-detail", 
    params: { id: product.id },
  });
}
</script>

<style scoped>
.catalogue-grid {
  min-height: 70vh;
}
</style>