"use client"
import { THEME_KEY } from "@/constants"
import { MoonStar, SunMedium } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "./ui"

const handleDarkModeToggle = (
  evt: ChangeEvent<HTMLInputElement>,
  setDarkMode: (arg: boolean) => void,
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
    <Button asChild variant="ghost" size="sm">
      <div>
        <input
          id="toggle-theme"
          aria-label="Toggle Theme"
          onChange={(evt) => handleDarkModeToggle(evt, setIsDarkMode)}
          type="checkbox"
          checked={isDarkMode}
          className="sr-only"
          aria-describedby="theme-value"
        />
        <label htmlFor="toggle-theme" className="cursor-pointer">
          <div className="flex items-center gap-1" aria-hidden>
            {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </div>
        </label>
        <p className="sr-only" id="theme-value">
          {isDarkMode ? "Dark" : "Light"}
        </p>
      </div>
    </Button>
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
