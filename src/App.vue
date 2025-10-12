
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, computed } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from '@/stores/user';
import { createUserProfile, getUserProfile } from '@/services/firestoreUsers';
import CartOffcanvas from "@/components/CartOffcanvas.vue";
import { useCartStore } from "@/stores/cart";
const cart = useCartStore();

const showCart = ref(false);
const showUser = ref(false);
const showRegisterForm = ref(false);

function toggleCart() { showCart.value = !showCart.value; }
function toggleUser() { showUser.value = !showUser.value; }

const userStore = useUserStore();
const auth = getAuth();

const userEmail = computed(() => userStore.currentUser?.email || null);
const userNickname = computed(() => userStore.nickname || null);

const loginEmail = ref('');
const loginPassword = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerUsername = ref('');


onAuthStateChanged(auth, async (user) => {
  if (user) {
    const profile = await getUserProfile(user.uid);
    userStore.setUser(user, profile?.username || null);
  } else {
    userStore.logout();
  }
});

async function loginUser() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
    const uid = userCredential.user.uid;
    const profile = await getUserProfile(uid); 
    userStore.setUser(userCredential.user, profile?.username || null);
    showUser.value = false;

    loginEmail.value = '';
    loginPassword.value = '';
  } catch (error) {
    if (error.code === 'auth/user-not-found') alert('No se encontró un usuario con este correo.');
    else if (error.code === 'auth/wrong-password') alert('Contraseña incorrecta.');
    else if (error.code === 'auth/invalid-email') alert('El correo no es válido.');
    else if (error.code === 'auth/user-disabled') alert('Este usuario ha sido deshabilitado.');
    else alert(error.message);
  }
}

async function registerUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value);
    const uid = userCredential.user.uid;

    await createUserProfile(uid, registerUsername.value, registerEmail.value);

    userStore.setUser(userCredential.user, registerUsername.value);
    showUser.value = false;

    registerEmail.value = '';
    registerPassword.value = '';
    registerUsername.value = '';
  } catch (error) {
    if (error.code === 'auth/weak-password') alert('La contraseña debe tener al menos 6 caracteres.');
    else if (error.code === 'auth/invalid-email') alert('El correo no es válido.');
    else if (error.code === 'auth/email-already-in-use') alert('Este correo ya está registrado.');
    else alert(error.message);
  }
}

async function logoutUser() {
  try {
    await signOut(auth);
    userStore.logout();
    showUser.value = false;
  } catch (error) {
    alert(error.message);
  }
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
        <button class="btn btn-outline-secondary me-2" @click="toggleCart">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTDDGbBPwEeK-Ohb62NGga35q23ndvfl1ycm3Gc0ucHz_VDesD9ojBAOuLyK2KM4pfVS0&usqp=CAU"
          style="width: 24px; height: 24px;" 
          alt="" />
        </button>
        <button class="btn btn-outline-secondary" @click="toggleUser">
          <img src="https://via.placeholder.com/24" alt="" />
          <span class="ms-1">{{ userNickname || userEmail || "Usuario" }}</span>
        </button>
      </div>
    </div>
  </nav>
</header>


<CartOffcanvas :showCart="showCart" :toggleCart="toggleCart" />


<div class="offcanvas offcanvas-end" tabindex="-1" :class="{ show: showUser }" style="visibility: visible;" @click.self="toggleUser">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Usuario</h5>
    <button type="button" class="btn-close" @click="toggleUser"></button>
  </div>
  <div class="offcanvas-body d-flex flex-column">
    <template v-if="userStore.currentUser">
      <p><strong>Email:</strong> {{ userEmail }}</p>
      <p><strong>Nickname:</strong> {{ userNickname || "Sin nickname" }}</p>
      <button class="btn btn-danger mt-2" @click="logoutUser">Cerrar sesión</button>
    </template>

    <template v-else>
      <div v-if="!showRegisterForm">
        <h6>Login</h6>
        <input v-model="loginEmail" type="email" placeholder="Email" class="form-control mb-2">
        <input v-model="loginPassword" type="password" placeholder="Contraseña" class="form-control mb-2">
        <button class="btn btn-primary w-100" @click="loginUser">Iniciar sesión</button>
        <p class="mt-2 text-center">
          ¿No tienes cuenta? 
          <a href="#" @click.prevent="showRegisterForm = true">Regístrate</a>
        </p>
      </div>

      <div v-else>
        <h6>Registro</h6>
        <input v-model="registerUsername" type="text" placeholder="Username" class="form-control mb-2">
        <input v-model="registerEmail" type="email" placeholder="Email" class="form-control mb-2">
        <input v-model="registerPassword" type="password" placeholder="Contraseña" class="form-control mb-2">
        <button class="btn btn-secondary w-100" @click="registerUser">Registrarse</button>
        <p class="mt-2 text-center">
          ¿Ya tienes cuenta? 
          <a href="#" @click.prevent="showRegisterForm = false">Inicia sesión</a>
        </p>
      </div>
    </template>
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