import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC9QxHXl9pr6SGicoVw1viZTsNUWHE_I0M",
  authDomain: "digimon-tcg.firebaseapp.com",
  projectId: "digimon-tcg",
  storageBucket: "digimon-tcg.firebasestorage.app",
  messagingSenderId: "294242448859",
  appId: "1:294242448859:web:2d3d3d74fc3133e412a3fe",
  measurementId: "G-9LW5RPLYVX"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {

  }
}

export { app, db, auth, storage, analytics };