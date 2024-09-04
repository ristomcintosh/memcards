import { DeckWithFlashcards } from "@/types"
import { Flashcard } from "@/types"

export const flashcards: Flashcard[] = [
  {
    id: "some-id",
    deckId: "some-id",
    front: "What is the capital of France?",
    back: "Paris",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "some-id-2",
    deckId: "some-id-2",
    front: "What is the capital of Portugal?",
    back: "Lisbon",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "some-id-3",
    deckId: "some-id",
    front: "What is the capital of Germany?",
    back: "Berlin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "some-id-4",
    deckId: "some-id",
    front: "What is the capital of Italy?",
    back: "Rome",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const decks: DeckWithFlashcards[] = [
  {
    id: "1",
    name: "Deck 1",
    userId: "user-id",
    flashcards,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "user-id",
    name: "Deck 2",
    flashcards,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
