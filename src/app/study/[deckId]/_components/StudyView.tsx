"use client"
import { Deck } from "@/types"
import { Flashcard } from "./Flashcard"
import { StudyContainer } from "./StudyContainer"
import { useStudy } from "../useStudy"

type StudyViewProps = {
  deck: Required<Deck>
}

export const StudyView = ({ deck }: StudyViewProps) => {
  const { flashcard, cardSide, flipCard, nextCard, progress } = useStudy(deck)
  return (
    <StudyContainer
      title={deck.name}
      progress={progress}
      controls={{ flipCard, nextCard }}
    >
      {flashcard && <Flashcard flashcard={flashcard} cardSide={cardSide} />}
    </StudyContainer>
  )
}
