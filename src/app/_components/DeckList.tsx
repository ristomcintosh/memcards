import { DropdownMenu } from "@/components/DropdownMenu"
import { getDecks } from "@/service/dbService"
import Link from "next/link"

export const DeckList = async () => {
  const decks = await getDecks()
  return decks.map((deck) => (
    <div
      key={deck.id}
      className="flex items-center justify-between pl-2 mb-2 text-2xl border-b-2 border-gray-300 last:mb-0"
    >
      <Link
        href={`/study/${deck.id}`}
        className="flex flex-1 justify-between mr-2"
      >
        <p className="">{deck.name}</p>
        <p aria-label={`card count ${deck.cardCount}`}>{deck.cardCount}</p>
      </Link>
      <DropdownMenu items={["Rename", "Delete"]} />
    </div>
  ))
}
