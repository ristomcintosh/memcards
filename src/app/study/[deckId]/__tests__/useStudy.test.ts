import { act, renderHook } from "@testing-library/react"
import { useStudy } from "../useStudy"
import { DeckWithFlashcards } from "@/types"
import { deleteFlashcard } from "@/actions/actions"

jest.mock("@/actions/actions")

const testDeck: DeckWithFlashcards = {
  id: "1",
  name: "Test Deck",
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

  it("flips the card to the front when the next card is shown", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck))

    act(() => {
      result.current.flipCard()
    })

    expect(result.current.cardSide).toBe("back")

    act(() => {
      result.current.nextCard()
    })

    rerender()

    expect(result.current.cardSide).toBe("front")
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

  it("deletes the current card being shown and show the next card", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck))

    act(() => {
      result.current.deleteCard()
    })

    rerender()

    expect(deleteFlashcard).toHaveBeenCalledWith(testDeck.flashcards[0].id)
    expect(result.current.flashcard).toEqual(testDeck.flashcards[1])
  })

  it("edits the current card being shown", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck))

    act(() => {
      result.current.editCard({
        front: "Front of card edited!",
        back: "Back of card 1 edited!",
      })
    })

    rerender()

    expect(result.current.flashcard).toEqual({
      id: "1",
      deckId: "1",
      front: "Front of card edited!",
      back: "Back of card 1 edited!",
    })
  })
})
