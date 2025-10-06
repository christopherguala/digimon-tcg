import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC9QxHXl9pr6SGicoVw1viZTsNUWHE_I0M",
  authDomain: "digimon-tcg.firebaseapp.com",
  projectId: "digimon-tcg",
  storageBucket: "digimon-tcg.firebasestorage.app",
  messagingSenderId: "294242448859",
  appId: "1:294242448859:web:2d3d3d74fc3133e412a3fe",
  measurementId: "G-9LW5RPLYVX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const data = JSON.parse(readFileSync("./db.json", "utf8"));

async function uploadCollection(name, items) {
  console.log(`📦 Subiendo colección "${name}"...`);
  let count = 0;
  for (const item of items) {
    await addDoc(collection(db, name), item);
    count++;
  }
  console.log(`✅ ${count} documentos añadidos a "${name}"`);
}

async function run() {
  try {
    const keys = Object.keys(data);
    for (const key of keys) {
      const items = data[key];
      if (Array.isArray(items)) {
        await uploadCollection(key, items);
      } else {
        console.warn(`⚠️ La clave "${key}" no es una lista, se ignora.`);
      }
    }
    console.log("🎉 Subida completa!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al subir datos:", err);
    process.exit(1);
  }
}

run();