"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { isMainNavActive, mainNav } from "@/lib/docs"
import { cn } from "@/lib/utils"

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className={cn("items-center gap-1", className)}>
      {mainNav.map((item) => {
        const active = isMainNavActive(item.href, pathname)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
              active ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
