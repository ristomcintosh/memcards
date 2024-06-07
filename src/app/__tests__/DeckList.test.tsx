import { render, screen } from "@testing-library/react"
import { DeckList } from "../_components/DeckList"
import { getDecks } from "@/service/dbService"

jest.mock("@/service/dbService")

describe(DeckList.name, () => {
  it("renders", async () => {
    jest.mocked(getDecks).mockResolvedValue([
      {
        id: "some-id",
        name: "Deck 1",
        cardCount: 3,
      },
    ])
    render(await DeckList())

    expect(screen.getByText("Deck 1")).toBeInTheDocument()
    expect(screen.getByLabelText("card count 3")).toBeInTheDocument()
  })
})
