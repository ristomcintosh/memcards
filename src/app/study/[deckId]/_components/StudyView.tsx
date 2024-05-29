import { Deck } from "@/types"
import { Flashcard } from "./Flashcard"
import { StudyContainer } from "./StudyContainer"

type StudyViewProps = {
  deck: Required<Deck>
}

export const StudyView = ({ deck }: StudyViewProps) => {
  return (
    <StudyContainer title={deck.name}>
      <Flashcard flashcard={deck.flashcards[0]} cardSide="front" />
    </StudyContainer>
  )
}
