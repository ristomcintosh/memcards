"use client"
import { Flashcard } from "./Flashcard"
import { StudyContainer } from "./StudyContainer"
import { useStudy } from "../useStudy"
import { Completed } from "./Completed"
import { DeckWithFlashcards } from "@/types"

type StudyViewProps = {
  deck: Required<DeckWithFlashcards>
}

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
