import { deleteDeck } from "@/actions/actions";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Deck } from "@/types";

export const DeleteConfirmation = ({
  deck,
  handleClose,
}: {
  deck: Deck;
  handleClose: () => void;
}) => (
  <AlertDialog
    title={
      <span data-testid="delete-confirmation-title">
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
      await deleteDeck(deck.id);
      handleClose();
    }}
    onCancel={handleClose}
  />
);
