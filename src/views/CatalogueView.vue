<template>
  <div class="catalogue-view container my-5">
    <h2 class="mb-4">Catálogo de Boosters</h2>

    <!-- Grid -->
    <CatalogueGrid />
  </div>
</template>

<script setup>
import CatalogueGrid from "@/components/CatalogueGrid.vue";
</script>

<style scoped>
.catalogue-view {
  min-height: 80vh;
}
</style>