import { VerticalDots } from "@/components/VerticalDots"
import { Delete, Edit } from "@/components/menu-items"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { PropsWithChildren } from "react"

type OnFlip = () => void
type OnNextCard = () => void
type Progress = number
type DeleteCard = () => void
type EditCard = () => void

type StudyContainerProps = {
  title: string
  progress: Progress
  flipCard: OnFlip
  nextCard: OnNextCard
  deleteCard: DeleteCard
  editCard: EditCard
}

export function StudyContainer({
  title,
  deleteCard,
  editCard,
  nextCard,
  flipCard,
  progress,
  children,
}: PropsWithChildren<StudyContainerProps>) {
  return (
    <div className="flex flex-col h-screen">
      <Header progress={progress} deleteCard={deleteCard} editCard={editCard} />
      <main className="flex-1 px-2 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col min-h-full pt-4 pb-6">
          <h1 className="text-3xl text-center font-semibold">{title}</h1>
          <section className="flex items-center justify-center flex-1">
            {children}
          </section>
        </div>
      </main>
      <Footer onFlip={flipCard} onNextCard={nextCard} />
    </div>
  )
}

const Header = ({
  progress,
  deleteCard,
  editCard,
}: {
  progress: Progress
  deleteCard: DeleteCard
  editCard: EditCard
}) => (
  <header className=" bg-zinc-50 dark:bg-zinc-700  shadow">
    <div className="flex items-center justify-between p-4 gap-4 max-w-screen-xl mx-auto">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          aria-label="Flashcard Options"
          className="w-8 h-8 p-1 hover:bg-zinc-300 hover:rounded-full"
        >
          <VerticalDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => editCard()}>
            <Edit />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => deleteCard()}>
            <Delete />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProgressBar progress={progress} />
      <nav>
        <Link href="/" className="text-inherit hover:no-underline">
          Home
        </Link>
      </nav>
    </div>
  </header>
)

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="relative flex-1 h-3 max-w-lg overflow-hidden bg-zinc-300 dark:bg-zinc-400 rounded-lg shadow-inner">
    <div
      role="progressbar"
      aria-label="Progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="absolute inset-y-0 bg-gradient-to-tr from-brand-500 to-brand-100"
      style={{
        width: progress + "%",
      }}
    ></div>
  </div>
)

const Footer = ({
  onFlip,
  onNextCard,
}: {
  onFlip: OnFlip
  onNextCard: OnNextCard
}) => (
  <footer className="py-3 dark:bg-zinc-700 dark:border-t-zinc-400/80 bg-zinc-50 border-t">
    <div className="flex justify-around max-w-md mx-auto">
      <Button size="lg" variant="outline" onClick={onFlip}>
        Flip
      </Button>
      <Button size="lg" onClick={onNextCard}>
        Next
      </Button>
    </div>
  </footer>
)
