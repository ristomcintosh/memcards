"use client"
import { deleteDeck, updateDeck } from "@/actions/actions"
import { DropdownMenu } from "@/components/DropdownMenu"
import { TextInput } from "@/components/TextInput"
import { Deck, DeckWithCardCount } from "@/types"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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

const RenameDeckForm = ({
  deck,
  open,
  handleVisibility,
}: {
  deck: Deck
  open: boolean
  handleVisibility: (show: boolean) => void
}) => {
  const updateDeckWithId = updateDeck.bind(null, deck.id)
  return (
    <Dialog open={open} onOpenChange={handleVisibility}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Rename: ${deck.name}`}</DialogTitle>
        </DialogHeader>
        <form
          action={(formData) => {
            updateDeckWithId(formData)
            handleVisibility(false)
          }}
        >
          <TextInput label="Deck Name:" name="deckName" />
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <Button onClick={() => handleVisibility(false)} variant="ghost">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const DeleteConfirmation = ({
  deck,
  handleVisibility: handleVisibility,
  open,
}: {
  deck: Deck
  handleVisibility: (show: boolean) => void
  open: boolean
}) => {
  return (
    <Dialog open={open} onOpenChange={handleVisibility}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete</DialogTitle>
          <DialogTitle className="text-red-500 text-xl">
            {deck.name}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse">
          <Button variant="destructive" onClick={() => deleteDeck(deck.id)}>
            Yes
          </Button>
          <Button onClick={() => handleVisibility(false)} variant="ghost">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
