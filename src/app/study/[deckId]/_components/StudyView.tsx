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
    isEditing,
    setIsEditing,
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
        editCard: () => setIsEditing(true),
      }}
    >
      {flashcard ? (
        <>
          <Flashcard flashcard={flashcard} cardSide={cardSide} />
          <EditFlashcardForm
            flashcard={flashcard}
            editCard={editCard}
            isOpen={isEditing}
            setOpen={setIsEditing}
          />
        </>
      ) : (
        <Completed restart={initialize} />
      )}
    </StudyContainer>
  )
}
