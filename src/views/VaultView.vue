

<template>
  <v-container class="py-6">
    <v-row justify="center">
      <v-col cols="12" md="10" class="mx-auto" style="max-width:1100px;">
        <h1 class="text-h4 font-weight-bold mb-4 text-center">
           Mi Colección de Cartas
        </h1>

        <v-alert type="info" variant="outlined" class="mb-4" border="start">
          Marca las cartas que tienes en tu colección real. Se guardarán en tu cuenta.
        </v-alert>

        <v-row class="mb-4" justify="center">
          <v-col cols="12" md="4" class="mx-auto">
            <v-select
              v-model="selectedSet"
              :items="['Todos', ...availableSets]"
              label="Seleccionar set"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="mb-2" justify="center">
          <v-col cols="12" md="6" class="mx-auto text-center">
            <v-card elevation="2" class="py-3">
              <h3 class="text-h6 mb-1">{{ selectedSetLabel }}</h3>
              <p class="text-body-1 font-weight-medium">
                {{ ownedCount }} / {{ totalCount }} cartas obtenidas
              </p>
              <v-progress-linear
              
                :key="ownedCount"
                :model-value="Number(progress)"
                color="#1E88E5"
                height="8"
                rounded
              ></v-progress-linear>
            </v-card>
          </v-col>
        </v-row>

        <div class="vault-grid-wrapper">
          <VaultGrid
            :cards="cards"
            :uid="uid"
            :userCards="userCards"
            @card-toggled="handleCardToggled"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import VaultGrid from '@/components/VaultGrid.vue'
import { getAllCards, getCardsBySet, getUserCards } from '@/services/firestoreCards'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const availableSets = ['BT1']
const selectedSet = ref('Todos')
const cards = ref([])
const userCards = ref([])
const uid = ref(null)

async function loadCards() {
  if (selectedSet.value === 'Todos') {
    cards.value = await getAllCards()
  } else {
    cards.value = await getCardsBySet(selectedSet.value)
  }
}


function handleCardToggled({ cardId, checked }) {
  if (checked && !userCards.value.includes(cardId)) {
    userCards.value.push(cardId)
  } else if (!checked) {
    userCards.value = userCards.value.filter(id => id !== cardId)
  }
}

onMounted(async () => {
  await loadCards()

  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid.value = user.uid
      userCards.value = await getUserCards(user.uid)
    } else {
      uid.value = null
      userCards.value = []
    }
  })
})

watch(selectedSet, loadCards)

const totalCount = computed(() => cards.value.length)
const ownedCount = computed(() =>
  cards.value.filter(c => userCards.value.includes(c.id)).length
)
const progress = computed(() =>
  totalCount.value > 0 ? (ownedCount.value / totalCount.value) * 100 : 0
)
const selectedSetLabel = computed(() =>
  selectedSet.value === 'Todos'
    ? 'Todas las colecciones'
    : `Colección ${selectedSet.value}`
)
</script>

<style scoped>  
.v-progress-linear__determinate {
  transition: width 0.5s ease-in-out;
}
</style>