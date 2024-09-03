import { cn } from "@/utils/misc"
import { inter } from "@/styles/fonts"
import "../styles/globals.css"
import { SetThemeScript } from "@/components/SetThemeScript"
import { Toaster } from "@/components/ui/toast/toaster"

export const metadata = {
  title: "Memcards",
  description: "A flashcard app built with Next.js and TailwindCSS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable, "h-full")}>
      <body className="h-full bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-50 text-zinc-800">
        <SetThemeScript />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
