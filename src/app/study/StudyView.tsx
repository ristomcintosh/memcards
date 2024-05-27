import { Deck } from "@/types"
import { Flashcard } from "./Flashcard"

export const StudyView = async () => {
  const deck = await getDeck()
  return (
    <section className="flex items-center justify-center flex-1">
      <Flashcard flashcard={deck.flashcards[0]} cardSide="front" />
    </section>
  )
}

async function getDeck(): Promise<Deck> {
  return {
    id: "deck-id",
    name: "Deck Name",
    cardCount: 1,
    flashcards: [
      {
        id: "card-id",
        front: "Front of the card",
        back: "Back of the card",
      },
    ],
  }
}
