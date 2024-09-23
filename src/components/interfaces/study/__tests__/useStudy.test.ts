import { act, renderHook } from "@testing-library/react";
import { DeckWithFlashcards } from "@/types";
import { useStudy } from "../hooks/useStudy";
import { deleteFlashcard } from "../hooks/useStudy.actions";

jest.mock("../hooks/useStudy.actions");

const testDeck: DeckWithFlashcards = {
  id: "1",
  name: "Test Deck",
  userId: "user-id",
  createdAt: new Date(),
  updatedAt: new Date(),
  flashcards: [
    {
      id: "1",
      deckId: "1",
      front: "Front of card 1",
      back: "Back of card 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      deckId: "1",
      front: "Front of card 2",
      back: "Back of card 2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

describe(useStudy.name, () => {
  it("flips the card", async () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    expect(result.current.cardSide).toBe("front");

    act(() => {
      result.current.flipCard();
    });

    rerender();

    expect(result.current.cardSide).toBe("back");
  });

  it("returns the next card", async () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    act(() => {
      result.current.nextCard();
    });

    rerender();

    expect(result.current.flashcard).toEqual(testDeck.flashcards[1]);
  });

  it("flips the card to the front when the next card is shown", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.cardSide).toBe("back");

    act(() => {
      result.current.nextCard();
    });

    rerender();

    expect(result.current.cardSide).toBe("front");
  });

  it("returns the progress of the study session", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    expect(result.current.progress).toBe(50);

    act(() => {
      result.current.nextCard();
    });

    rerender();

    expect(result.current.progress).toBe(100);
  });

  it("re-initializes the study session - reset the state", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    act(() => {
      result.current.nextCard();
    });

    rerender();

    act(() => {
      result.current.flipCard();
    });

    expect(result.current.flashcard).toEqual(testDeck.flashcards[1]);
    expect(result.current.cardSide).toBe("back");
    expect(result.current.progress).toBe(100);

    act(() => {
      result.current.initialize();
    });

    rerender();

    expect(result.current.cardSide).toBe("front");
    expect(result.current.flashcard).toEqual(testDeck.flashcards[0]);
    expect(result.current.progress).toBe(50);
  });

  it("deletes the current card being shown and show the next card", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    act(() => {
      result.current.deleteCard();
    });

    rerender();

    expect(deleteFlashcard).toHaveBeenCalledWith(testDeck.flashcards[0].id);
    expect(result.current.flashcard).toEqual(testDeck.flashcards[1]);
    expect(result.current.progress).toBe(100);
  });

  it("sets the isEditing state to true", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    act(() => {
      result.current.editCard();
    });

    rerender();

    expect(result.current.isEditing).toBe(true);
  });

  it("edits the current flashcard", () => {
    const { result, rerender } = renderHook(() => useStudy(testDeck));

    expect(result.current.flashcard).toEqual({
      id: "1",
      deckId: "1",
      front: "Front of card 1",
      back: "Back of card 1",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    act(() => {
      result.current.editCard({
        front: "Front of card edited!",
        back: "Back of card 1 edited!",
      });
    });

    rerender();

    expect(result.current.flashcard).toEqual({
      id: "1",
      deckId: "1",
      front: "Front of card edited!",
      back: "Back of card 1 edited!",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(result.current.isEditing).toBe(false);
  });
});
