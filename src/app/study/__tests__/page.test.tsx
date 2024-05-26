import { render, screen } from "@testing-library/react"
import { StudyView } from "../StudyView"

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
  it("renders the StudyView component", async () => {
    render(await StudyView())
    expect(screen.getByText("Test Deck")).toBeInTheDocument()
    expect(screen.getByText("Front of card")).toBeInTheDocument()
    expect(screen.getByText("Back of card")).toBeInTheDocument()
  })
})
