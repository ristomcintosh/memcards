import { render, screen } from "@testing-library/react";
import { getDeckById } from "@/actions/actions";
import { DeckWithFlashcards } from "@/types";
import Study from "./page";

const testDeck: DeckWithFlashcards = {
  id: "deck-id",
  userId: "user-id",
  name: "Test Deck",
  createdAt: new Date(),
  updatedAt: new Date(),
  flashcards: [
    {
      id: "card-id",
      front: "Front of card",
      back: "Back of card",
      deckId: "deck-id",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

jest.mock("@/actions/actions");

describe("Study Page", () => {
  it("renders", async () => {
    jest.mocked(getDeckById).mockResolvedValue(testDeck);
    render(await Study({ params: { deckId: "deck-id" } }));
    expect(screen.getByText("Test Deck")).toBeInTheDocument();
    expect(screen.getByText("Front of card")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Flip" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });
});
