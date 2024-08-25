import Link from "next/link"

export function NavBar() {
  return (
    <nav className="px-4 py-4 text-lg dark:bg-zinc-700 bg-zinc-50 shadow">
      <Link href="/">Memcards</Link>
    </nav>
  )
}
