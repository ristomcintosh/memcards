import Link from "next/link"

export default function Layout({
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
    <nav className="px-4 py-4 text-lg dark:bg-zinc-700 bg-zinc-50 shadow">
      <Link href="/">Memcards</Link>
    </nav>
  )
}
