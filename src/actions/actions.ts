"use server"
import { Deck } from "@/types"
import { revalidatePath } from "next/cache"
import * as DBService from "@/service/dbService"

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
