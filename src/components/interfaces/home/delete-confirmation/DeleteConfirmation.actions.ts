"use server";

import { revalidatePath } from "next/cache";
import { deleteDeck as deleteDeckInDB } from "@/service/database/db-service";
import type { Deck } from "@/types";
import { verifySession } from "@/utils/verifySession";

export const deleteDeck = async (deckId: Deck["id"]) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await deleteDeckInDB(deckId, session.userId);
  revalidatePath("/");
};
