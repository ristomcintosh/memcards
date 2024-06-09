"use client"
import { Flashcard } from "./Flashcard"
import { StudyContainer } from "./StudyContainer"
import { useStudy } from "../useStudy"
import { Completed } from "./Completed"
import { DeckWithFlashcards } from "@/types"

type StudyViewProps = {
  deck: Required<DeckWithFlashcards>
}

// TODO fix bug where the progress (starts on the first card) is reset when deleting a card
// TODO fix progress bar jumps forward and back when deleting a card

export const StudyView = ({ deck }: StudyViewProps) => {
  const {
    flashcard,
    cardSide,
    flipCard,
    nextCard,
    progress,
    initialize,
    deleteCard,
  } = useStudy(deck)
  return (
    <StudyContainer
      title={deck.name}
      progress={progress}
      controls={{ flipCard, nextCard, deleteCard }}
    >
      {flashcard ? (
        <Flashcard flashcard={flashcard} cardSide={cardSide} />
      ) : (
        <Completed restart={initialize} />
      )}
    </StudyContainer>
  )
}
