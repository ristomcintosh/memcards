"use server";

import { revalidatePath } from "next/cache";
import { deleteFlashcard as deleteFlashcardInDB } from "@/service/database/db-service";
import { verifySession } from "@/utils/verifySession";

export const deleteFlashcard = async (id: string) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await deleteFlashcardInDB(id);
  revalidatePath("/");
};
