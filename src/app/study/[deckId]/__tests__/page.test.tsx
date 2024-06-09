import { render, screen } from "@testing-library/react"
import Study from "../page"
import { DeckWithFlashcards, getDeckById } from "@/service/dbService"

const testDeck: DeckWithFlashcards = {
  id: "deck-id",
  name: "Test Deck",
  flashcards: [
    {
      id: "card-id",
      front: "Front of card",
      back: "Back of card",
      deckId: "deck-id",
    },
  ],
}

jest.mock("@/service/dbService")

describe("Study Page", () => {
  it("renders", async () => {
    jest.mocked(getDeckById).mockResolvedValue(testDeck)
    render(await Study({ params: { deckId: "deck-id" } }))
    expect(screen.getByText("Test Deck")).toBeInTheDocument()
    expect(screen.getByText("Front of card")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Flip" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument()
  })
})
