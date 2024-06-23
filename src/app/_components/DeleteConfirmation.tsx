import { deleteDeck } from "@/actions/actions"
import { Deck } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const DeleteConfirmation = ({
  deck,
  handleVisibility: handleVisibility,
  open,
}: {
  deck: Deck
  handleVisibility: (show: boolean) => void
  open: boolean
}) => {
  return (
    <Dialog open={open} onOpenChange={handleVisibility}>
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
          <Button variant="destructive" onClick={() => deleteDeck(deck.id)}>
            Yes
          </Button>
          <Button onClick={() => handleVisibility(false)} variant="ghost">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
