import { Deck, Flashcard } from "@prisma/client"
export type { Deck, Flashcard }

export type DeckWithFlashcards = Deck & {
  flashcards: Flashcard[]
}

export type DeckWithCardCount = Deck & {
  cardCount: number
}
