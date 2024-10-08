import { render, screen } from "@testing-library/react";
import type { DeckWithCardCount } from "@/types";
import { getAllDecks } from "@/utils/getAllDecks";
import CreateFlashcard from "./page";

jest.mock("@/utils/getAllDecks");

const mockUseSearchParams = jest.fn();
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: () => mockUseSearchParams(),
}));

describe(CreateFlashcard.name, () => {
  const testDecks: DeckWithCardCount[] = [
    {
      id: "1",
      name: "deck 1",
      userId: "some-id",
      createdAt: new Date(),
      updatedAt: new Date(),
      cardCount: 0,
    },
  ];
  it("renders", async () => {
    jest.mocked(getAllDecks).mockResolvedValue(testDecks);
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    render(await CreateFlashcard());

    expect(screen.getByLabelText("Front")).toBeInTheDocument();
    expect(screen.getByLabelText("Back")).toBeInTheDocument();
    expect(screen.getByLabelText("Deck")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("renders with deck 1 selected when deckId=1 is in query params", async () => {
    jest.mocked(getAllDecks).mockResolvedValue(testDecks);
    mockUseSearchParams.mockReturnValue(new URLSearchParams("deckId=1"));
    render(await CreateFlashcard());

    expect(screen.getByLabelText("Deck")).toHaveTextContent("deck 1");
  });

  it("continues to show placeholder text if deckId form query params is not in deck list", async () => {
    jest.mocked(getAllDecks).mockResolvedValue(testDecks);
    mockUseSearchParams.mockReturnValue(new URLSearchParams("deckId=bad-id"));
    render(await CreateFlashcard());

    expect(screen.getByLabelText("Deck")).toHaveTextContent("Select a deck");
  });
});
