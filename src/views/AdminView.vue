


<template>
  <v-container class="py-6">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h1 class="text-h4 mb-4">Administración</h1>

        <v-tabs v-model="activeTab" bg-color="primary" dark>
          <v-tab value="boosters">Productos</v-tab>
          <v-tab value="sets">Sets</v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="mt-4">
          <v-window-item value="boosters">
            <v-row class="mb-4" justify="space-between" align="center">
              <v-col cols="12" md="6">
                <v-btn color="primary" @click="openAddDialog">
                  <v-icon left>mdi-plus</v-icon> Agregar producto
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn text @click="reload">Refrescar</v-btn>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="products"
              item-key="id"
              class="elevation-1"
            >
              <template #item.price="{ item }">
                <v-text-field
                  v-model="localEditable[item.id].price"
                  @input="markEdited(item)"
                  type="number"
                  dense
                  hide-details
                  style="max-width:100px"
                />
              </template>

              <template #item.discount="{ item }">
                <v-switch
                  v-model="localEditable[item.id].discount"
                  @change.stop="markEdited(item)"
                />
              </template>

              <template #item.discount_price="{ item }">
                <v-text-field
                  v-model="localEditable[item.id].discount_price"
                  @input="markEdited(item)"
                  type="number"
                  dense
                  hide-details
                  style="max-width:120px"
                />
              </template>

              <template #item.stock="{ item }">
                <v-text-field
                  v-model="localEditable[item.id].stock"
                  @input="markEdited(item)"
                  type="number"
                  dense
                  hide-details
                  style="max-width:100px"
                />
              </template>

              <template #item.actions="{ item }">
                <v-btn
                  color="success"
                  small
                  class="mr-2"
                  @click="openSaveConfirm(item)"
                  :disabled="!hasEdit(item)"
                >
                  Guardar
                </v-btn>
                <v-btn color="error" small @click="openDeleteConfirm(item)">
                  Eliminar
                </v-btn>
              </template>
            </v-data-table>
          </v-window-item>

          <v-window-item value="sets">
            <v-row class="mb-4" justify="space-between" align="center">
              <v-col cols="12" md="6">
                <v-btn color="primary" @click="openAddSetDialog">
                  <v-icon left>mdi-plus</v-icon> Agregar set
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn text @click="loadSets">Refrescar</v-btn>
              </v-col>
            </v-row>

            <v-data-table
              :headers="setHeaders"
              :items="sets"
              item-key="id"
              class="elevation-1"
            >
              <template #item.actions="{ item }">
                <v-btn color="error" small @click="openDeleteSetConfirm(item)">
                  Eliminar
                </v-btn>
              </template>
            </v-data-table>
          </v-window-item>
        </v-window>

        <v-dialog v-model="saveDialog" max-width="400px">
          <v-card>
            <v-card-title class="text-h6">Confirmar cambios</v-card-title>
            <v-card-text>¿Deseas guardar los cambios en este producto?</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="saveDialog = false">Cancelar</v-btn>
              <v-btn color="primary" @click="confirmSave">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="400px">
          <v-card>
            <v-card-title class="text-h6">Confirmar eliminación</v-card-title>
            <v-card-text>
              ¿Deseas eliminar <strong>{{ deletingProduct?.name }}</strong>?
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="deleteDialog = false">Cancelar</v-btn>
              <v-btn color="error" @click="confirmDelete">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="addSetDialog" max-width="700px">
          <v-card>
            <v-card-title>Agregar nuevo Set</v-card-title>
            <v-card-text>
              <v-form ref="addSetFormRef" v-model="addSetFormValid">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="addSetForm.name" label="Nombre del set" />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field v-model="addSetForm.code" label="Código" />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="addSetForm.release_date"
                      label="Fecha de lanzamiento"
                      type="date"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="addSetForm.image" label="URL Imagen" />
                  </v-col>

                  <v-divider class="my-3"></v-divider>
                  <v-col cols="12" class="text-h6">Contenido del set</v-col>

                  <v-col cols="6" md="4" v-for="(field, key) in addSetForm.content" :key="key">
                    <v-text-field
                      v-model.number="addSetForm.content[key]"
                      :label="key"
                      type="number"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="addSetDialog = false">Cancelar</v-btn>
              <v-btn color="primary" @click="confirmAddSet">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteSetDialog" max-width="400px">
          <v-card>
            <v-card-title class="text-h6">Confirmar eliminación</v-card-title>
            <v-card-text>
              ¿Deseas eliminar el set <strong>{{ deletingSet?.name }}</strong>?
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="deleteSetDialog = false">Cancelar</v-btn>
              <v-btn color="error" @click="confirmDeleteSet">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import {
  getBoosters,
  updateBooster as updateBoosterByPropertyId,
  deleteBooster as deleteBoosterByPropertyId,
  createBooster as createBoosterWithAutoId,
  getSets,
  createSet,
  deleteSet
} from '@/services/firestoreProducts'


const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    if (!userStore.isAdmin) router.push('/')
  }, 300)
})

const activeTab = ref('boosters') 

const products = ref([])
const headers = [
  { title: 'Nombre', value: 'name' },
  { title: 'Stock', value: 'stock' },
  { title: 'Precio', value: 'price' },
  { title: 'Descuento', value: 'discount' },
  { title: 'Precio descuento', value: 'discount_price' },
  { title: 'Acciones', value: 'actions', sortable: false }
]

const localEditable = reactive({})
const deletingProduct = ref(null)
const deleteDialog = ref(false)
const saveDialog = ref(false)
const currentSaveItem = ref(null)

const addDialog = ref(false)
const addFormDialog = ref(false)
let addFormValid = false

const addForm = reactive({
  name: '',
  code: '',
  price: null,
  stock: null,
  type: '',
  discount: false,
  discount_price: 0,
  image: '',
  booster: {}
})

async function loadProducts() {
  const data = await getBoosters()
  products.value = data
  data.forEach(p => {
    localEditable[p.id] = {
      price: p.price ?? 0,
      discount: !!p.discount,
      discount_price: p.discount_price ?? 0,
      stock: p.stock ?? 0
    }
  })
}
onMounted(loadProducts)

function getNextAvailableIdBoosters() {
  const ids = products.value.map(p => Number(p.id)).filter(n => !isNaN(n))
  if (ids.length === 0) return 1
  ids.sort((a, b) => a - b)
  for (let i = 1; i <= ids.length; i++) {
    if (!ids.includes(i)) return i
  }
  return ids[ids.length - 1] + 1
}

function hasEdit(item) {
  const e = localEditable[item.id]
  return (
    e &&
    (Number(e.price) !== Number(item.price) ||
      e.discount !== item.discount ||
      Number(e.discount_price) !== Number(item.discount_price) ||
      Number(e.stock) !== Number(item.stock))
  )
}
function markEdited() {}
function openSaveConfirm(item) {
  currentSaveItem.value = item
  saveDialog.value = true
}
async function confirmSave() {
  const item = currentSaveItem.value
  if (!item) return
  const e = localEditable[item.id]
  await updateBoosterByPropertyId(item.id, {
    price: Number(e.price),
    discount: e.discount,
    discount_price: Number(e.discount_price),
    stock: Number(e.stock)
  })
  saveDialog.value = false
  await loadProducts()
}

function openDeleteConfirm(item) {
  deletingProduct.value = item
  deleteDialog.value = true
}
async function confirmDelete() {
  if (!deletingProduct.value) return
  await deleteBoosterByPropertyId(Number(deletingProduct.value.id))
  deleteDialog.value = false
  await loadProducts()
}

function openAddDialog() {
  addDialog.value = true
}
function closeAddDialog() {
  addDialog.value = false
}
function prepareAdd(type) {
  addForm.type = type
  addDialog.value = false
  addFormDialog.value = true
}
function closeAddForm() {
  addFormDialog.value = false
}
async function confirmCreate() {
  if (!addForm.name || !addForm.price || !addForm.stock) return
  const newId = getNextAvailableIdBoosters()
  await createBoosterWithAutoId({ ...addForm, id: newId })
  addFormDialog.value = false
  await loadProducts()
}

function reload() {
  if (activeTab.value === 'boosters') loadProducts()
  else loadSets()
}

const sets = ref([])
const setHeaders = [
  { title: 'Nombre del Set', value: 'name' },
  { title: 'Código', value: 'code' },
  { title: 'Acciones', value: 'actions', sortable: false }
]

const addSetDialog = ref(false)
const deleteSetDialog = ref(false)
const deletingSet = ref(null)

const addSetForm = reactive({
  name: '',
  code: '',
  type: 'set',
  release_date: '',
  image: '',
  content: {
    cards: null,
    common: null,
    uncommon: null,
    rare: null,
    super_rare: null,
    secret_rare: null,
    alternative_art: null,
    topper: null
  }
})

async function loadSets() {
  const data = await getSets()
  sets.value = data
}

function getNextAvailableIdSets() {
  const ids = sets.value.map(s => Number(s.id)).filter(n => !isNaN(n))
  if (ids.length === 0) return 1
  ids.sort((a, b) => a - b)
  for (let i = 1; i <= ids.length; i++) {
    if (!ids.includes(i)) return i
  }
  return ids[ids.length - 1] + 1
}

function openAddSetDialog() {
  addSetDialog.value = true
}

async function confirmAddSet() {
  const newId = getNextAvailableIdSets()
  const newSet = { ...addSetForm, id: newId }
  await createSet(newSet)
  addSetDialog.value = false
  await loadSets()
}

function openDeleteSetDialog(item) {
  deletingSet.value = item
  deleteSetDialog.value = true
}

async function confirmDeleteSet() {
  if (!deletingSet.value) return
  await deleteSet(Number(deletingSet.value.id))
  deleteSetDialog.value = false
  await loadSets()
}

onMounted(loadSets)
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>