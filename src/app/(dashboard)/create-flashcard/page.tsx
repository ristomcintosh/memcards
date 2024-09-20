import { Suspense } from "react";
import { CreateFlashcardForm } from "@/components/interfaces/create-flashcard/CreateFlashcardForm";
import { getAllDecks } from "@/utils/getAllDecks";

export default async function CreateFlashcard() {
  const decks = await getAllDecks();
  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="mb-6 text-center font-semibold">Create A New Flashcard</h1>
      <div className="w-full max-w-xs">
        <Suspense fallback={<div>Loading...</div>}>
          <CreateFlashcardForm decks={decks} />
        </Suspense>
      </div>
    </div>
  );
}
