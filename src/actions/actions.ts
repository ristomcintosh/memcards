"use server";

import { revalidatePath } from "next/cache";
import * as DBService from "@/service/database/db-service";
import { Deck, Flashcard } from "@/types";
import { verifySession } from "@/utils/verifySession";

export const updateDeck = async (id: Deck["id"], deckName: string) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return null;
  }

  await DBService.updateDeck({ id, name: deckName });

  revalidatePath("/");
};

export const deleteDeck = async (deckId: Deck["id"]) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await DBService.deleteDeck(deckId, session.userId);
  revalidatePath("/");
};

export const createDeck = async (deckName: string) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await DBService.createDeck(deckName, session.userId);

  revalidatePath("/");
};

export const createFlashcard = async (
  newFlashcard: Pick<Flashcard, "deckId" | "back" | "front">,
) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await DBService.createFlashcard(newFlashcard);
  revalidatePath("/");
};

export const deleteFlashcard = async (id: string) => {
  const session = await verifySession();
  if (!session.isAuth) {
    return;
  }

  await DBService.deleteFlashcard(id);
  revalidatePath("/");
};

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

  await DBService.updateFlashcard({
    id,
    front: front.toString(),
    back: back.toString(),
  });

  revalidatePath("/");
};
