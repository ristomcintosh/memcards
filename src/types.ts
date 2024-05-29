export type Deck = {
  id: string
  name: string
  cardCount: number
  flashcards: Flashcard[]
}

export type Flashcard = {
  id?: string
  deckId?: string
  front: string
  back: string
  image?: FlashcardImage
}

export type FlashcardImage = {
  src: string
  alt: string
  thumb: any
}

export type FlashcardFormInputs = {
  deckName: string
  front: string
  back: string
}
