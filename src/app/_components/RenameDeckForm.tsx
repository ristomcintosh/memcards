import { updateDeck } from "@/actions/actions"
import { Deck } from "@/types"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

type RenameDeckFormProps = {
  deck: Deck
  closeForm: () => void
}

export const RenameDeckForm = ({ deck, closeForm }: RenameDeckFormProps) => {
  const form = useForm<Pick<Deck, "name">>()
  return (
    <Dialog defaultOpen onOpenChange={() => closeForm()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Rename: ${deck.name}`}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) => {
              updateDeck(deck.id, formData.name)
              closeForm()
            })}
            className="gap-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              defaultValue={deck.name}
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
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
