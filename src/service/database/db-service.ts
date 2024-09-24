"use server";

import "server-only";
import type { Deck, DeckWithFlashcards } from "@/types";
import { prisma } from "./db-server";

export const getDecks = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      decks: {
        include: {
          _count: {
            select: {
              flashcards: true,
            },
          },
        },
      },
    },
  });
};

export const getDeckById = async (
  deckId: string,
  userId: string,
): Promise<DeckWithFlashcards | null> => {
  return await prisma.deck.findUnique({
    where: { id: deckId, userId },
    include: { flashcards: true },
  });
};

export const deleteDeck = async (deckId: string, userId: string) => {
  await prisma.deck.delete({
    where: { id: deckId, userId },
    include: { flashcards: true },
  });
};

export const updateDeck = async (deck: Partial<Deck>) => {
  const { name } = deck;
  await prisma.deck.update({
    where: { id: deck.id },
    data: { name },
  });
};

export const createDeck = async (deckName: string, userId: string) => {
  return await prisma.deck.create({
    data: {
      name: deckName,
      userId: userId,
    },
  });
};

export const createFlashcard = async ({
  front,
  back,
  deckId,
}: {
  front: string;
  back: string;
  deckId: string;
}) => {
  await prisma.flashcard.create({
    data: {
      front: front,
      back: back,
      deck: {
        connect: { id: deckId },
      },
    },
  });
};

export const deleteFlashcard = async (id: string) => {
  await prisma.flashcard.delete({
    where: { id },
  });
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
  await prisma.flashcard.update({
    where: { id },
    data: { front, back },
  });
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
};

export const getUserByUsernameOrEmail = async (username: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email: username }],
    },
  });
};

export const copyTutorialDeckToUser = async (userId: string) => {
  const tutorialDeck = await prisma.sharedDeck.findFirst({
    include: {
      flashcards: {
        select: { front: true, back: true },
      },
    },
  });

  if (!tutorialDeck) return;

  await prisma.deck.create({
    data: {
      name: tutorialDeck.name,
      userId,
      flashcards: {
        create: tutorialDeck.flashcards,
      },
    },
  });
};
