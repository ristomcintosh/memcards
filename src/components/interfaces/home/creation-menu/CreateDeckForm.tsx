import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Deck } from "@/types";
import { createDeck } from "./CreateDeckForm.actions";

export const CreateDeckForm = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const form = useForm<Pick<Deck, "name">>();
  return (
    <Dialog defaultOpen modal onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A New Deck</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) => {
              createDeck(formData.name);
              handleClose();
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
  );
};
