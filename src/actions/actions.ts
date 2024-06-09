"use server"
import { revalidatePath } from "next/cache"
import * as DBService from "@/service/dbService"
import { Deck } from "@/types"

export const updateDeck = async (id: Deck["id"], formData: FormData) => {
  const name = formData.get("deckName")

  if (!name) return

  await DBService.updateDeck({ id, name: name.toString() })

  revalidatePath("/")
}

export const deleteDeck = async (id: Deck["id"]) => {
  await DBService.deleteDeck(id)
  revalidatePath("/")
}

export const createDeck = async (formData: FormData) => {
  const name = formData.get("deckName")

  if (!name) return

  await DBService.createDeck(name.toString())

  revalidatePath("/")
}

export const createFlashcard = async (formData: FormData) => {
  const front = formData.get("front")
  const back = formData.get("back")
  const deckId = formData.get("deckId")

  if (!front || !back || !deckId) return

  await DBService.createFlashcard({
    front: front.toString(),
    back: back.toString(),
    deckId: deckId.toString(),
  })

  revalidatePath("/")
}

export const deleteFlashcard = async (id: string) => {
  await DBService.deleteFlashcard(id)
  revalidatePath("/")
}
