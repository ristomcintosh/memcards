import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeckWithFlashcards } from "@/types";

type CompletedProps = {
  restart: () => void;
  deck: DeckWithFlashcards;
};

export const Completed = ({ restart, deck }: CompletedProps) => {
  const isDeckEmpty = deck.flashcards.length === 0;
  return (
    <Dialog open={true}>
      <DialogContent
        className="max-w-md"
        closeIcon={false}
        data-testid="completed-modal"
      >
        <DialogHeader>
          <DialogTitle>Congratulations! 🎉</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          You have successfully completed all the flashcards in this deck.
        </DialogDescription>
        {isDeckEmpty && <NoFlashcardsMessage deckId={deck.id} />}
        <DialogFooter>
          {!isDeckEmpty && (
            <Button size="lg" onClick={restart}>
              Restart
            </Button>
          )}
          <Button asChild variant={!isDeckEmpty ? "link" : "default"} size="lg">
            <Link href="/">Home</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const NoFlashcardsMessage = ({ deckId }: { deckId: string }) => {
  return (
    <DialogDescription>
      😅 Oops, no flashcards here!{` `}
      <Link
        href={{
          pathname: "/create-flashcard",
          query: { deckId },
        }}
      >
        Add some!
      </Link>
    </DialogDescription>
  );
};
