import { THEME_KEY } from "@/constants"

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
