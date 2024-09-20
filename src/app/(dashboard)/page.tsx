import { CreateNew, DeckList } from "@/components/interfaces/home/";
import { getAllDecks } from "@/utils/getAllDecks";

export default async function Home() {
  const deckList = await getAllDecks();

  return (
    <div className="flex flex-col items-center h-full" data-testid="home-page">
      <div className="relative w-full max-w-2xl min-h-full pb-4 pt-6">
        <h1 className="sr-only">Deck List</h1>

        <div className="max-w-md mx-auto p-6">
          <div className="max-w-sm mx-auto">
            <DeckList decks={deckList} />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 mb-8 mr-8">
          <CreateNew />
        </div>
      </div>
    </div>
  );
}
