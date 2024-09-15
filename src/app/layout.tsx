import { inter } from "@/styles/fonts"
import "../styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toast/toaster"
import { THEME_KEY } from "@/constants"

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

export function SetThemeScript() {
  const applyThemeScript = `
    (function () {
      const theme = localStorage.getItem("${THEME_KEY}")
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    })()
  `
  return <script dangerouslySetInnerHTML={{ __html: applyThemeScript }} />
}
