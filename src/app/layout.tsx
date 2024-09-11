import { inter } from "@/styles/fonts"
import "../styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
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
    <html lang="en" className={inter.variable}>
      <body>
        <Analytics />
        <SetThemeScript />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
