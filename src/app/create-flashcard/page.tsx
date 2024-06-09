import { createFlashcard } from "@/actions/actions"
import { TextInput } from "@/components/TextInput"
import { getDecks } from "@/service/dbService"
import { Field, Label, Select, Button } from "@headlessui/react"

export default function CreateFlashcard() {
  return (
    <div className="flex flex-col items-center py-4">
      <h1 className="mb-6 text-3xl">Create A New Flashcard</h1>
      <div className="w-full max-w-xs">
        <Form />
      </div>
    </div>
  )
}

const Form = async () => {
  const decks = await getDecks()
  return (
    <form action={createFlashcard}>
      <Field>
        <Label htmlFor="deck" className="sr-only">
          Deck
        </Label>
        <Select
          id="deck"
          name="deckId"
          className="w-full mb-5 text-xl py-1 rounded"
        >
          {decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.name}
            </option>
          ))}
        </Select>
      </Field>

      <TextInput label="Front" name="front" />

      <TextInput label="Back" name="back" />

      <Button
        type="submit"
        className="px-4 mt-4 text-2xl md:text-xl h-12 w-full rounded whitespace-nowrap shadow py-1 no-underline md:h-auto bg-brand-600 text-white"
      >
        Create
      </Button>
    </form>
  )
}
