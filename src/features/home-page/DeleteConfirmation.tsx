import { deleteDeck } from "@/actions/actions"
import { Deck } from "@/types"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const DeleteConfirmation = ({
  deck,
  handleClose,
}: {
  deck: Deck
  handleClose: () => void
}) => {
  return (
    <Dialog defaultOpen onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle data-testid="delete-confirmation-title">
            <span>Are you sure you want to delete </span>
            <span className="block">
              <span className="text-red-500 text-xl dark:text-red-700">
                {deck.name}
              </span>
              <span>?</span>
            </span>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse">
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteDeck(deck.id)
              handleClose()
            }}
          >
            Yes
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
