import { useCallback, useState } from "react"
import { RenameDeckForm } from "./RenameDeckForm"
import { DeleteConfirmation } from "./DeleteConfirmation"
import { DeckWithCardCount } from "@/types"

export type ModalType = "rename" | "delete" | null

export function useModalState() {
  const [modalType, setModalType] = useState<ModalType>(null)

  const openModal = useCallback((type: ModalType) => setModalType(type), [])

  const closeModal = useCallback(() => setModalType(null), [])

  return { modalType, closeModal, openModal }
}

type ModalManagerProps = {
  modalType: ModalType
  deck: DeckWithCardCount | null
  closeModal: () => void
}

export const ModalManager = ({
  modalType,
  closeModal,
  deck,
}: ModalManagerProps) => {
  if (!deck) return null

  switch (modalType) {
    case "rename":
      return <RenameDeckForm deck={deck} closeForm={() => closeModal()} />
    case "delete":
      return <DeleteConfirmation deck={deck} handleClose={() => closeModal()} />
    default:
      return null
  }
}
