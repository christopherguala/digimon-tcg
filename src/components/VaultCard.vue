

<template>
  <v-card class="vault-card" elevation="4">
    <v-img
      class="vault-card-img"
      :src="card.image || defaultImage"
      height="220"
      cover
    ></v-img>

    <v-card-title class="text-subtitle-1">{{ card.name }}</v-card-title>
    <v-card-subtitle>{{ card.id }}</v-card-subtitle>

    <v-card-actions class="justify-center">
      <label
        class="custom-checkbox"
        :class="{ checked: checked }"
      >
        <input
          type="checkbox"
          v-model="checked"
          @change="toggleCard"
        />
        <span class="checkbox-label">
          {{ checked ? "Obtenida" : "No obtenida" }}
        </span>
      </label>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { toggleUserCard } from '@/services/firestoreCards'
import defaultImage from '@/assets/default-card.webp'

const props = defineProps({
  card: { type: Object, required: true },
  uid: { type: String, default: null },
  userCards: { type: Array, required: true }
})

const checked = ref(false)

watch(
  () => props.userCards,
  () => {
    checked.value = props.userCards.includes(props.card.id)
  },
  { immediate: true }
)

const emit = defineEmits(['card-toggled'])

async function toggleCard() {
  await toggleUserCard(props.uid, props.card.id)
  emit('card-toggled', { cardId: props.card.id, checked: checked.value })
}
</script>

<style scoped>
.vault-card {
  width: 200px;
  margin: 10px;
  position: relative;
  overflow: visible;
}

.vault-card-img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-origin: center center;
  border-radius: 8px;
  z-index: 1;
  object-fit: cover;
}

.vault-card-img:hover {
  transform: scale(1.4);
  z-index: 10;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  object-fit: contain;
}

.custom-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  padding: 8px 16px;
  background-color: #ffb84d; 
  color: white;
  font-weight: 600;
  transition: background-color 0.4s ease, transform 0.2s ease;
  min-width: 120px;
}

.custom-checkbox:hover {
  transform: scale(1.05);
}

.custom-checkbox.checked {
  background-color: #4db8ff;
}

.custom-checkbox input[type="checkbox"] {
  display: none;
}

.checkbox-label {
  pointer-events: none;
}

.custom-checkbox.checked {
  box-shadow: 0 0 10px rgba(77, 184, 255, 0.6);
}
.custom-checkbox:not(.checked) {
  box-shadow: 0 0 10px rgba(255, 184, 77, 0.6);
}
</style>
