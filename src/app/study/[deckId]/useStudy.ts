import { Deck } from "@/types"
import { useState, useCallback } from "react"

export const useStudy = (deck: Deck) => {
  const [flashcard, setFlashcard] = useState(deck.flashcards[0])

  const flipCard = useCallback(() => {
    setFlashcard((prevFlashcard) => ({
      ...prevFlashcard,
      isShowingFrontOfCard: !prevFlashcard.isShowingFrontOfCard,
    }))
  }, [setFlashcard, flashcard])

  const deleteCard = useCallback(() => {}, [])
  const nextCard = useCallback(() => {}, [])

  return {
    flashcard,
    deleteCard,
    flipCard,
    nextCard,
  }
}
