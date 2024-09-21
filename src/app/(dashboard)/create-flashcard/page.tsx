import { Suspense } from "react";
import { CreateFlashcardForm } from "@/components/interfaces/create-flashcard";
import { FormSkeleton } from "@/components/ui/form-skeleton";
import { getAllDecks } from "@/utils/getAllDecks";

export default async function CreateFlashcard() {
  const decks = await getAllDecks();
  return (
    <div className="flex justify-center items-start pt-8 sm:pt-16 h-full">
      <div className="w-full max-w-screen-md sm:border-l-4 border-brand-500 px-4 sm:px-8 sm:pt-8 sm:pb-24 rounded sm:shadow-md sm:bg-surface-light sm:dark:bg-surface-dark">
        <h1 className="mb-6 text-center font-semibold">
          Create A New Flashcard
        </h1>
        <Suspense fallback={<FormSkeleton numberOfInputs={3} />}>
          <CreateFlashcardForm decks={decks} />
        </Suspense>
      </div>
    </div>
  );
}
