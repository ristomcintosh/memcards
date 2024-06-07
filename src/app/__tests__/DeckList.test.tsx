import { act, render, screen } from "@testing-library/react"
import { DeckList } from "../_components/DeckList"
import { deleteDeck } from "@/service/dbService"

jest.mock("@/service/dbService")

describe(DeckList.name, () => {
  const testDeckList = [
    {
      id: "some-id",
      name: "Deck 1",
      cardCount: 3,
    },
  ]

  it("renders", () => {
    render(<DeckList decks={testDeckList} />)

    expect(screen.getByText("Deck 1")).toBeInTheDocument()
    expect(screen.getByLabelText("card count 3")).toBeInTheDocument()
  })

  it("calls deleteDeck when the delete button is clicked", () => {
    render(<DeckList decks={testDeckList} />)

    act(() => {
      screen.getByLabelText("Deck menu").click()
    })

    act(() => {
      screen.getByText("Delete").click()
    })

    expect(deleteDeck).toHaveBeenCalledWith("some-id")
  })

  it.todo("shows the delete confirmation dialog")

  it("Show the rename dialog", () => {
    render(<DeckList decks={testDeckList} />)

    act(() => {
      screen.getByLabelText("Deck menu").click()
    })

    act(() => {
      screen.getByText("Rename").click()
    })

    expect(screen.getByText("Rename Deck")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })
})
