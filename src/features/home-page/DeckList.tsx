"use client"
import { DeckWithCardCount } from "@/types"
import { useCallback, useState } from "react"
import { ModalManager, ModalType, useModalState } from "./ModalManger"
import { LinkWithContextMenu, DeckMenu } from "./DeckListMenus"

type DeckListProps = {
  decks: DeckWithCardCount[]
}

export const DeckList = ({ decks }: DeckListProps) => {
  const { modalType, closeModal, openModal } = useModalState()
  const [selectedDeck, setSelectedDeck] = useState<DeckWithCardCount | null>(
    null
  )

  const toggleModal = useCallback(
    (deck: DeckWithCardCount, type: ModalType) => {
      setSelectedDeck(deck)
      openModal(type)
    },
    [openModal]
  )

  return (
    <>
      {decks.map((deck) => (
        <div
          key={deck.id}
          className="flex items-center justify-between gap-2 px-2.5 py-1 text-2xl border-b-2 border-gray-300 last:mb-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          data-testid={`deck-${deck.name}`}
        >
          <LinkWithContextMenu
            deck={deck}
            handleRename={() => toggleModal(deck, "rename")}
            handleDelete={() => toggleModal(deck, "delete")}
          />
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
