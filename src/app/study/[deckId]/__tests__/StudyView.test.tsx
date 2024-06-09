import { decks } from "@/tests/testData"
import { StudyView } from "../_components/StudyView"
import { act, render, screen } from "@testing-library/react"
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

  it("deletes the current card being shown and show the next card", () => {
    const nextCard = "What is the capital of Portugal?"
    render(<StudyView deck={decks[0]} />)

    act(() => {
      screen.getByLabelText("Flashcard Options").click()
    })

    const deleteButton = screen.getByRole("menuitem", { name: "Delete" })

    act(() => {
      deleteButton.click()
    })

    expect(deleteFlashcard).toHaveBeenCalled()
    expect(screen.getByText(nextCard)).toBeInTheDocument()
  })
})
