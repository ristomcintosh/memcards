"use client"
import { Menu, MenuButton } from "@headlessui/react"
import { useState } from "react"
import { TextInput } from "@/components/TextInput"
import { Button } from "@/components/Button"
import { Plus } from "@/components/Plus"
;<MenuItem text="Create Flashcard" />
import {
  MenuItem,
  MenuItemAsLink,
  MenuItemsAnimated,
} from "@/components/DropdownMenu"
import { motion } from "framer-motion"
import { createDeck } from "@/actions/actions"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const CreateNew = () => {
  const [isCreateDeckFormOpen, showCreateDeckFrom] = useState(false)
  return (
    <>
      <CreateNewMenu handleDeckCreation={() => showCreateDeckFrom(true)} />
      {isCreateDeckFormOpen && (
        <CreateDeckForm handleClose={() => showCreateDeckFrom(false)} />
      )}
    </>
  )
}

const CreateNewMenu = ({
  handleDeckCreation,
}: {
  handleDeckCreation: () => void
}) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <MenuButton
            as={motion.button}
            animate={{ rotate: open ? 225 : 0 }}
            className=" w-10 text-gray-900 rounded-full shadow-lg bg-brand-500 focus:outline-none focus-visible:outline-black"
            aria-label="Create a new deck or new flashcard"
          >
            <Plus />
          </MenuButton>
          <MenuItemsAnimated
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute mb-1 bottom-full right-full"
          >
            <MenuItem text="Create Deck" onClick={handleDeckCreation} />
            <MenuItemAsLink href="/create-flashcard">
              Create Flashcards
            </MenuItemAsLink>
          </MenuItemsAnimated>
        </>
      )}
    </Menu>
  )
}

const CreateDeckForm = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Dialog defaultOpen modal onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Deck</DialogTitle>
        </DialogHeader>
        <form
          action={(formData) => {
            console.log("submitted!")
            createDeck(formData)
            handleClose()
          }}
        >
          <TextInput label="Deck Name:" name="deckName" />
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <Button onClick={handleClose} type="button" variant="text">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
