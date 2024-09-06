import { LogoText } from "@/components/Logo"
import { Delete, Edit } from "@/components/menu-items"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, Settings } from "lucide-react"
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
      <main className="flex-1 px-4 overflow-x-hidden overflow-y-auto">
        <div className="flex flex-col min-h-full pt-4 pb-6">
          <h1 className="text-3xl text-center font-semibold break-words hyphens-auto">
            {title}
          </h1>
          <section className="flex items-center justify-center flex-1 flex-col sm:flex-row py-4">
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
  <header className=" bg-zinc-50 dark:bg-zinc-700 shadow">
    <div className="grid grid-cols-4 items-center p-4 gap-4 max-w-screen-xl mx-auto">
      <nav className="justify-self-start flex place-items-center">
        <Link href="/" aria-label="Home" className="text-inherit inline-block">
          <LogoText aria-hidden className="hidden sm:block sm:w-36" />
          <ChevronLeft
            className="text-inherit sm:hidden"
            size={40}
            aria-hidden
          />
        </Link>
      </nav>
      <ProgressBar progress={progress} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          aria-label="Flashcard Options"
          className="justify-self-end p-1 hover:bg-zinc-300 hover:rounded-full"
        >
          <Settings size={32} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuItem onSelect={() => editCard()}>
            <Edit />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => deleteCard()}>
            <Delete />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
)

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="col-span-2 justify-self-center w-full relative h-3 max-w-lg overflow-hidden bg-zinc-300 dark:bg-zinc-400 rounded-lg shadow-inner">
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
