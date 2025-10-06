<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const showCart = ref(false)
const showUser = ref(false)

function toggleCart() {
  showCart.value = !showCart.value
}

function toggleUser() {
  showUser.value = !showUser.value
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand d-flex align-items-center">
          <img src="https://via.placeholder.com/40" alt="Logo" class="me-2"/>
          Digimon TCG
        </RouterLink>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/catalogue" class="nav-link">Catalogue</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/vault" class="nav-link">Vault</RouterLink>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center">
          <button class="btn btn-outline-primary me-2" @click="toggleCart">
            <img src="https://via.placeholder.com/24" alt="Carrito" />
          </button>
          <button class="btn btn-outline-secondary" @click="toggleUser">
            <img src="https://via.placeholder.com/24" alt="Usuario" />
          </button>
        </div>
      </div>
    </nav>
  </header>

  <div class="offcanvas offcanvas-end" tabindex="-1" :class="{ show: showCart }" style="visibility: visible;" @click.self="toggleCart">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Carrito</h5>
      <button type="button" class="btn-close" @click="toggleCart"></button>
    </div>
    <div class="offcanvas-body">
      Aquí irá tu carrito de compras
    </div>
  </div>

  <div class="offcanvas offcanvas-end" tabindex="-1" :class="{ show: showUser }" style="visibility: visible;" @click.self="toggleUser">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Usuario</h5>
      <button type="button" class="btn-close" @click="toggleUser"></button>
    </div>
    <div class="offcanvas-body">
      Aquí irá la información del usuario
    </div>
  </div>

  <RouterView />
</template>

<style scoped>
.navbar-brand img {
  height: 40px;
  width: 40px;
  object-fit: contain;
}

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