
import {
  collection,
  doc,
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
      firestoreId: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => a.id - b.id);
};

export const getBoosterById = async (id) => {
  const q = query(collection(db, "boosters"), where("id", "==", Number(id)));
  const snapshot = await getDocs(q);
  if (snapshot.empty) throw new Error("Booster no encontrado");
  const docSnap = snapshot.docs[0];
  return { firestoreId: docSnap.id, ...docSnap.data() };
};

export const createBooster = async (newBooster) => {
  const ref = await addDoc(collection(db, "boosters"), newBooster);
  return ref.id;
};

export const updateBooster = async (boosterId, updatedFields) => {
  const boostersRef = collection(db, "boosters");
  const q = query(boostersRef, where("id", "==", boosterId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error(`❌ No se encontró booster con id interno: ${boosterId}`);
    return;
  }

  const boosterDoc = querySnapshot.docs[0];
  await updateDoc(boosterDoc.ref, updatedFields);
  console.log(`✅ Booster ${boosterId} actualizado correctamente.`);
};

export const deleteBooster = async (boosterId) => {
  const boostersRef = collection(db, "boosters");
  const q = query(boostersRef, where("id", "==", boosterId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error(`❌ No se encontró booster con id interno: ${boosterId}`);
    return;
  }

  const boosterDoc = querySnapshot.docs[0];
  await deleteDoc(boosterDoc.ref);
  console.log(`🗑️ Booster ${boosterId} eliminado.`);
};

export const getNextBoosterId = async () => {
  const boosters = await getBoosters();
  if (boosters.length === 0) return 1;
  const maxId = Math.max(...boosters.map((b) => b.id || 0));
  return maxId + 1;
};

export const getSetByCode = async (code) => {
  try {
    const q = query(collection(db, "sets"), where("code", "==", code));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn(`⚠️ No se encontró set con código: ${code}`);
      return [];
    }
    return snapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("❌ Error al obtener set por código:", err);
    return [];
  }
};

export const getSets = async () => {
  const snapshot = await getDocs(collection(db, "sets"));
  return snapshot.docs
    .map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => a.id - b.id);
};

export const createSet = async (newSet) => {
  const nextId = await getNextSetId();
  const ref = await addDoc(collection(db, "sets"), { ...newSet, id: nextId });
  return ref.id;
};

export const deleteSet = async (setId) => {
  const setsRef = collection(db, "sets");
  const q = query(setsRef, where("id", "==", setId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.error(`❌ No se encontró set con id interno: ${setId}`);
    return;
  }

  const setDoc = querySnapshot.docs[0];
  await deleteDoc(setDoc.ref);
  console.log(`🗑️ Set ${setId} eliminado.`);
};

export const getNextSetId = async () => {
  const sets = await getSets();
  if (sets.length === 0) return 1;
  const ids = sets.map((s) => s.id).filter((id) => typeof id === "number");
  ids.sort((a, b) => a - b);
  for (let i = 1; i <= ids.length; i++) {
    if (!ids.includes(i)) return i;
  }
  return ids[ids.length - 1] + 1;
};