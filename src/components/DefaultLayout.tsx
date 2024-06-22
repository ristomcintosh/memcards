// import { Inter } from 'next/font/google'
import Link from "next/link"

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex-1 px-2">{children}</main>
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className="max-w-2xl px-4 py-4 text-lg dark:bg-zinc-700">
      <Link href="/">Memcards</Link>
    </nav>
  )
}
