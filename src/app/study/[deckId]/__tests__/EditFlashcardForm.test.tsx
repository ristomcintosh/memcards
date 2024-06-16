import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { EditFlashcardForm } from "../_components/EditFlashcardForm"
import { updateFlashcard } from "@/actions/actions"

jest.mock("@/actions/actions")

describe("EditFlashcardForm", () => {
  const mockFlashcard = {
    id: "1",
    front: "Front of card",
    back: "Back of card",
    deckId: "deck-id",
  }

  it("renders the form fields", () => {
    render(
      <EditFlashcardForm
        isOpen={true}
        setOpen={() => {}}
        flashcard={mockFlashcard}
        editCard={() => {}}
      />
    )

    expect(screen.getByLabelText("Front")).toBeInTheDocument()
    expect(screen.getByLabelText("Back")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("calls editCard and updateFlashcard on form submission", async () => {
    jest.useFakeTimers()
    const editCardMock = jest.fn()

    render(
      <EditFlashcardForm
        isOpen={true}
        setOpen={() => {}}
        flashcard={mockFlashcard}
        editCard={editCardMock}
      />
    )

    const frontInput = screen.getByLabelText("Front")
    const backInput = screen.getByLabelText("Back")
    const saveButton = screen.getByRole("button", { name: "Save" })

    fireEvent.change(frontInput, { target: { value: "Updated front" } })
    fireEvent.change(backInput, { target: { value: "Updated back" } })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(editCardMock).toHaveBeenCalledTimes(1)
      expect(updateFlashcard).toHaveBeenCalledTimes(1)
    })

    expect(editCardMock).toHaveBeenCalledWith({
      front: "Updated front",
      back: "Updated back",
    })

    expect(updateFlashcard).toHaveBeenCalledWith({
      id: "1",
      front: "Updated front",
      back: "Updated back",
    })
  })
})
