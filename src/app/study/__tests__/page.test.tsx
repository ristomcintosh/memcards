import { render, screen } from "@testing-library/react"
import Study from "../page"

const testDeck = {
  id: "deck-id",
  name: "Test Deck",
  cards: [
    {
      id: "card-id",
      front: "Front of card",
      back: "Back of card",
    },
  ],
}

describe("Study Page", () => {
  it("renders", async () => {
    render(<Study />)
    expect(screen.getByText("Test Deck")).toBeInTheDocument()
    expect(screen.getByText("Front of card")).toBeInTheDocument()
    // expect(screen.getByText("Back of card")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Flip" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument()
  })

  it.todo("flips the card")
})
