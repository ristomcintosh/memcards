import { useCallback, useReducer } from "react";
import { DeckWithFlashcards, Flashcard } from "@/types";
import { deleteFlashcard } from "./useStudy.actions";

type State = {
  totalFlashcardCount: number;
  flashcards: Flashcard[];
  flashcard: Flashcard;
  cardSide: "front" | "back";
  isEditing: boolean;
  progress: number;
};

type Action =
  | { type: "flipCard" }
  | { type: "nextCard" }
  | { type: "deleteCard" }
  | { type: "initialize"; payload: DeckWithFlashcards }
  | { type: "editCard"; payload?: Partial<Flashcard> };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initialize":
      return getInitialState(action.payload.flashcards);
    case "nextCard":
    case "deleteCard":
      return getNextFlashcardState(state);
    case "flipCard": {
      return {
        ...state,
        cardSide: state.cardSide === "front" ? "back" : "front",
      };
    }

    case "editCard": {
      if (!action.payload) {
        return { ...state, isEditing: true };
      }

      return {
        ...state,
        flashcard: { ...state.flashcard, ...action.payload },
        isEditing: false,
      };
    }
  }
};

export const useStudy = (deck: DeckWithFlashcards) => {
  const [state, dispatch] = useReducer(
    reducer,
    deck.flashcards,
    getInitialState,
  );

  const flipCard = useCallback(() => dispatch({ type: "flipCard" }), []);

  const nextCard = useCallback(() => dispatch({ type: "nextCard" }), []);

  const deleteCard = useCallback(() => {
    deleteFlashcard(state.flashcard.id);
    dispatch({ type: "deleteCard" });
  }, [state.flashcard?.id]);

  const initialize = useCallback(
    () => dispatch({ type: "initialize", payload: deck }),
    [deck],
  );

  const editCard = useCallback(
    (payload?: Partial<Flashcard>) => dispatch({ type: "editCard", payload }),
    [],
  );

  return {
    ...state,
    deleteCard,
    initialize,
    flipCard,
    nextCard,
    editCard,
  };
};

const takeFirstFlashcard = (
  flashcards: Flashcard[],
): { remainingFlashcards: Flashcard[]; flashcard: Flashcard } => {
  const flashcard = flashcards[0];
  const remainingFlashcards = flashcards.slice(1);
  return {
    flashcard,
    remainingFlashcards,
  };
};

const getProgress = (numberOfCards: number, cardsLeft: number) =>
  ((numberOfCards - cardsLeft) * 100) / numberOfCards;

function getNextFlashcardState(state: State): State {
  const { flashcard, remainingFlashcards } = takeFirstFlashcard(
    state.flashcards,
  );
  return {
    ...state,
    flashcard,
    flashcards: remainingFlashcards,
    cardSide: "front",
    progress: getProgress(
      state.totalFlashcardCount,
      remainingFlashcards.length,
    ),
  };
}

function getInitialState(flashcards: Flashcard[]): State {
  const { flashcard, remainingFlashcards } = takeFirstFlashcard(flashcards);
  return {
    flashcard,
    flashcards: remainingFlashcards,
    cardSide: "front",
    isEditing: false,
    progress: getProgress(flashcards.length, remainingFlashcards.length),
    totalFlashcardCount: flashcards.length,
  };
}
