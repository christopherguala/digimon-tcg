

import { db } from '@/lib/firebase'
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'

export async function getCardsBySet(setName) {
  const querySnapshot = await getDocs(collection(db, setName))
  const cards = querySnapshot.docs.map(doc => ({
    id: doc.data().id,
    ...doc.data()
  }))
  return cards.sort((a, b) => a.id.localeCompare(b.id))
}

export async function getAllCards() {
  const sets = ['BT1'] 
  const allCards = []

  for (const set of sets) {
    const cards = await getCardsBySet(set)
    allCards.push(...cards)
  }
  return allCards.sort((a, b) => a.id.localeCompare(b.id))
}

export async function getUserCards(uid) {
  const userRef = doc(db, 'usuarios', uid)
  const userSnap = await getDoc(userRef)
  if (userSnap.exists()) {
    return userSnap.data().cartas || []
  }
  return []
}

export async function toggleUserCard(uid, cardId) {
  const userRef = doc(db, 'usuarios', uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) return

  const data = userSnap.data()
  const userCards = data.cartas || []

  let newCards
  if (userCards.includes(cardId)) {
    newCards = userCards.filter(id => id !== cardId)
  } else {
    newCards = [...userCards, cardId]
  }

  await updateDoc(userRef, { cartas: newCards })
  return newCards
}