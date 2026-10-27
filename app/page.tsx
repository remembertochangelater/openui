import Link from "next/link"
import {
  ArrowDownUp,
  ArrowRight,
  Check,
  ListChecks,
  MoveHorizontal,
  Rows3,
  Ruler,
  Sigma,
  Table2,
} from "lucide-react"

import { CodeBlock } from "@/components/docs/code-block"
import { CommandTabs } from "@/components/docs/command-tabs"
import { CopyButton } from "@/components/docs/copy-button"
import { Example } from "@/components/examples"
import { Button } from "@/components/ui/button"
import { shadcnCommand, siteConfig } from "@/lib/site"

const addCommand = `npx shadcn@latest add ${siteConfig.namespace}/table`

const features = [
  {
    icon: Rows3,
    title: "Virtualized rows",
    description:
      "Thousands of rows stay smooth because only the visible ones are rendered, with page or container scrolling.",
  },
  {
    icon: ArrowDownUp,
    title: "Sorting",
    description: "Click any header to sort. Choose the starting column, or start unsorted.",
  },
  {
    icon: MoveHorizontal,
    title: "Column resizing",
    description:
      "Drag a header edge to resize. Columns trade width with their neighbor, so layouts hold.",
  },
  {
    icon: ListChecks,
    title: "Row selection",
    description:
      "An opt-in checkbox column with controlled or uncontrolled state, keyed by your row ids.",
  },
  {
    icon: Ruler,
    title: "Smart column widths",
    description:
      "Width presets for each column type, with extra space shared by a grow factor.",
  },
  {
    icon: Sigma,
    title: "Footer summaries",
    description: "Static footer content, or totals computed from the sorted rows.",
  },
]

const usageCode = `import { Table, type EmsteinUITableColumn } from "@/components/emstein-ui/table"

const columns: EmsteinUITableColumn<Invoice>[] = [
  { key: "customer", label: "Customer", type: "longText" },
  { key: "status", label: "Status", type: "status" },
  { key: "amount", label: "Amount", type: "currency", align: "right" },
]

export function Invoices({ invoices }: { invoices: Invoice[] }) {
  return (
    <Table
      data={invoices}
      columns={columns}
      getRowId={(invoice) => invoice.id}
      selection={{}}
    />
  )
}`

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-60" />
        <div className="page-container flex flex-col items-center pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
          <Link
            href="/docs/installation"
            className="group inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-2.5 pl-3 text-xs font-medium shadow-xs backdrop-blur transition-colors hover:bg-accent sm:text-sm"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Listed in the shadcn registry directory
            <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tighter text-balance sm:text-5xl lg:text-6xl">
            Production-grade components for shadcn/ui
          </h1>
          <p className="mt-5 max-w-xl text-base text-balance text-muted-foreground sm:text-lg">
            Shadcn-compatible React components with practical defaults and focused APIs. Install
            them with the CLI and own every line of source.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/docs">
                Get started
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/docs/components">Browse components</Link>
            </Button>
          </div>

          <div className="mt-6 flex max-w-full items-center gap-2 rounded-lg border bg-background/80 py-1 pr-1 pl-3.5 shadow-xs backdrop-blur">
            <span className="font-mono text-xs text-muted-foreground select-none">$</span>
            <code className="min-w-0 truncate font-mono text-xs sm:text-sm">{addCommand}</code>
            <CopyButton value={addCommand} label="Copy install command" />
          </div>
        </div>
      </section>

      <section aria-label="Live demo" className="page-container pb-20 sm:pb-28">
        <div className="relative isolate mx-auto max-w-6xl">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 -top-6 bottom-10 -z-10 rounded-[2rem] bg-foreground/[0.04] blur-2xl"
          />
          <div className="rounded-2xl border bg-card p-2 shadow-xl shadow-black/[0.04] sm:p-3 dark:shadow-black/40">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 pt-1 pb-3 sm:px-2.5">
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                <Table2 className="size-4 text-muted-foreground" />
                Team members
              </span>
              <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground tabular-nums">
                1,000 rows
              </span>
              <span className="ml-auto hidden text-xs text-muted-foreground sm:block">
                Live preview: sort, resize, and select
              </span>
            </div>
            <Example name="table-demo" />
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="page-container py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Everything a data table needs
            </h2>
            <p className="mt-4 text-base text-balance text-muted-foreground sm:text-lg">
              Built on TanStack Table and TanStack Virtual, with the details handled for you.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="bg-background p-6 sm:p-8">
                <div className="grid size-10 place-items-center rounded-lg border bg-muted/50">
                  <feature.icon className="size-[1.125rem]" />
                </div>
                <h3 className="mt-5 font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="page-container grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="mx-auto max-w-xl lg:mx-0">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              One command. Your code.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              The shadcn CLI writes the component into your project along with its dependencies.
              From there it&apos;s yours: typed, readable, and styled with your theme tokens.
            </p>
            <ul className="mt-8 flex flex-col gap-3 text-sm">
              {[
                "Typed column definitions",
                "Matches your shadcn/ui theme, including dark mode",
                "Drop down to table primitives whenever you need to",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-background">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <CommandTabs commands={shadcnCommand(`add ${siteConfig.namespace}/table`)} />
            <CodeBlock code={usageCode} title="invoices.tsx" />
          </div>
        </div>
      </section>

      <section className="page-container pb-20 sm:pb-28">
        <div className="relative isolate mx-auto flex max-w-6xl flex-col items-center overflow-hidden rounded-2xl border bg-muted/40 px-6 py-14 text-center sm:py-20">
          <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-40" />
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Start building with {siteConfig.name}
          </h2>
          <p className="mt-4 max-w-lg text-base text-balance text-muted-foreground">
            Read the docs, try the live examples, and add your first component in under a minute.
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/docs">
                Read the docs
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/docs/components/table">View the table</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
