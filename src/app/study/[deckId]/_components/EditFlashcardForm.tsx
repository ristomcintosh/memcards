import { updateFlashcard } from "@/actions/actions"
import { Button } from "@/components/Button"
import {
  DialogHeader,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Flashcard } from "@/types"
import { SubmitHandler, useForm } from "react-hook-form"

type EditFlashcardFormProps = {
  isOpen: boolean
  flashcard: Flashcard
  editCard: (flashcard?: Pick<Flashcard, "front" | "back">) => void
}

type FlashcardFormValues = Pick<Flashcard, "front" | "back">

export const EditFlashcardForm = ({
  isOpen,
  flashcard,
  editCard,
}: EditFlashcardFormProps) => {
  const form = useForm<FlashcardFormValues>({
    defaultValues: {
      front: flashcard.front,
      back: flashcard.back,
    },
  })

  const onSubmit: SubmitHandler<FlashcardFormValues> = (values) => {
    editCard(values)
    updateFlashcard({
      id: flashcard.id,
      front: values.front,
      back: values.back,
    })
  }

  const handleClose = () => {
    editCard(flashcard)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Flashcard</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="front"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="back"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Back</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
