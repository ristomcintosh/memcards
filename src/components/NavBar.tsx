import Link from "next/link"
import { DarkModeToggle } from "./DarkModeToggle"
import { LogoText } from "./Logo"

export function NavBar() {
  return (
    <header className="dark:bg-zinc-700 bg-zinc-50 shadow">
      <div className="flex justify-between items-center px-4 py-4 text-lg max-w-screen-xl mx-auto">
        <nav className="w-28 sm:w-36">
          <Link href="/" aria-label="Home">
            <LogoText aria-hidden />
          </Link>
        </nav>
        <DarkModeToggle />
      </div>
    </header>
  )
}
