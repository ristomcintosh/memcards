import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogPanel,
  Description,
  DialogTitle,
} from "@headlessui/react"
import Link from "next/link"

export const Completed = ({ restart }: { restart: () => void }) => {
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
            <Button size="lg" onClick={restart}>
              Restart
            </Button>
            <Button asChild variant="link" size="lg">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
