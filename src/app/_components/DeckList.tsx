"use client"
import { deleteDeck, updateDeck } from "@/actions/actions"
import { DropdownMenu } from "@/components/DropdownMenu"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"

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
  const form = useForm<Pick<Deck, "name">>({
    defaultValues: {
      name: deck.name,
    },
  })
  return (
    <Dialog open={open} onOpenChange={handleVisibility}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Rename: ${deck.name}`}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) => {
              updateDeck(deck.id, formData.name)
              handleVisibility(false)
            })}
            className="gap-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deck Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={!form.formState.isDirty}
                aria-disabled={!form.formState.isDirty}
                type="submit"
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={() => handleVisibility(false)}
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
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
          <DialogTitle data-testid="delete-confirmation-title">
            <span>Are you sure you want to delete </span>
            <span className="block">
              <span className="text-red-500 text-xl dark:text-red-700">
                {deck.name}
              </span>
              <span>?</span>
            </span>
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
