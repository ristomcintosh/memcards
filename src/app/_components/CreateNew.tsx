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
import { Dialog } from "@/components/Dialog"
import { createDeck } from "@/actions/actions"

export const CreateNew = () => {
  const [isCreateDeckFormOpen, showCreateDeckFrom] = useState(false)
  return (
    <>
      <CreateNewMenu handleClick={() => showCreateDeckFrom(true)} />
      <CreateDeckForm
        handleClick={() => showCreateDeckFrom(false)}
        isOpen={isCreateDeckFormOpen}
      />
    </>
  )
}

const CreateNewMenu = ({ handleClick }: { handleClick: () => void }) => {
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
            <MenuItem text="Create Deck" onClick={handleClick} />
            <MenuItemAsLink href="/create-flashcard">
              Create Flashcards
            </MenuItemAsLink>
          </MenuItemsAnimated>
        </>
      )}
    </Menu>
  )
}

const CreateDeckForm = ({
  handleClick: onClose,
  isOpen,
}: {
  handleClick: () => void
  isOpen: boolean
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Create A New Deck">
      <form
        action={(formData) => {
          createDeck(formData)
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
