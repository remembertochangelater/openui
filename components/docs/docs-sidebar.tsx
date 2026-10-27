"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { docsNav } from "@/lib/docs"
import { cn } from "@/lib/utils"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      {docsNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-0.5">
          <p className="px-2 pb-1.5 text-xs font-medium text-muted-foreground">
            {section.title}
          </p>
          {section.items.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors",
                  active
                    ? "bg-accent font-medium text-foreground"
                    : "text-foreground/70 hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <span className="truncate">{item.title}</span>
                {item.label ? (
                  <span className="ml-auto rounded-full border px-1.5 py-px text-[0.625rem] font-medium text-muted-foreground">
                    {item.label}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
