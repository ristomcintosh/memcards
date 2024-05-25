import { DeckList } from "./DeckList"

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-orange-200 h-full">
      <div className="relative w-full max-w-2xl min-h-full py-4">
        <h1 className="sr-only">Deck List</h1>
        <div className="relative max-w-xs mx-auto">
          <DeckList />
        </div>

        <div className="absolute bottom-0 right-0 mb-8 mr-8">
          <CreateButton />
        </div>
      </div>
    </div>
  )
}

const CreateButton = () => {
  return (
    <div className="relative flex flex-col items-center">
      <button aria-label="Create a new deck or new flashcard">
        Create a new deck or new flashcard
      </button>
    </div>
  )
}
