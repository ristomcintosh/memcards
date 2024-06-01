import { decks } from "@/service/dbService"
import { StudyView } from "../_components/StudyView"
import { act, render, screen } from "@testing-library/react"

describe(StudyView.name, () => {
  it("renders", () => {
    render(<StudyView deck={decks[0]} />)

    expect(screen.getByText("Deck 1")).toBeInTheDocument()
    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Flip" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument()
  })

  it("flips the card", () => {
    const frontOfCardText = "What is the capital of France?"
    const backOfCardText = "Paris"
    render(<StudyView deck={decks[0]} />)

    expect(screen.getByText(frontOfCardText)).toBeInTheDocument()
    expect(screen.queryByText(backOfCardText)).not.toBeInTheDocument()

    act(() => screen.getByRole("button", { name: "Flip" }).click())

    expect(screen.getByText(backOfCardText)).toBeInTheDocument()
  })

  it("shows the next card", () => {
    const firstCard = "What is the capital of France?"
    const nextCard = "What is the capital of Portugal?"
    render(<StudyView deck={decks[0]} />)

    expect(screen.getByText(firstCard)).toBeInTheDocument()

    act(() => screen.getByRole("button", { name: "Next" }).click())

    expect(screen.getByText(nextCard)).toBeInTheDocument()
  })
})
