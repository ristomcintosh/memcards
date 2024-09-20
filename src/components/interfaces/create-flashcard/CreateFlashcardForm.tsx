"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { createFlashcard } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast/use-toast";
import { Deck, Flashcard } from "@/types";

type CreateFlashcardFormValues = Pick<Flashcard, "deckId" | "front" | "back">;

type CreateFlashcardFormProps = {
  decks: Deck[];
};
export const CreateFlashcardForm = ({ decks }: CreateFlashcardFormProps) => {
  const queryParam = useSearchParams();
  const defaultDeckId = getDeckIdFromQueryParam(
    queryParam.get("deckId"),
    decks,
  );
  const { toast } = useToast();

  const form = useForm<CreateFlashcardFormValues>({
    defaultValues: {
      deckId: defaultDeckId,
      front: "",
      back: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await createFlashcard(values);
    form.reset({ deckId: values.deckId, front: "", back: "" });
    toast({
      title: "Flashcard created!",
    });
  });

  return (
    <Form {...form}>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="deckId"
          rules={{ required: "Select a deck" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deck</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger aria-label="Select a deck">
                    <SelectValue placeholder="Select a deck" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {decks.map((deck) => (
                    <SelectItem key={deck.id} value={deck.id}>
                      {deck.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="front"
          rules={{ required: "Front is required" }}
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
          rules={{ required: "Back is required" }}
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
        <Button className="mt-7" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};

function getDeckIdFromQueryParam(deckId: string | null, decks: Deck[]) {
  if (deckId) {
    return decks.find((deck) => deck.id === deckId)?.id ?? "";
  }
  return "";
}
