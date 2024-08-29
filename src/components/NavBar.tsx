import Link from "next/link"
import { DarkModeToggle } from "./DarkModeToggle"

export function NavBar() {
  return (
    <header className="dark:bg-zinc-700 bg-zinc-50 shadow">
      <div className="flex justify-between px-4 py-4 text-lg max-w-screen-xl mx-auto">
        <nav>
          <Link href="/">Memcards</Link>
        </nav>
        <DarkModeToggle />
      </div>
    </header>
  )
}
