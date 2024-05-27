"use client"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState } from "react"
import { TextInput } from "@/components/TextInput"
import { Button } from "@/components/Button"

export const CreateNew = () => {
  const [isCreateDeckFormOpen, showCreateDeckFrom] = useState(false)
  return (
    <>
      <CreateButton handleClick={() => showCreateDeckFrom(true)} />
      <CreateDeckForm
        handleClick={() => showCreateDeckFrom(false)}
        isOpen={isCreateDeckFormOpen}
      />
    </>
  )
}

const CreateButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="relative flex flex-col items-center">
      <button
        aria-label="Create a new deck or new flashcard"
        onClick={handleClick}
      >
        Create a new deck or new flashcard
      </button>
    </div>
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
