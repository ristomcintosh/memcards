import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateFlashcard from "../page"
import { getDecks } from "@/service/dbService"

jest.mock("@/service/dbService")

describe(CreateFlashcard.name, () => {
  it("renders", () => {
    render(<CreateFlashcard />)

    expect(screen.getByLabelText("Front")).toBeInTheDocument()
    expect(screen.getByLabelText("Back")).toBeInTheDocument()
    expect(screen.getByLabelText("Deck")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument()
  })

  it("submits the form", async () => {
    jest
      .mocked(getDecks)
      .mockResolvedValue([{ id: "1", name: "deck 1", cardCount: 0 }])
    const user = userEvent.setup()

    render(<CreateFlashcard />)

    const frontInput = screen.getByLabelText("Front")
    const backInput = screen.getByLabelText("Back")
    const deckSelect = screen.getByLabelText("Deck") as HTMLSelectElement
    const createButton = screen.getByRole("button", { name: "Create" })

    user.type(frontInput, "front of card")
    user.type(backInput, "back of card")
    user.selectOptions(deckSelect, "deck 1")

    user.click(createButton)

    expect(true).toBe(false)
  })
})
