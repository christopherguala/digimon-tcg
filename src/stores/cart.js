

import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { updateBooster } from "@/services/firestoreProducts";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserStore } from "./user";
import { useProductsStore } from "./products";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const userStore = useUserStore();
  const successMessage = ref("");
  const saved = localStorage.getItem("cart");
  if (saved) {
    try {
      items.value = JSON.parse(saved);
    } catch {
      items.value = [];
    }
  }

  watch(
    items,
    (val) => {
      localStorage.setItem("cart", JSON.stringify(val));
    },
    { deep: true }
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
  );

  const totalItems = computed(() =>
    items.value.reduce((sum, p) => sum + p.quantity, 0)
  );

  function addToCart(product) {
    if (!userStore.currentUser) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    const existing = items.value.find((p) => p.id === product.id);
    if (existing) {
      if (existing.quantity < product.stock) {
        existing.quantity++;
      } else {
        alert("No hay suficiente stock disponible.");
      }
    } else {
      if (product.stock > 0) {
        items.value.push({
          id: product.id,
          name: product.name,
          image: product.image,
          price:
            product.discount === true
              ? Number(product.price) - Number(product.discount_price)
              : Number(product.price),
          stock: product.stock,
          quantity: 1,
        });
      } else {
        alert("Producto sin stock disponible.");
      }
    }
  }

  function removeFromCart(id) {
    items.value = items.value.filter((p) => p.id !== id);
  }

  function increaseQuantity(id) {
    const product = items.value.find((p) => p.id === id);
    if (product) {
      if (product.quantity < product.stock) {
        product.quantity++;
      } else {
        alert("Stock máximo alcanzado.");
      }
    }
  }

  function decreaseQuantity(id) {
    const product = items.value.find((p) => p.id === id);
    if (product) {
      product.quantity--;
      if (product.quantity <= 0) removeFromCart(id);
    }
  }

  async function finalizePurchase() {
    if (!userStore.currentUser) {
      alert("Debes iniciar sesión para finalizar la compra.");
      return;
    }

    if (items.value.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const userId = userStore.currentUser.uid;
    const fechaCompra = new Date().toISOString().split("T")[0];
    const compra = {
      productos: items.value.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        quantity: p.quantity,
        shoppingPrice: p.price,
      })),
      totalPrice: totalPrice.value,
      fechaCompra,
    };

    for (const p of items.value) {
      const newStock = p.stock - p.quantity;
      await updateBooster(p.id, { stock: newStock });
    }

    const userRef = doc(db, "usuarios", userId);
    await updateDoc(userRef, {
      compras: arrayUnion(compra),
    });

    try {
      const productsStore = useProductsStore();
      if (productsStore && typeof productsStore.fetchBoosters === "function") {
        await productsStore.fetchBoosters();
      }
    } catch {
    }

    successMessage.value = "✅ ¡Compra realizada con éxito!";
    items.value = [];

    setTimeout(() => (successMessage.value = ""), 4000);
  }

  return {
    items,
    totalItems,
    totalPrice,
    successMessage,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    finalizePurchase,
  };
});