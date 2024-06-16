import { render, screen } from "@testing-library/react"
import CreateFlashcard from "../page"
import { getDecks } from "@/service/dbService"

jest.mock("@/service/dbService")

describe(CreateFlashcard.name, () => {
  it("renders", async () => {
    jest
      .mocked(getDecks)
      .mockResolvedValue([{ id: "1", name: "deck 1", cardCount: 0 }])
    render(await CreateFlashcard())

    expect(screen.getByLabelText("Front")).toBeInTheDocument()
    expect(screen.getByLabelText("Back")).toBeInTheDocument()
    expect(screen.getByLabelText("Deck")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument()
  })
})
