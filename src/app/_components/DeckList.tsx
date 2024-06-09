"use client"
import { deleteDeck, updateDeck } from "@/actions/actions"
import { Button } from "@/components/Button"
import { Dialog } from "@/components/Dialog"
import { DropdownMenu } from "@/components/DropdownMenu"
import { TextInput } from "@/components/TextInput"
import { Deck, DeckWithCardCount } from "@/types"
import Link from "next/link"
import { useState } from "react"

type DeckListProps = {
  decks: DeckWithCardCount[]
}

// TODO: Handle no cards in deck - show a message with option to route to add cards page

export const DeckList = ({ decks }: DeckListProps) => {
  return decks.map((deck) => (
    <div
      key={deck.id}
      className="flex items-center justify-between pl-2 mb-2 text-2xl border-b-2 border-gray-300 last:mb-0"
      data-testid={`deck-${deck.id}`}
    >
      <Link
        href={`/study/${deck.id}`}
        className="flex flex-1 justify-between mr-2"
      >
        <p>{deck.name}</p>
        <p aria-label={`card count ${deck.cardCount}`}>{deck.cardCount}</p>
      </Link>
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
        isOpen={isRenameDeckFormOpen}
        onClose={() => showRenameDeckForm(false)}
      />
      <DeleteConfirmation
        deck={deck}
        isOpen={isDeleteConfirmationOpen}
        onClose={() => showDeleteConfirmation(false)}
      />
    </>
  )
}

const RenameDeckForm = ({
  deck,
  isOpen,
  onClose,
}: {
  deck: Deck
  isOpen: boolean
  onClose: () => void
}) => {
  const updateDeckWithId = updateDeck.bind(null, deck.id)
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={`Rename: ${deck.name}`}>
      <form
        action={(formData) => {
          updateDeckWithId(formData)
          onClose()
        }}
      >
        <TextInput label="Deck Name:" name="deckName" />
        <div className="flex justify-around">
          <Button type="submit">Submit</Button>
          <Button onClick={onClose} variant="text">
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

const DeleteConfirmation = ({
  deck,
  onClose,
  isOpen,
}: {
  deck: Deck
  onClose: () => void
  isOpen: boolean
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure you want to delete ${deck.name}?`}
    >
      <div className="flex justify-around mt-4">
        <Button variant="warn" onClick={() => deleteDeck(deck.id)}>
          Yes
        </Button>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
      </div>
    </Dialog>
  )
}
