"use server"
import { revalidatePath } from "next/cache"
import * as DBService from "@/service/dbService"
import { Deck, DeckWithCardCount, Flashcard } from "@/types"
import { verifySession } from "@/utils/verifySession"

export const getDecks = async (): Promise<DeckWithCardCount[]> => {
  const session = await verifySession()
  if (!session.isAuth) {
    return []
  }

  const user = await DBService.getDecks(session.userId)

  if (!user) return []

  if (!user.hasBeenOnboarded) {
    console.log("User has not been onboarded")
  }

  return user.decks.map((deck) => ({
    ...deck,
    cardCount: deck._count.flashcards,
  }))
}

export const getDeckById = async (deckId: Deck["id"]) => {
  const session = await verifySession()
  if (!session.isAuth) {
    return null
  }

  return DBService.getDeckById(deckId, session.userId)
}

export const updateDeck = async (id: Deck["id"], deckName: string) => {
  const session = await verifySession()
  if (!session.isAuth) {
    return null
  }

  await DBService.updateDeck({ id, name: deckName })

  revalidatePath("/")
}

export const deleteDeck = async (deckId: Deck["id"]) => {
  const session = await verifySession()
  if (!session.isAuth) {
    return
  }

  await DBService.deleteDeck(deckId, session.userId)
  revalidatePath("/")
}

export const createDeck = async (deckName: string) => {
  const session = await verifySession()
  if (!session.isAuth) {
    return
  }

  await DBService.createDeck(deckName, session.userId)

  revalidatePath("/")
}

export const createFlashcard = async (
  newFlashcard: Pick<Flashcard, "deckId" | "back" | "front">
) => {
  const session = await verifySession()
  if (!session.isAuth) {
    return
  }

  await DBService.createFlashcard(newFlashcard)
  revalidatePath("/")
}

export const deleteFlashcard = async (id: string) => {
  const session = await verifySession()
  if (!session.isAuth) {
    return
  }

  await DBService.deleteFlashcard(id)
  revalidatePath("/")
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
  const session = await verifySession()
  if (!session.isAuth) {
    return
  }

  await DBService.updateFlashcard({
    id,
    front: front.toString(),
    back: back.toString(),
  })

  revalidatePath("/")
}
