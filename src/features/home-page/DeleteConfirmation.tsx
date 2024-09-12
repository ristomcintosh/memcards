import { deleteDeck } from "@/actions/actions"
import { Deck } from "@/types"
import { AlertDialog } from "@/components/ui"

export const DeleteConfirmation = ({
  deck,
  handleClose,
}: {
  deck: Deck
  handleClose: () => void
}) => (
  <AlertDialog
    title={
      <span>
        <span>Are you sure you want to delete </span>
        <div>
          <span className="text-destructive-700 text-xl dark:text-destructive-400">
            {deck.name}
          </span>
          <span>?</span>
        </div>
      </span>
    }
    onConfirm={async () => {
      await deleteDeck(deck.id)
      handleClose()
    }}
    onCancel={handleClose}
  />
)
