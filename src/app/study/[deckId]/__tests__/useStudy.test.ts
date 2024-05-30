import { renderHook } from "@testing-library/react"
import { useStudy } from "../useStudy"
import { Deck } from "@/types"

const testDeck: Deck = {
  id: "1",
  name: "Test Deck",
  cardCount: 2,
  flashcards: [
    {
      id: "1",
      deckId: "1",
      front: "Front of card 1",
      back: "Back of card 1",
    },
    {
      id: "2",
      deckId: "1",
      front: "Front of card 2",
      back: "Back of card 2",
    },
  ],
}

describe(useStudy.name, () => {
  it("returns an object", () => {
    const { result } = renderHook(() => useStudy(testDeck))

    expect(Object.keys(result.current.flashcard)).toEqual(
      expect.arrayContaining([
        ...Object.keys(testDeck.flashcards[0]),
        "isShowingFrontOfCard",
      ])
    )
    expect(result.current.flipCard).toBeDefined()
  })

  it("flips the card", () => {
    const { result } = renderHook(() => useStudy(testDeck))

    expect(result.current.flashcard.isShowingFrontOfCard).toBe(true)

    result.current.flipCard()

    expect(result.current.flashcard.isShowingFrontOfCard).toBe(false)
  })
})
