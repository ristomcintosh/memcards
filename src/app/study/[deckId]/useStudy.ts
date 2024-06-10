import { deleteFlashcard } from "@/actions/actions"
import { DeckWithFlashcards, Flashcard } from "@/types"
import { useState, useCallback, useEffect } from "react"

// deck will already be randomised
export const useStudy = (deck: DeckWithFlashcards) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null)
  const [cardSide, setCardSide] = useState<"front" | "back">("front")
  const [isEditing, setIsEditing] = useState(false)

  const flipCard = useCallback(() => {
    setCardSide((side) => (side === "front" ? "back" : "front"))
  }, [])

  const nextCard = useCallback(() => {
    const nextCard = flashcards[0]
    setFlashcards((cards) => cards.slice(1))
    setFlashcard(nextCard)
    setCardSide("front")
  }, [flashcards])

  const deleteCard = useCallback(() => {
    if (!flashcard) return
    deleteFlashcard(flashcard?.id)
    nextCard()
  }, [flashcard, nextCard])

  const initialize = useCallback(() => {
    setFlashcards(deck.flashcards.slice(1))
    setFlashcard(deck.flashcards[0])
    setCardSide("front")
  }, [deck.flashcards])

  const editCard = useCallback(() => {}, [])

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
    editCard,
    isEditing,
    setIsEditing,
  }
}
