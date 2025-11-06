

<template>
  <v-container>
    <v-row class="mb-4" justify="center">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchTerm"
          label="Buscar carta"
          clearable
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col
        v-for="card in filteredCards"
        :key="card.id"
        cols="auto"
        class="d-flex justify-center"
      >
        <VaultCard
          :card="card"
          :uid="uid"
          :userCards="userCards"
          @card-toggled="emit('card-toggled', $event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import VaultCard from '@/components/VaultCard.vue'

const emit = defineEmits(['card-toggled']) 

const props = defineProps({
  cards: { type: Array, default: () => [] },
  uid: { type: String, default: null },
  userCards: { type: Array, default: () => [] }
})

const searchTerm = ref('')

const filteredCards = computed(() => {
  return props.cards.filter(c =>
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
</script>

<style scoped>
</style>