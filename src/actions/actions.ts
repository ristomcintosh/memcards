"use server"
import { revalidatePath } from "next/cache"
import * as DBService from "@/service/dbService"
import { Deck, Flashcard } from "@/types"

export const updateDeck = async (id: Deck["id"], deckName: string) => {
  await DBService.updateDeck({ id, name: deckName })

  revalidatePath("/")
}

export const deleteDeck = async (id: Deck["id"]) => {
  await DBService.deleteDeck(id)
  revalidatePath("/")
}

export const createDeck = async (deckName: string) => {
  await DBService.createDeck(deckName)

  revalidatePath("/")
}

export const createFlashcard = async (
  newFlashcard: Pick<Flashcard, "deckId" | "back" | "front">
) => {
  await DBService.createFlashcard(newFlashcard)
  revalidatePath("/")
}

export const deleteFlashcard = async (id: string) => {
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
  await DBService.updateFlashcard({
    id,
    front: front.toString(),
    back: back.toString(),
  })

  revalidatePath("/")
}
