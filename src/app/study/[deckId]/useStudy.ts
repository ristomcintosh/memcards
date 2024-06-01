import { Deck } from "@/types"
import { useState, useCallback, useMemo } from "react"

// deck will already be randomised
export const useStudy = (deck: Deck) => {
  const flashcardsLocalCopy = useMemo(
    () => [...deck.flashcards],
    [deck.flashcards]
  )
  const [flashcard, setFlashcard] = useState(flashcardsLocalCopy[0])
  const [cardSide, setCardSide] = useState<"front" | "back">("front")

  const flipCard = useCallback(() => {
    setCardSide((side) => (side === "front" ? "back" : "front"))
  }, [])

  const deleteCard = useCallback(() => {}, [])
  const nextCard = useCallback(() => {
    setFlashcard(flashcardsLocalCopy.pop())
  }, [flashcardsLocalCopy])

  const progress =
    ((deck.flashcards.length - flashcardsLocalCopy.length) * 100) /
    deck.flashcards.length

  return {
    progress,
    cardSide,
    flashcard,
    deleteCard,
    flipCard,
    nextCard,
  }
}
