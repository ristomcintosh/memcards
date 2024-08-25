import { NavBar } from "@/components/NavBar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <main className="flex-1 px-2">{children}</main>
    </div>
  )
}
