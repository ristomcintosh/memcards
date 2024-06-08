"use server"
import { Deck } from "@/types"
import { prisma } from "@/utils/db.server"

export const getDecks = async () => {
  return prisma.deck.findMany()
}

export const getDeckById = async (id: string): Promise<Deck | null> => {
  return prisma.deck.findUnique({
    where: { id },
    include: { flashcards: true },
  })
}

export const deleteDeck = async (id: string) => {
  await prisma.deck.delete({
    where: { id },
    include: { flashcards: true },
  })
}

export const updateDeck = async (deck: Partial<Deck>) => {
  const { name, cardCount } = deck
  await prisma.deck.update({
    where: { id: deck.id },
    data: { name, cardCount },
  })
}

export const createDeck = async (deckName: string) => {
  await prisma.deck.create({
    data: {
      name: deckName,
    },
  })
}
