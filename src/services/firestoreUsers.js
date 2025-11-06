

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const createUserProfile = async (uid, username, email) => {
  const ref = doc(db, "usuarios", uid);
  await setDoc(ref, {
    username,
    email,
    isAdmin: false,
    cartas: [],    
    compras: [],    
    imagen: null   
  });
};

export const getUserProfile = async (uid) => {
  const ref = doc(db, "usuarios", uid);
  const snap = await getDoc(ref); 
  if (!snap.exists()) return null;
  return snap.data(); 
};