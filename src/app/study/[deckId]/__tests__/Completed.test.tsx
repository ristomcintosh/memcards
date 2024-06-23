import { render, screen } from "@testing-library/react"
import { Completed } from "../_components/Completed"
import { decks } from "@/tests/testData"

describe(Completed.name, () => {
  it("renders", () => {
    render(<Completed restart={jest.fn()} deck={decks[0]} />)

    expect(screen.getByText("Congratulations! 🎉")).toBeInTheDocument()
    expect(
      screen.getByText(
        "You have successfully completed all the flashcards in this deck."
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Restart")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
  })

  it("does not show the restart button when there are no cards left in deck", () => {
    const deckWithNoCards = { ...decks[0], flashcards: [] }
    render(<Completed restart={jest.fn()} deck={deckWithNoCards} />)

    expect(screen.queryByText("Restart")).not.toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})
