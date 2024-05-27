import { TextInput } from "@/components/TextInput"
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

const Form = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server"
    console.log(formData)
  }

  return (
    <form action={handleSubmit}>
      <Field>
        <Label htmlFor="deck" className="sr-only">
          Deck
        </Label>
        <Select
          id="deck"
          name="deckName"
          className="w-full mb-5 text-xl py-1 rounded"
        >
          <option value="deck 1">Deck 1</option>
          <option value="deck 2">Deck 2</option>
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
