import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Logo } from "@/components/logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Logo className="size-5 shrink-0" />
          <span>emstein ui</span>
        </Link>

        <span className="mx-4 hidden h-5 w-px bg-border sm:block" />

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary navigation">
          <Link
            href="/docs/table"
            className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
          <Link
            href="/r/registry.json"
            className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Registry
          </Link>
        </nav>

        <Link
          href="/r/table.json"
          className="ml-auto inline-flex h-9 items-center gap-2 bg-foreground px-4 text-xs font-semibold tracking-[0.08em] text-background uppercase transition-opacity hover:opacity-80"
        >
          Get component
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </header>
  )
}
