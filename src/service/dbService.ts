"use server"
import { Deck, DeckWithCardCount, DeckWithFlashcards } from "@/types"
import { prisma } from "@/utils/db.server"

const computeCardCount = (deck: DeckWithFlashcards) => deck.flashcards.length

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

export const deleteFlashcard = async (id: string) => {
  await prisma.flashcard.delete({
    where: { id },
  })
}

export const updateFlashcard = async ({
  id,
  front,
  back,
}: {
  id: string
  front: string
  back: string
}) => {
  await prisma.flashcard.update({
    where: { id },
    data: { front, back },
  })
}
