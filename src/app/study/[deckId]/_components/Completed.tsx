import { Button } from "@/components/Button"
import {
  Dialog,
  DialogPanel,
  Description,
  DialogTitle,
} from "@headlessui/react"
import Link from "next/link"

export const Completed = () => {
  return (
    <Dialog onClose={() => {}} open={true}>
      <div className="fixed bg-black/30 inset-0 p-4 flex items-center justify-center">
        <DialogPanel
          style={{ minHeight: "250px" }}
          className="w-full max-w-lg px-9 py-6 bg-white rounded shadow-lg border-2 flex flex-col justify-center"
        >
          <DialogTitle className="text-2xl text-center mb-3">
            Congratulations! 🎉
          </DialogTitle>
          <Description className="text-xl text-center mb-5">
            You have successfully completed all the flashcards in this deck.
          </Description>
          <div className="flex justify-evenly">
            <Button onClick={() => {}}>Restart</Button>
            <Link
              href="/"
              style={{ minWidth: 44, minHeight: 44 }}
              className="border-2 border-brand-600 px-4 py-1 rounded shadow no-underline md:h-auto text-2xl md:text-xl h-12"
            >
              Home
            </Link>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
