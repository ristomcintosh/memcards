"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEME_KEY } from "@/constants";

export function ThemeToggle() {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setThemeMode("dark")}
        title="Toggles light & dark theme"
        className="dark:hidden"
        aria-label={"Switch to dark mode"}
      >
        <SunMedium className="w-6 h-6" aria-hidden />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setThemeMode("light")}
        title="Toggles light & dark theme"
        className="hidden dark:block"
        aria-label={"Switch to light mode"}
      >
        <MoonStar className="w-6 h-6" aria-hidden />
      </Button>
    </>
  );
}

function setThemeMode(themeMode: "light" | "dark") {
  const isDarkModeEnabled = themeMode === "dark";
  document.documentElement.classList.toggle("dark", isDarkModeEnabled);
  localStorage.setItem(THEME_KEY, isDarkModeEnabled ? "dark" : "light");
}
