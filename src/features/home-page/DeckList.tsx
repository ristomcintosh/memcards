"use client"
import { DeckWithCardCount } from "@/types"
import { ModalManager, useModalState } from "./ModalManger"
import { DeckMenu } from "./DeckListMenu"
import Link from "next/link"

type DeckListProps = {
  decks: DeckWithCardCount[]
}

export const DeckList = ({ decks }: DeckListProps) => {
  const { modalType, closeModal, toggleModal, selectedDeck } = useModalState()

  return (
    <>
      {decks.map((deck) => (
        <div
          key={deck.id}
          className="flex items-center gap-2 px-2.5 py-1 text-2xl border-b-2 border-gray-300 last:mb-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          data-testid={`deck-${deck.name}`}
        >
          <Link
            className="flex-grow text-inherit hover:no-underline break-words hyphens-auto"
            href={`/study/${deck.id}`}
          >
            {deck.name}
          </Link>
          <p id="card-count" aria-label={`card count ${deck.cardCount}`}>
            {deck.cardCount}
          </p>

          <DeckMenu
            handleRename={() => toggleModal(deck, "rename")}
            handleDelete={() => toggleModal(deck, "delete")}
          />
        </div>
      ))}
      <ModalManager
        modalType={modalType}
        deck={selectedDeck}
        closeModal={closeModal}
      />
    </>
  )
}
