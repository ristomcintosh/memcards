import Link from "next/link"
import { DarkModeToggle } from "./DarkModeToggle"

export function NavBar() {
  return (
    <header className="flex justify-between px-4 py-4 text-lg dark:bg-zinc-700 bg-zinc-50 shadow">
      <nav>
        <Link href="/">Memcards</Link>
      </nav>
      <DarkModeToggle />
    </header>
  )
}
