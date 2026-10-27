import type { ComponentType } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { ComponentEntry } from "@/lib/docs"
import { cn } from "@/lib/utils"

function TableIllustration() {
  return (
    <div className="w-full max-w-64 overflow-hidden rounded-md border bg-background shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
      <div className="flex h-7 items-center gap-3 border-b bg-muted px-2.5">
        <span className="size-2.5 rounded-[3px] border border-foreground/20" />
        <span className="h-1.5 w-12 rounded-full bg-foreground/20" />
        <span className="ml-auto h-1.5 w-8 rounded-full bg-foreground/20" />
      </div>
      {[0.85, 0.6, 0.75, 0.5].map((width, index) => (
        <div key={index} className="flex h-7 items-center gap-3 border-b px-2.5 last:border-b-0">
          <span
            className={cn(
              "size-2.5 rounded-[3px] border border-foreground/20",
              index === 1 && "border-foreground bg-foreground"
            )}
          />
          <span
            className="h-1.5 rounded-full bg-foreground/15"
            style={{ width: `${width * 6}rem` }}
          />
          <span className="ml-auto h-1.5 w-6 rounded-full bg-foreground/15" />
        </div>
      ))}
    </div>
  )
}

const illustrations: Record<string, ComponentType> = {
  table: TableIllustration,
}

export function ComponentCard({ component }: { component: ComponentEntry }) {
  const Illustration = illustrations[component.name]

  return (
    <Link
      href={component.href}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20"
    >
      <div className="flex h-44 items-center justify-center border-b bg-muted/40 p-6">
        {Illustration ? <Illustration /> : null}
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{component.title}</h3>
          {component.label ? (
            <span className="rounded-full border px-1.5 py-px text-[0.625rem] font-medium text-muted-foreground">
              {component.label}
            </span>
          ) : null}
          <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{component.description}</p>
      </div>
    </Link>
  )
}

export function ComingSoonCard() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed p-6 text-center">
      <p className="font-medium">More on the way</p>
      <p className="max-w-56 text-sm leading-6 text-muted-foreground">
        New components land in the registry as they&apos;re ready.
      </p>
    </div>
  )
}
