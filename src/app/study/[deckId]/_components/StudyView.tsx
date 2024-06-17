"use client"
import { Flashcard } from "./Flashcard"
import { StudyContainer } from "./StudyContainer"
import { useStudy } from "../useStudy"
import { Completed } from "./Completed"
import { DeckWithFlashcards } from "@/types"
import { EditFlashcardForm } from "./EditFlashcardForm"

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
    isEditing,
    editCard,
  } = useStudy(deck)

  return (
    <StudyContainer
      title={deck.name}
      progress={progress}
      controls={{
        flipCard,
        nextCard,
        deleteCard,
        editCard,
      }}
    >
      {flashcard ? (
        <>
          <Flashcard flashcard={flashcard} cardSide={cardSide} />
          {isEditing && (
            <EditFlashcardForm flashcard={flashcard} editCard={editCard} />
          )}
        </>
      ) : (
        <Completed restart={initialize} />
      )}
    </StudyContainer>
  )
}
