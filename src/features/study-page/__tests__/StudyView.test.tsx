import { decks } from "@/tests/testData"
import { StudyView } from "../StudyView"
import { act, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { deleteFlashcard } from "@/actions/actions"

jest.mock("@/actions/actions")

describe(StudyView.name, () => {
  it("renders", () => {
    render(<StudyView deck={decks[0]} />)

    expect(screen.getByText("Deck 1")).toBeInTheDocument()
    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Flip" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument()
  })

  it("flips the card", () => {
    const frontOfCardText = "What is the capital of France?"
    const backOfCardText = "Paris"
    render(<StudyView deck={decks[0]} />)

    expect(screen.getByText(frontOfCardText)).toBeInTheDocument()
    expect(screen.queryByText(backOfCardText)).not.toBeInTheDocument()

    act(() => screen.getByRole("button", { name: "Flip" }).click())

    expect(screen.getByText(backOfCardText)).toBeInTheDocument()
  })

  it("shows the next card", () => {
    const firstCard = "What is the capital of France?"
    const nextCard = "What is the capital of Portugal?"
    render(<StudyView deck={decks[0]} />)

    expect(screen.getByText(firstCard)).toBeInTheDocument()

    act(() => screen.getByRole("button", { name: "Next" }).click())

    expect(screen.getByText(nextCard)).toBeInTheDocument()
  })

  it("deletes the current card being shown and show the next card", async () => {
    const nextCard = "What is the capital of Portugal?"
    render(<StudyView deck={decks[0]} />)

    await deleteFlashcards(1)

    expect(deleteFlashcard).toHaveBeenCalled()
    expect(screen.getByText(nextCard)).toBeInTheDocument()
  })

  describe("Completed deck modal", () => {
    it("shows the completed modal after viewing all cards", () => {
      render(<StudyView deck={decks[0]} />)

      const nextButton = screen.getByRole("button", { name: "Next" })

      act(() => {
        nextButton.click()
      })

      act(() => {
        nextButton.click()
      })

      act(() => {
        nextButton.click()
      })

      act(() => {
        nextButton.click()
      })

      expect(screen.getByText("Congratulations! 🎉")).toBeInTheDocument()
    })

    it("restarts the study session", () => {
      render(<StudyView deck={decks[0]} />)

      const nextButton = screen.getByRole("button", { name: "Next" })

      act(() => {
        nextButton.click()
      })

      act(() => {
        nextButton.click()
      })

      act(() => {
        nextButton.click()
      })

      act(() => {
        nextButton.click()
      })

      const restartButton = screen.getByRole("button", { name: "Restart" })

      act(() => {
        restartButton.click()
      })

      expect(
        screen.getByText("What is the capital of France?")
      ).toBeInTheDocument()
    })

    it("does not show the restart button when after deleting all cards", async () => {
      const { rerender } = render(<StudyView deck={decks[0]} />)

      await deleteFlashcards(4)

      const deckWithoutCards = {
        ...decks[0],
        flashcards: [],
      }
      rerender(<StudyView deck={deckWithoutCards} />)

      const completedModal = await screen.findByTestId("completed-modal")
      expect(screen.getByText("Congratulations! 🎉")).toBeInTheDocument
      expect(screen.queryByText("Restart")).not.toBeInTheDocument()
      expect(within(completedModal).getByText("Home")).toBeInTheDocument()
    })
  })
})

const deleteFlashcards = async (num: number) => {
  const user = userEvent.setup()
  for (let i = 0; i < num; i++) {
    const flashcardOptions = screen.getByRole("button", {
      name: "Flashcard Options",
    })

    await user.click(flashcardOptions)

    const deleteButton = await screen.findByRole("menuitem", {
      name: "Delete",
    })

    await user.click(deleteButton)
  }
}
