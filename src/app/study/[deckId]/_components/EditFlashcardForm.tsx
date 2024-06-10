import {
  DialogHeader,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog"

type EditFlashcardFormProps = {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}

export const EditFlashcardForm = ({
  isOpen,
  setOpen,
}: EditFlashcardFormProps) => {
  return (
    <Dialog defaultOpen open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Flashcard</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
