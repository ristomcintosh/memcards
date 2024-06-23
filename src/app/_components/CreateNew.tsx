"use client"
import { Menu, MenuButton } from "@headlessui/react"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Plus } from "@/components/Plus"
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
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Deck } from "@/types"

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
            className="w-12 text-gray-900 rounded-full shadow-lg bg-brand-500 focus:outline-none focus-visible:outline-black"
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
  const form = useForm<Pick<Deck, "name">>()
  return (
    <Dialog defaultOpen modal onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Deck</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) => {
              createDeck(formData.name)
              handleClose()
            })}
            className="gap-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deck Name:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
              <Button onClick={handleClose} type="button" variant="ghost">
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
