import { DropdownMenu } from "@/components/DropdownMenu"
import { Deck } from "@/types"

const decks: Deck[] = [
  {
    name: "Deck 1",
    cardCount: 25,
    id: "some-id",
  },
]

export const DeckList = () => {
  return decks.map((deck) => (
    <div
      key={deck.id}
      className="flex items-center pl-2 mb-2 text-2xl border-b-2 border-gray-300 last:mb-0"
    >
      <p className="flex-1">{deck.name}</p>
      <p data-testid="deck-card-count">{deck.cardCount}</p>
      <DeckOptions />
    </div>
  ))
}

const menuOptions = ["Rename", "Delete"]
const DeckOptions = () => <DropdownMenu items={menuOptions} />
