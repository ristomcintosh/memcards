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
