"use server";

import { revalidatePath } from "next/cache";
import { updateFlashcard as updateFlashcardInDb } from "@/service/database/db-service";
import { verifySession } from "@/utils/verifySession";

export const updateFlashcard = async ({
  id,
  front,
  back,
}: {
  id: string;
  front: string;
  back: string;
}) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await updateFlashcardInDb({
    id,
    front: front.toString(),
    back: back.toString(),
  });

  revalidatePath("/");
};
