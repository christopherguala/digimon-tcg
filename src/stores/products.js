

import { defineStore } from "pinia";
import { ref } from "vue";
import { getBoosters } from "@/services/firestoreProducts";

export const useProductsStore = defineStore("products", () => {
  const boosters = ref([]);

  async function fetchBoosters() {
    try {
      boosters.value = await getBoosters();
    } catch (error) {
      console.error("Error al obtener boosters:", error);
    }
  }

  return { boosters, fetchBoosters };
});
