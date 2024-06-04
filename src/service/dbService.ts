import { decks } from "@/tests/testData"

export const getDecks = async () => {
  return decks
}

export const getDeckById = async (id: string) => {
  return decks.find((deck) => deck.id === id)
}
