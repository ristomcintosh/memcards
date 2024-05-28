import { render, screen, act } from "@testing-library/react"
import { CreateNew } from "../_components/CreateNew"

describe(CreateNew.name, () => {
  it("shows the create deck form ", () => {
    render(<CreateNew />)

    const createButton = screen.getByLabelText(
      "Create a new deck or new flashcard"
    )

    act(() => {
      createButton.click()
    })

    const createNewDeckButton = screen.getByText("Create Deck")

    act(() => {
      createNewDeckButton.click()
    })

    expect(screen.getByText("Create A New Deck")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
  })

  it("hides the create deck form when the cancel button is clicked", () => {
    render(<CreateNew />)

    const createButton = screen.getByLabelText(
      "Create a new deck or new flashcard"
    )

    act(() => {
      createButton.click()
    })

    const createNewDeckButton = screen.getByText("Create Deck")

    act(() => {
      createNewDeckButton.click()
    })

    const cancelButton = screen.getByRole("button", { name: "Cancel" })

    act(() => {
      cancelButton.click()
    })

    expect(screen.queryByText("Create a new deck")).not.toBeInTheDocument()
  })
})
