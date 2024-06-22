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

export const Completed = ({ restart }: { restart: () => void }) => {
  return (
    <Dialog open={true}>
      <DialogContent closeIcon={false}>
        <DialogHeader>
          <DialogTitle>Congratulations! 🎉</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          You have successfully completed all the flashcards in this deck.
        </DialogDescription>
        <DialogFooter>
          <Button size="lg" onClick={restart}>
            Restart
          </Button>
          <Button asChild variant="link" size="lg">
            <Link href="/">Home</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
