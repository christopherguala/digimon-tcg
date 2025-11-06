import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'


import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/services/firestoreUsers";
import { useUserStore } from "@/stores/user";


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const vuetify = createVuetify({
  components,
  directives,
})

app.use(pinia)
app.use(router)
app.use(vuetify)

const userStore = useUserStore();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const profile = await getUserProfile(user.uid);
    userStore.setUser(user, profile?.username, profile?.isAdmin);
  } else {
    userStore.logout();
  }
});

app.mount('#app')