import { cn } from "@/utils/misc"
import { inter } from "@/styles/fonts"
import "../styles/globals.css"

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
    <html
      lang="en"
      className={cn(
        inter.variable,
        "h-full bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-50 text-zinc-800"
      )}
    >
      <body className="h-full">{children}</body>
    </html>
  )
}
