"use client"
import { DropdownMenu } from "@/components/DropdownMenu"
import { Deck, DeckWithCardCount } from "@/types"
import Link from "next/link"
import { useState } from "react"
import { RenameDeckForm } from "./RenameDeckForm"
import { DeleteConfirmation } from "./DeleteConfirmation"

type DeckListProps = {
  decks: DeckWithCardCount[]
}

// TODO: Handle no cards in deck - show a message with option to route to add cards page

export const DeckList = ({ decks }: DeckListProps) => {
  return decks.map((deck) => (
    <div
      key={deck.id}
      className="flex items-center justify-between gap-2 px-2.5 py-1 text-2xl border-b-2 border-gray-300 last:mb-0 hover:bg-gray-200 dark:hover:bg-gray-700"
      data-testid={`deck-${deck.id}`}
    >
      <Link href={`/study/${deck.id}`} className="flex flex-1 justify-between">
        {deck.name}
      </Link>
      <p aria-label={`card count ${deck.cardCount}`}>{deck.cardCount}</p>
      <Menu deck={deck} />
    </div>
  ))
}

const Menu = ({ deck }: { deck: Deck }) => {
  const [isRenameDeckFormOpen, showRenameDeckForm] = useState(false)
  const [isDeleteConfirmationOpen, showDeleteConfirmation] = useState(false)
  return (
    <>
      <DropdownMenu
        name="Deck Options"
        items={[
          {
            name: "Rename",
            action: () => showRenameDeckForm(true),
          },
          {
            name: "Delete",
            action: () => showDeleteConfirmation(true),
          },
        ]}
      />
      <RenameDeckForm
        deck={deck}
        open={isRenameDeckFormOpen}
        handleVisibility={showRenameDeckForm}
      />
      <DeleteConfirmation
        deck={deck}
        open={isDeleteConfirmationOpen}
        handleVisibility={showDeleteConfirmation}
      />
    </>
  )
}
