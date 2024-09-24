"use server";

import { revalidatePath } from "next/cache";
import { updateDeck } from "@/service/database/db-service";
import type { Deck } from "@/types";
import { verifySession } from "@/utils/verifySession";

export const renameDeck = async (id: Deck["id"], deckName: string) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return null;
  }

  await updateDeck({ id, name: deckName });

  revalidatePath("/");
};
