import { render, screen } from "@testing-library/react";
import type { DeckWithFlashcards } from "@/types";
import { Completed } from "../Completed";

const deck = {
  id: "1",
  name: "Deck 1",
  userId: "user-id",
  flashcards: [
    {
      id: "some-id",
      deckId: "some-id",
      front: "front",
      back: "back",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
} satisfies DeckWithFlashcards;

describe(Completed.name, () => {
  it("renders", () => {
    render(<Completed restart={jest.fn()} deck={deck} />);

    expect(screen.getByText("Congratulations! 🎉")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You have successfully completed all the flashcards in this deck.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Restart")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("does not show the restart button when there are no cards left in deck", () => {
    const deckWithNoCards = { ...deck, flashcards: [] };
    render(<Completed restart={jest.fn()} deck={deckWithNoCards} />);

    expect(screen.queryByText("Restart")).not.toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
