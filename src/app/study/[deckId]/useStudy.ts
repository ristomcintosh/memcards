import { DeckWithFlashcards } from "@/service/dbService"
import { Flashcard } from "@prisma/client"
import { useState, useCallback, useEffect } from "react"

// deck will already be randomised
export const useStudy = (deck: DeckWithFlashcards) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null)
  const [cardSide, setCardSide] = useState<"front" | "back">("front")

  const flipCard = useCallback(() => {
    setCardSide((side) => (side === "front" ? "back" : "front"))
  }, [])

  const deleteCard = useCallback(() => {}, [])

  const nextCard = useCallback(() => {
    const nextCard = flashcards[0]
    setFlashcards((cards) => cards.slice(1))
    setFlashcard(nextCard)
    setCardSide("front")
  }, [flashcards])

  const initialize = useCallback(() => {
    setFlashcards(deck.flashcards.slice(1))
    setFlashcard(deck.flashcards[0])
    setCardSide("front")
  }, [deck.flashcards])

  const progress =
    ((deck.flashcards.length - flashcards.length) * 100) /
    deck.flashcards.length

  useEffect(() => {
    initialize()
  }, [initialize])

  return {
    progress,
    cardSide,
    flashcard,
    deleteCard,
    initialize,
    flipCard,
    nextCard,
  }
}
