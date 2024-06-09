"use server"
import { prisma } from "@/utils/db.server"
import { Deck, Flashcard } from "@prisma/client"

export type DeckWithFlashcards = Deck & {
  flashcards: Flashcard[]
}

export type DeckWithCardCount = Deck & {
  cardCount: number
}

const computeCardCount = (deck: DeckWithFlashcards) => deck.flashcards.length

// TODO don't need to return flashcards[] here
export const getDecks = async (): Promise<DeckWithCardCount[]> => {
  const decksWithFlashcards = await prisma.deck.findMany({
    include: { flashcards: true },
  })
  return decksWithFlashcards.map((deck) => ({
    ...deck,
    cardCount: computeCardCount(deck),
  }))
}

export const getDeckById = async (
  id: string
): Promise<DeckWithFlashcards | null> => {
  return await prisma.deck.findUnique({
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
  const { name } = deck
  await prisma.deck.update({
    where: { id: deck.id },
    data: { name },
  })
}

export const createDeck = async (deckName: string) => {
  await prisma.deck.create({
    data: {
      name: deckName,
    },
  })
}

export const createFlashcard = async ({
  front,
  back,
  deckId,
}: {
  front: string
  back: string
  deckId: string
}) => {
  await prisma.flashcard.create({
    data: {
      front: front,
      back: back,
      deck: {
        connect: { id: deckId },
      },
    },
  })
}
