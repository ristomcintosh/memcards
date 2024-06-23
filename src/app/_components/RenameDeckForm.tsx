import { updateDeck } from "@/actions/actions"
import { Deck } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

export const RenameDeckForm = ({
  deck,
  open,
  handleVisibility,
}: {
  deck: Deck
  open: boolean
  handleVisibility: (show: boolean) => void
}) => {
  const form = useForm<Pick<Deck, "name">>({
    defaultValues: {
      name: deck.name,
    },
  })
  return (
    <Dialog open={open} onOpenChange={handleVisibility}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Rename: ${deck.name}`}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) => {
              updateDeck(deck.id, formData.name)
              handleVisibility(false)
            })}
            className="gap-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
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
              <Button
                type="button"
                onClick={() => handleVisibility(false)}
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
