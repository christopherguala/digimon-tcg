<template>
  <div class="home-view" @wheel="handleScroll">
    <transition name="fade" mode="out-in">
      <div :key="currentSection" class="section" :class="'section-' + currentSection">
        <v-container fluid class="section-content">
          <v-row class="fill-height no-gutters" align="center">
            <v-col cols="12" md="6" class="text-section">
              <div class="text-inner">
                <h1
                  v-if="currentSection === 1"
                  class="text-h3 font-weight-bold mb-4 text-primary"
                >
                  ¡Bienvenido, Tamer!
                </h1>
                <h2
                  v-else-if="currentSection === 2"
                  class="text-h4 mb-4 text-primary"
                >
                   Vault
                </h2>
                <h2
                  v-else-if="currentSection === 3"
                  class="text-h4 mb-4 text-primary"
                >
                   Futuro
                </h2>

                <p v-if="currentSection === 1" class="text-body-1 mb-4">
                  En este portal creado por y para los amantes del
                  Digimon TCG, es de momento es un simple simulador de compra de productos
                  oficiales y una base para poder explorar cartas de digimon tcg o para llevar tu coleccion personal.
                  Pero eso no es todo, revisa nuestros plamnes a futuro para ver lo que depara este hermoso proyecto.
                </p>
                <p v-else-if="currentSection === 2" class="text-body-1 mb-4">
                  Revisa todas las cartas de Digimon TCG según su set, desde el mismísimo BT-01 japonés
                  hasta las más nuevas. Busca cartas de tus Digimons favoritos o según color y código.
                  Si te registras puedes añadir cartas a tu colección personal con un contador y rastreo.
                  ¡Nunca fue tan fácil organizar tu colección!
                </p>
                <p v-else-if="currentSection === 3" class="text-body-1 mb-4">
                  Próximamente podrás crear tus propios mazos de digimon tcg y compartirlos con la comunidad. Tambien podras bajar mazos <br>
                  creados por otros usuarios. <br> Crearemos un simulador de apertura de sobres con los productos del catalogo de nuestra pagina,
                  estos proximamente no sera solo una simulacion de compra, si no <br> que podras gastar puntos ganados para comprar sobres. <br>
                  Y nuestra mejor plan a futuro sera que podras utilizar tus mazos creados en duelos online contra otros usuarios con las reglas originales del Digimon TCG.
                  <br> ¡visitanos en el futuro para ver nuestro avance! 
                </p>

                <v-btn
                  v-if="currentSection === 1"
                  color="deep-purple-accent-4"
                  variant="elevated"
                  size="large"
                  to="/vault"
                >
                  Explorar mi colección
                  <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </v-col>


            <v-col cols="12" md="6" class="image-section">
              <div class="image-fade-wrapper">
                <v-img
                  :src="sections[currentSection - 1].image"
                  class="hero-image"
                  cover
                ></v-img>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sections = [
  {
    image:
      "https://www.zenintcg.com/cdn/shop/files/Digimon_Card_Game_Official_Card_Sleeves_01_2.png?v=1751534514&width=1080",
  },
  {
    image: "https://m.media-amazon.com/images/I/A1lPZBK51pL.jpg",
  },
  {
    image: "https://images5.alphacoders.com/487/487460.png",
  },
];

const currentSection = ref(1);
let isScrolling = false;

const handleScroll = (e) => {
  if (isScrolling) return;
  isScrolling = true;
  setTimeout(() => (isScrolling = false), 1400);

  if (e.deltaY > 0 && currentSection.value < sections.length) {
    currentSection.value++;
  } else if (e.deltaY < 0 && currentSection.value > 1) {
    currentSection.value--;
  }
};
</script>

<style scoped>
.home-view {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #faf7ff;
}

.section {
  height: 100vh;
  display: flex;
  align-items: center;
  position: absolute;
  inset: 0;
  transition: background 1s ease;
}

.section-1 {
  background: linear-gradient(135deg, #faf7ff 0%, #f4f0ff 100%);
}

.section-2 {
  background: linear-gradient(135deg, #f1efff 0%, #eae6ff 100%);
}

.section-3 {
  background: linear-gradient(135deg, #ece4ff 0%, #e2dcff 100%);
}


.text-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-inner {
  max-width: 80%;
  margin: auto;
  text-align: left;
}

.image-section {
  height: 100%;
  position: relative;
}


.image-fade-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.image-fade-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(250, 247, 255, 0) 60%,
    rgba(250, 247, 255, 1) 100%
  );
  pointer-events: none;
  z-index: 2;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.95);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 960px) {
  .text-inner {
    max-width: 95%;
    text-align: center;
  }

  .image-section {
    height: 50vh;
  }
}
</style>