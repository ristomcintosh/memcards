import { getDecks } from "@/service/dbService"
import { CreateFlashcardForm } from "./_components/CreateFlashcardForm"

export default async function CreateFlashcard() {
  const decks = await getDecks()
  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="mb-6 text-3xl">Create A New Flashcard</h1>
      <div className="w-full max-w-xs">
        <CreateFlashcardForm decks={decks} />
      </div>
    </div>
  )
}
