"use server"
import { Deck } from "@/types"
import { prisma } from "@/utils/db.server"
import { revalidatePath } from "next/cache"

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

  revalidatePath("/")
}

export const updateDeck = async (id: string, name: string) => {
  console.log("updateDeck")
}
