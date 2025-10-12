
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";


export const getBoosters = async () => {
  const snapshot = await getDocs(collection(db, "boosters"));
  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => a.id - b.id);
};


export const getBoosterById = async (id) => {
  const q = query(collection(db, "boosters"), where("id", "==", Number(id)));
  const snapshot = await getDocs(q);
  if (snapshot.empty) throw new Error("Booster no encontrado");
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};


export const createBooster = async (newBooster) => {
  const ref = await addDoc(collection(db, "boosters"), newBooster);
  return ref.id;
};


export const updateBooster = async (boosterId, newStock) => {
  try {
    const boostersRef = collection(db, "boosters");
    const q = query(boostersRef, where("id", "==", boosterId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`❌ No se encontró booster con id interno: ${boosterId}`);
      return;
    }

    const boosterDoc = querySnapshot.docs[0];
    await updateDoc(boosterDoc.ref, { stock: newStock });

    console.log(`✅ Stock del booster ${boosterId} actualizado correctamente a ${newStock}`);
  } catch (error) {
    console.error("❌ Error al actualizar booster:", error);
  }
};


export const deleteBooster = async (id) => {
  const ref = doc(db, "boosters", id);
  await deleteDoc(ref);
};


export const getSets = async () => {
  const snapshot = await getDocs(collection(db, "sets"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const getSetByCode = async (code) => {
  const q = query(collection(db, "sets"), where("code", "==", code));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};