"use server";

import { revalidatePath } from "next/cache";
import { createDeck as createDeckInDB } from "@/service/database/db-service";
import { verifySession } from "@/utils/verifySession";

export const createDeck = async (deckName: string) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await createDeckInDB(deckName, session.userId);

  revalidatePath("/");
};
