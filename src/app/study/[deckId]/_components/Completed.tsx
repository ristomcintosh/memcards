import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

type CompletedProps = {
  restart: () => void
  totalCards: number
}

export const Completed = ({ restart, totalCards }: CompletedProps) => {
  return (
    <Dialog open={true}>
      <DialogContent closeIcon={false} data-testid="completed-modal">
        <DialogHeader>
          <DialogTitle>Congratulations! 🎉</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          You have successfully completed all the flashcards in this deck.
        </DialogDescription>
        <DialogFooter>
          {totalCards > 0 && (
            <Button size="lg" onClick={restart}>
              Restart
            </Button>
          )}
          <Button
            asChild
            variant={totalCards > 0 ? "link" : "default"}
            size="lg"
          >
            <Link href="/">Home</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
