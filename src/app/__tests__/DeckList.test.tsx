import { render, screen } from "@testing-library/react"
import { DeckList } from "../_components/DeckList"

describe(DeckList.name, () => {
  it("renders", async () => {
    render(await DeckList())
    expect(screen.getByText("Deck 1")).toBeInTheDocument()
    expect(screen.getAllByTestId("deck-card-count")[0]).toHaveTextContent("3")
  })
})
