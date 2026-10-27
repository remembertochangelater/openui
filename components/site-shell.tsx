import type { ReactNode } from "react"
import Link from "next/link"
import { Braces, FileJson2, House, Table2 } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

type SiteShellProps = {
  active: "overview" | "table"
  children: ReactNode
  rail?: ReactNode
}

const navigation = [
  {
    label: "Get started",
    links: [
      { id: "overview", label: "Overview", href: "/", icon: House },
    ],
  },
  {
    label: "Components",
    links: [
      { id: "table", label: "Table", href: "/docs/table", icon: Table2 },
    ],
  },
  {
    label: "Registry",
    links: [
      { id: "registry", label: "table.json", href: "/r/table.json", icon: FileJson2 },
      { id: "all", label: "registry.json", href: "/r/registry.json", icon: Braces },
    ],
  },
] as const

function Navigation({ active }: Pick<SiteShellProps, "active">) {
  return (
    <nav aria-label="Library navigation" className="space-y-7">
      {navigation.map((section) => (
        <div key={section.label}>
          <p className="mb-2 px-3 text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {section.label}
          </p>
          <div className="space-y-0.5">
            {section.links.map((item) => {
              const Icon = item.icon
              const isActive = item.id === active

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex h-9 items-center gap-2.5 border-l-2 px-3 text-sm transition-colors",
                    isActive
                      ? "border-primary bg-primary/6 font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.7} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}

export function SiteShell({ active, children, rail }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-background/95">
      <SiteHeader />

      <div className="border-b px-4 py-3 lg:hidden">
        <nav aria-label="Mobile navigation" className="flex gap-2 overflow-x-auto">
          <Link
            href="/"
            className={cn(
              "shrink-0 border px-3 py-2 text-xs font-semibold tracking-wide uppercase",
              active === "overview" ? "border-foreground bg-foreground text-background" : "text-muted-foreground"
            )}
          >
            Overview
          </Link>
          <Link
            href="/docs/table"
            className={cn(
              "shrink-0 border px-3 py-2 text-xs font-semibold tracking-wide uppercase",
              active === "table" ? "border-foreground bg-foreground text-background" : "text-muted-foreground"
            )}
          >
            Table
          </Link>
          <Link
            href="/r/registry.json"
            className="shrink-0 border px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
          >
            Registry
          </Link>
        </nav>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_224px]">
        <aside className="hidden border-r lg:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-8">
            <Navigation active={active} />
          </div>
        </aside>

        <main className="min-w-0 px-4 py-10 sm:px-8 lg:px-10 lg:py-14 xl:px-12">
          {children}
        </main>

        <aside className="hidden border-l xl:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-6 py-10">
            {rail}
          </div>
        </aside>
      </div>
    </div>
  )
}
