import { DropdownMenu } from "@/components/DropdownMenu"
import { getDecks } from "@/service/dbService"

export const DeckList = async () => {
  const decks = await getDecks()
  return decks.map((deck) => (
    <div
      key={deck.id}
      className="flex items-center pl-2 mb-2 text-2xl border-b-2 border-gray-300 last:mb-0"
    >
      <p className="flex-1">{deck.name}</p>
      <p data-testid="deck-card-count">{deck.cardCount}</p>
      <DropdownMenu items={["Rename", "Delete"]} />
    </div>
  ))
}
