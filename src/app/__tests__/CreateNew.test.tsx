import { render, screen, act } from "@testing-library/react"
import { CreateNew } from "../_components/CreateNew"
import { createDeck } from "@/actions/actions"

jest.mock("@/actions/actions")

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

  it.skip("calls createDeck when the form is submitted", () => {
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

    const submitButton = screen.getByRole("button", { name: "Submit" })

    act(() => {
      submitButton.click()
    })

    expect(createDeck).toHaveBeenCalled()
  })
})
