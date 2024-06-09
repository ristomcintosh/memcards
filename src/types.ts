import { Deck, Flashcard, Image } from "@prisma/client"
export type { Deck, Flashcard, Image }

export type DeckWithFlashcards = Deck & {
  flashcards: Flashcard[]
}

export type DeckWithCardCount = Deck & {
  cardCount: number
}
