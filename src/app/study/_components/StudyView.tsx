import { Deck } from "@/types"
import { Flashcard } from "./Flashcard"

export const StudyView = () => {
  const deck = getDeck()
  return (
    <section className="flex items-center justify-center flex-1">
      <Flashcard flashcard={deck.flashcards[0]} cardSide="front" />
    </section>
  )
}

function getDeck(): Deck {
  return {
    id: "deck-id",
    name: "Test Deck",
    cardCount: 1,
    flashcards: [
      {
        id: "card-id",
        front: "Front of card",
        back: "Back of card",
      },
    ],
  }
}
