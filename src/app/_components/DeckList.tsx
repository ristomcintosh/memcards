"use client"
import { DropdownMenu } from "@/components/DropdownMenu"
import { deleteDeck } from "@/service/dbService"
import { Deck } from "@prisma/client"
import Link from "next/link"

type DeckListProps = {
  decks: Deck[]
}

export const DeckList = ({ decks }: DeckListProps) => {
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
      <DropdownMenu
        items={[
          {
            name: "Delete",
            action: () => deleteDeck(deck.id),
          },
        ]}
      />
    </div>
  ))
}
