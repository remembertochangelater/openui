"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  className,
  label = "Copy code",
}: {
  value: string
  className?: string
  label?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:size-3.5",
        className
      )}
    >
      {copied ? <Check /> : <Copy />}
    </button>
  )
}
