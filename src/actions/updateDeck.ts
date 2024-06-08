"use server"
import { Deck } from "@/types"
import { prisma } from "@/utils/db.server"
import { revalidatePath } from "next/cache"

export const updateDeck = async (id: Deck["id"], formData: FormData) => {
  const name = formData.get("deckName")

  if (!name) return

  await prisma.deck.update({
    where: { id },
    data: { name: name.toString() },
  })

  revalidatePath("/")
}
