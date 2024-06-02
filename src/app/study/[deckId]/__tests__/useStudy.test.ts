import { act, renderHook } from "@testing-library/react"
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

    expect(
      result.current.flashcard && Object.keys(result.current.flashcard)
    ).toEqual(Object.keys(testDeck.flashcards[0]))
    expect(result.current.cardSide).toBeDefined()
    expect(result.current.flipCard).toBeDefined()
  })

  it("flips the card", async () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck))

    expect(result.current.cardSide).toBe("front")

    act(() => {
      result.current.flipCard()
    })

    rerender()

    expect(result.current.cardSide).toBe("back")
  })

  it("returns the next card", async () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck))

    act(() => {
      result.current.nextCard()
    })

    rerender()

    expect(result.current.flashcard).toEqual(testDeck.flashcards[1])
  })

  it("returns the progress of the study session", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck))

    expect(result.current.progress).toBe(50)

    act(() => {
      result.current.nextCard()
    })

    rerender()

    expect(result.current.progress).toBe(100)
  })

  it("re-initializes the study session - reset the state", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck))

    act(() => {
      result.current.nextCard()
    })

    rerender()

    act(() => {
      result.current.flipCard()
    })

    expect(result.current.flashcard).toEqual(testDeck.flashcards[1])
    expect(result.current.cardSide).toBe("back")
    expect(result.current.progress).toBe(100)

    act(() => {
      result.current.initialize()
    })

    rerender()

    expect(result.current.cardSide).toBe("front")
    expect(result.current.flashcard).toEqual(testDeck.flashcards[0])
    expect(result.current.progress).toBe(50)
  })
})
