import Link from "next/link"
import { DarkModeToggle } from "./DarkModeToggle"
import { LogoText } from "./Logo"
import { Logout } from "@/features/home-page/Logout"

export function NavBar() {
  return (
    <header className="dark:bg-zinc-700 bg-zinc-50 shadow">
      <div className="flex justify-between items-center px-4 py-4 text-lg max-w-screen-xl mx-auto">
        <nav className="w-full max-w-28 sm:max-w-28">
          <Link href="/" aria-label="Home">
            <LogoText aria-hidden />
          </Link>
        </nav>
        <div className="flex items-center gap-x-2">
          <DarkModeToggle />
          <Logout />
        </div>
      </div>
    </header>
  )
}
