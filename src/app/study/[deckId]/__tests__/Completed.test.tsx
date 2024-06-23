import { render, screen } from "@testing-library/react"
import { Completed } from "../_components/Completed"

describe(Completed.name, () => {
  it("renders", () => {
    render(<Completed restart={jest.fn()} totalCards={3} />)

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
    render(<Completed restart={jest.fn()} totalCards={0} />)

    expect(screen.queryByText("Restart")).not.toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})
