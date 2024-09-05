import { render, screen } from "@testing-library/react"
import { DeckList } from "../DeckList"
import { deleteDeck } from "@/actions/actions"
import userEvent from "@testing-library/user-event"
import { DeckWithCardCount } from "@/types"

jest.mock("@/actions/actions")

describe(DeckList.name, () => {
  const testDeckList: DeckWithCardCount[] = [
    {
      id: "some-id",
      userId: "user-id",
      name: "Deck 1",
      cardCount: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  it("renders", () => {
    render(<DeckList decks={testDeckList} />)

    expect(screen.getByText("Deck 1")).toBeInTheDocument()
    expect(screen.getByLabelText("card count 3")).toBeInTheDocument()
  })

  it("shows the delete confirmation dialog and calls deleteDeck when 'Yes' is clicked", async () => {
    const user = userEvent.setup()
    render(<DeckList decks={testDeckList} />)

    const deckOptions = screen.getByLabelText("Deck Options")
    await user.click(deckOptions)

    const deleteButton = await screen.findByText("Delete")
    await user.click(deleteButton)

    expect(screen.getByTestId("delete-confirmation-title")).toHaveTextContent(
      "Are you sure you want to delete Deck 1?"
    )

    await user.click(screen.getByRole("button", { name: "Yes" }))
    expect(deleteDeck).toHaveBeenCalledWith("some-id")
  })

  it("Show the rename dialog", async () => {
    const user = userEvent.setup()
    render(<DeckList decks={testDeckList} />)

    const deckOptions = screen.getByLabelText("Deck Options")
    await user.click(deckOptions)

    await user.click(screen.getByText("Rename"))

    expect(screen.getByText("Rename: Deck 1")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
  })
})
