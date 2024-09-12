import { LogoText } from "@/components/Logo"
import { Delete, Edit } from "@/components/menu-items"
import { Button } from "@/components/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, PencilLine, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

export type StudyHeaderProps = {
  progress: number
  deleteCard: () => void
  editCard: () => void
}

export const StudyHeader = ({
  progress,
  deleteCard,
  editCard,
}: StudyHeaderProps) => (
  <header className="bg-surface-light dark:bg-surface-dark shadow">
    <div className="grid grid-cols-6 sm:grid-cols-4 items-center py-2 px-4 sm:p-4 gap-4 max-w-screen-xl mx-auto">
      <nav className="justify-self-start flex place-items-center">
        <Link href="/" aria-label="Home" className="text-inherit inline-block">
          <LogoText aria-hidden className="hidden sm:block sm:max-w-28" />
          <ChevronLeft
            className="text-inherit sm:hidden"
            size={32}
            aria-hidden
          />
        </Link>
      </nav>
      <ProgressBar progress={progress} />
      <div className=" sm:block hidden">
        <menu className="flex gap-x-1 justify-end">
          <li>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Edit"
              onClick={() => editCard()}
            >
              <PencilLine />
            </Button>
          </li>
          <li>
            <Button
              variant="destructiveSecondary"
              size="icon"
              onClick={() => deleteCard()}
              aria-label="Delete"
            >
              <Trash2 />
            </Button>
          </li>
        </menu>
      </div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          aria-label="Flashcard Options"
          className="sm:hidden justify-self-end flex"
        >
          <Settings size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuItem onSelect={() => editCard()}>
            <Edit />
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => deleteCard()}
            className="text-destructive-500 focus:text-destructive-600 dark:text-destructive-400 dark:focus:text-destructive-400"
          >
            <Delete />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
)

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="col-span-4 sm:col-span-2 justify-self-center w-full relative h-3 max-w-lg overflow-hidden bg-zinc-300 dark:bg-zinc-400 rounded-lg shadow-inner">
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
