import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  DialogTitle as HeadlessDialogTitle,
} from "@headlessui/react"
import { PropsWithChildren } from "react"

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  title: string
}

export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
}: PropsWithChildren<DialogProps>) => {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 p-4 top-[7%] flex items-start justify-center">
        <HeadlessDialogPanel className="w-full max-w-sm px-6 py-6 bg-white rounded-lg shadow-lg border-2">
          <HeadlessDialogTitle className="text-xl text-center mb-2">
            {title}
          </HeadlessDialogTitle>
          {children}
        </HeadlessDialogPanel>
      </div>
    </HeadlessDialog>
  )
}
