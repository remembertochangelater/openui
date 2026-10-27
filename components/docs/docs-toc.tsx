"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TocItem = {
  id: string
  title: string
  depth?: 2 | 3
}

export function DocsToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = React.useState(items[0]?.id)

  React.useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null)

    // A heading becomes active once it crosses into the top third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-64px 0px -66% 0px" }
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3 text-sm">
      <p className="font-medium">On this page</p>
      <ul className="flex flex-col border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setActiveId(item.id)}
              aria-current={item.id === activeId ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1 transition-colors",
                item.depth === 3 ? "pl-6" : "pl-3",
                item.id === activeId
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
