"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export function CodeCollapsible({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="relative">
      <div className={cn(!expanded && "max-h-80 overflow-hidden")}>{children}</div>
      <div
        className={cn(
          "flex justify-center",
          expanded
            ? "border-t py-2"
            : "absolute inset-x-0 bottom-0 h-28 items-end bg-linear-to-t from-code via-code/80 to-transparent pb-4"
        )}
      >
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="h-8 rounded-md border bg-background px-3 text-xs font-medium shadow-xs transition-colors hover:bg-accent"
        >
          {expanded ? "Collapse" : "Expand code"}
        </button>
      </div>
    </div>
  )
}
