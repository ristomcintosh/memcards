import { AppHeader } from "@/components/ui/app-header"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-full">
      <AppHeader />
      <main className="flex-1 px-2">{children}</main>
    </div>
  )
}
