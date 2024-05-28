"use client"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
} from "@headlessui/react"
import { useState } from "react"
import { TextInput } from "@/components/TextInput"
import { Button } from "@/components/Button"
import { Plus } from "@/components/Plus"
import { MenuItem, MenuItemsAnimated } from "@/components/DropdownMenu"
import { motion } from "framer-motion"

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
            <MenuItem text="Create Flashcard" />
          </MenuItemsAnimated>
        </>
      )}
    </Menu>
  )
}

const CreateDeckForm = ({
  handleClick,
  isOpen,
}: {
  handleClick: () => void
  isOpen: boolean
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClick}>
      <div className="fixed inset-0 p-4 top-[7%] flex items-start justify-center">
        <DialogPanel className="w-full max-w-sm px-6 py-6 bg-white rounded-lg shadow-lg border-2">
          <DialogTitle className="text-xl text-center mb-2">
            Create A New Deck
          </DialogTitle>
          <form>
            <TextInput label="Deck Name:" name="deckName" />
            <div className="flex justify-around">
              <Button type="submit">Submit</Button>
              <Button onClick={handleClick} variant="text">
                Cancel
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
