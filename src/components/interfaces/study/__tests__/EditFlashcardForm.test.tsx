import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Flashcard } from "@/types";
import { EditFlashcardForm } from "../EditFlashcardForm";
import { updateFlashcard } from "../EditFlashcardForm.actions";

jest.mock("../EditFlashcardForm.actions");

describe("EditFlashcardForm", () => {
  const mockFlashcard: Flashcard = {
    id: "1",
    front: "Front of card",
    back: "Back of card",
    deckId: "deck-id",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("renders the form fields", () => {
    render(<EditFlashcardForm flashcard={mockFlashcard} editCard={() => {}} />);

    expect(screen.getByLabelText("Front")).toBeInTheDocument();
    expect(screen.getByLabelText("Back")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("calls editCard and updateFlashcard on form submission", async () => {
    jest.useFakeTimers();
    const editCardMock = jest.fn();

    render(
      <EditFlashcardForm flashcard={mockFlashcard} editCard={editCardMock} />,
    );

    const frontInput = screen.getByLabelText("Front");
    const backInput = screen.getByLabelText("Back");
    const saveButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(frontInput, { target: { value: "Updated front" } });
    fireEvent.change(backInput, { target: { value: "Updated back" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(editCardMock).toHaveBeenCalledTimes(1);
      expect(updateFlashcard).toHaveBeenCalledTimes(1);
    });

    expect(editCardMock).toHaveBeenCalledWith({
      front: "Updated front",
      back: "Updated back",
    });

    expect(updateFlashcard).toHaveBeenCalledWith({
      id: "1",
      front: "Updated front",
      back: "Updated back",
    });
  });
});
