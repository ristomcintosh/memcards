import { DeckList } from './DeckList'

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen bg-orange-200">
      <main className="relative w-full max-w-2xl min-h-full py-4 bg-green-200">
        <h1 className="sr-only">Deck List</h1>
        <div className="relative max-w-xs mx-auto">
          <DeckList />
        </div>

        <div className="absolute bottom-0 right-0 mb-8 mr-8">
          <button aria-label="Create a new deck or new flashcard">
            Create a new deck or new flashcard
          </button>
        </div>
      </main>
    </div>
  )
}
