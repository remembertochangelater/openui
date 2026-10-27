import Link from "next/link"
import { ArrowRight, Check, FileJson2, Table2 } from "lucide-react"

import { SiteShell } from "@/components/site-shell"
import { TablePreview } from "@/components/table-preview"
import { Button } from "@/components/ui/button"

const installCommand = "npx shadcn@latest add https://ui.emstein.com/r/table.json"

function LibraryRail() {
  return (
    <div className="space-y-8 text-sm">
      <div>
        <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          Library status
        </p>
        <dl className="mt-4 space-y-3">
          <div className="flex items-center justify-between border-b pb-3">
            <dt className="text-muted-foreground">Components</dt>
            <dd className="font-mono text-xs">01</dd>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <dt className="text-muted-foreground">Framework</dt>
            <dd className="font-mono text-xs">React</dd>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <dt className="text-muted-foreground">Install</dt>
            <dd className="font-mono text-xs">shadcn</dd>
          </div>
        </dl>
      </div>

      <div>
        <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          Built for
        </p>
        <ul className="mt-4 space-y-3 text-muted-foreground">
          {["Source ownership", "Practical defaults", "Full customization"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-3.5 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <SiteShell active="overview" rail={<LibraryRail />}>
      <div className="mx-auto max-w-5xl">
        <section className="border-b pb-12 lg:pb-16">
          <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            <span className="size-1.5 bg-primary" />
            Open component registry
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
            Sharp components for serious interfaces.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Shadcn-compatible React components with practical defaults, clean
            APIs, and source code that stays in your project.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/docs/table">
                Browse components
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/r/registry.json">
                <FileJson2 data-icon="inline-start" />
                View registry
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex min-w-0 items-center border bg-muted/70">
            <span className="hidden border-r px-4 py-3 text-[0.65rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:block">
              Install
            </span>
            <code className="min-w-0 overflow-x-auto px-4 py-3 font-mono text-xs whitespace-nowrap sm:text-sm">
              {installCommand}
            </code>
          </div>
        </section>

        <section id="components" className="pt-12 lg:pt-16">
          <div className="mb-7 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Browse library
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Components
              </h2>
            </div>
            <span className="font-mono text-xs text-muted-foreground">01 total</span>
          </div>

          <article className="overflow-hidden border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center border bg-muted">
                  <Table2 className="size-4" />
                </span>
                <div>
                  <h3 className="font-semibold">Table</h3>
                  <p className="text-xs text-muted-foreground">Data display</p>
                </div>
              </div>
              <span className="border px-2 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-primary uppercase">
                Available
              </span>
            </div>

            <div className="bg-muted/40 p-3 sm:p-5">
              <div className="overflow-hidden border bg-background">
                <TablePreview height={360} />
              </div>
            </div>

            <div className="flex flex-col gap-5 border-t px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Virtualized rows, sorting, resizing, optional selection, and
                growth-based column widths in one focused API.
              </p>
              <Link
                href="/docs/table"
                className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase hover:text-primary"
              >
                View component
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>
        </section>
      </div>
    </SiteShell>
  )
}
