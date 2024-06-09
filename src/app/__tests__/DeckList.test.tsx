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

  it("shows the delete confirmation dialog and calls deleteDeck when 'Yes' is clicked", () => {
    render(<DeckList decks={testDeckList} />)

    act(() => {
      screen.getByLabelText("Deck Options").click()
    })

    act(() => {
      screen.getByText("Delete").click()
    })

    expect(
      screen.getByText("Are you sure you want to delete Deck 1?")
    ).toBeInTheDocument()

    screen.getByRole("button", { name: "Yes" }).click()
    expect(deleteDeck).toHaveBeenCalledWith("some-id")
  })

  it("Show the rename dialog", () => {
    render(<DeckList decks={testDeckList} />)

    act(() => {
      screen.getByLabelText("Deck Options").click()
    })

    act(() => {
      screen.getByText("Rename").click()
    })

    expect(screen.getByText("Rename: Deck 1")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
  })
})
