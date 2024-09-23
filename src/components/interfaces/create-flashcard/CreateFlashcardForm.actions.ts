"use server";

import { revalidatePath } from "next/cache";
import { createFlashcard as createFlashcardInDb } from "@/service/database/db-service";
import { Flashcard } from "@/types";
import { verifySession } from "@/utils/verifySession";

export const createFlashcard = async (
  newFlashcard: Pick<Flashcard, "deckId" | "back" | "front">,
) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await createFlashcardInDb(newFlashcard);
  revalidatePath("/");
};
