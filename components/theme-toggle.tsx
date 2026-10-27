"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

function setTheme(theme: "light" | "dark") {
  const root = document.documentElement
  // Suppress color transitions so the whole page switches in one frame.
  const style = document.createElement("style")
  style.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.appendChild(style)

  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme

  try {
    localStorage.setItem("theme", theme)
  } catch {}

  window.getComputedStyle(document.body).opacity
  requestAnimationFrame(() => style.remove())
}

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle theme"
      onClick={() =>
        setTheme(
          document.documentElement.classList.contains("dark") ? "light" : "dark"
        )
      }
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  )
}
