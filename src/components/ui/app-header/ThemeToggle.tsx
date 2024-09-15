"use client"
import { THEME_KEY } from "@/constants"
import { MoonStar, SunMedium } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const handleDarkModeToggle = (
  isDarkMode: boolean,
  setDarkMode: (arg: boolean) => void,
) => {
  console.log("Dark mode toggled")
  if (isDarkMode) {
    document.documentElement.classList.remove("dark")
    setDarkMode(false)
    localStorage.setItem(THEME_KEY, "light")
  } else {
    document.documentElement.classList.add("dark")
    setDarkMode(true)
    localStorage.setItem(THEME_KEY, "dark")
  }
}

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>()

  useEffect(() => {
    setIsDarkMode(localStorage.getItem(THEME_KEY) === "dark")
  }, [])

  if (isDarkMode === undefined) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleDarkModeToggle(isDarkMode, setIsDarkMode)}
      title="Toggles light & dark theme"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <MoonStar className="w-6 h-6" aria-hidden />
      ) : (
        <SunMedium className="w-6 h-6" aria-hidden />
      )}
    </Button>
  )
}
