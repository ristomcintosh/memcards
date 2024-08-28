import { getDecks } from "@/actions/actions"
import { CreateFlashcardForm } from "@/features/create-flashcard/CreateFlashcardForm"
import { Suspense } from "react"

export default async function CreateFlashcard() {
  const decks = await getDecks()
  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="mb-6 text-2xl text-center font-semibold">
        Create A New Flashcard
      </h1>
      <div className="w-full max-w-xs">
        <Suspense fallback={<div>Loading...</div>}>
          <CreateFlashcardForm decks={decks} />
        </Suspense>
      </div>
    </div>
  )
}
