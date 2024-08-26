"use client"
import { THEME_KEY } from "@/constants"
import { MoonStar, SunMedium } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"

const handleDarkModeToggle = (
  evt: ChangeEvent<HTMLInputElement>,
  setDarkMode: (arg: boolean) => void
) => {
  if (evt.target.checked) {
    document.documentElement.classList.add("dark")
    setDarkMode(true)
    localStorage.setItem(THEME_KEY, "dark")
  } else {
    document.documentElement.classList.remove("dark")
    setDarkMode(false)
    localStorage.setItem(THEME_KEY, "light")
  }
}

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>()

  useEffect(() => {
    setIsDarkMode(localStorage.getItem(THEME_KEY) === "dark")
  }, [])

  if (isDarkMode === undefined) {
    return null
  }

  return (
    <label
      className="focus-within:outline-2 outline-offset-4 focus-within:outline focus-within:outline-brand-400"
      aria-label="Toggle Theme"
    >
      <input
        id="toggle-theme"
        onChange={(evt) => handleDarkModeToggle(evt, setIsDarkMode)}
        type="checkbox"
        checked={isDarkMode}
        className="sr-only"
      />
      <div className="flex items-center gap-1">
        {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
      </div>
    </label>
  )
}

const LightModeIcon = () => (
  <>
    <SunMedium className="w-6 h-6" />
    <span>Light</span>
  </>
)

const DarkModeIcon = () => (
  <>
    <MoonStar className="w-6 h-6" />
    <span>Dark</span>
  </>
)
