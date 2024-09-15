"use client"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Plus } from "lucide-react"

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
}) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger
      className="w-12 h-12 transition-transform ease-in data-[state=open]:rotate-[225deg] text-zinc-900 rounded-full shadow-lg bg-brand-500"
      aria-label="Create"
    >
      <Plus className="w-full h-full" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" side="top" alignOffset={10}>
      <DropdownMenuItem onSelect={handleDeckCreation}>
        Create Deck
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link
          className="text-inherit hover:no-underline"
          href="/create-flashcard"
        >
          Create Flashcards
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

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
              rules={{ required: "Deck name is required" }}
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
