import { getDecks } from "@/service/database/db-service";
import type { DeckWithCardCount } from "@/types";
import { verifySession } from "./verifySession";

export const getAllDecks = async (): Promise<DeckWithCardCount[]> => {
  const session = await verifySession();
  if (!session.isAuth) {
    return [];
  }

  const user = await getDecks(session.userId);

  if (!user) return [];

  return user.decks.map((deck) => ({
    ...deck,
    cardCount: deck._count.flashcards,
  }));
};
