import { ReactNode } from "react"
import {
  AlertDialogBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogFooterBase,
  AlertDialogTitleBase,
  AlertDialogCancelBase,
  AlertDialogActionBase,
  AlertDialogPortalBase,
} from "./alert-dialog-base"

type AlertDialogProps = {
  title: ReactNode
  onConfirm: () => void
  onCancel?: () => void
}

export function AlertDialog({ title, onConfirm, onCancel }: AlertDialogProps) {
  return (
    <AlertDialogBase defaultOpen>
      <AlertDialogPortalBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <AlertDialogTitleBase>{title}</AlertDialogTitleBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogCancelBase onClick={() => onCancel && onCancel()}>
              Cancel
            </AlertDialogCancelBase>
            <AlertDialogActionBase onClick={() => onConfirm()}>
              Continue
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogPortalBase>
    </AlertDialogBase>
  )
}
