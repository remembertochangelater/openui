import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronRight, Terminal } from "lucide-react"

import { SiteShell } from "@/components/site-shell"
import { TablePreview } from "@/components/table-preview"

const installCommand = "npx shadcn@latest add https://ui.emstein.com/r/table.json"

const usageCode = `import { Table } from "@/components/emstein-ui/table"

const columns = [
  { key: "id", label: "ID", type: "shortText", width: 96 },
  { key: "user", label: "User", type: "longText", grow: 2 },
  { key: "score", label: "Score", type: "number", align: "right" },
]

export function UsersTable({ users }) {
  return (
    <Table
      data={users}
      columns={columns}
      getRowId={(row) => row.id}
    />
  )
}`

const primitiveCode = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/emstein-ui/table"

export function InvoicesTable() {
  return (
    <Table>
      <TableCaption>A list of invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}`

const widthCode = `const columns = [
  { key: "name", label: "Name", type: "text" },
  { key: "description", label: "Description", type: "longText", grow: 3 },
  { key: "net", label: "Net", type: "currency", align: "right", grow: false },
]

// Extra space is shared by growable columns.
// Too little space keeps min widths and uses horizontal scroll.`

const footerCode = `const columns = [
  { key: "collected", label: "Collected", type: "currency", footer: "$1,301.00" },
  { key: "cost", label: "Cost", type: "currency", footer: "$726.55" },
  {
    key: "net",
    label: "Net",
    type: "currency",
    align: "right",
    footer: ({ rows }) =>
      rows.reduce((total, row) => total + row.net, 0).toLocaleString(),
  },
]`

const selectionCode = `const [selectedRows, setSelectedRows] = React.useState<string[]>([])

<Table
  data={users}
  columns={columns}
  getRowId={(row) => row.id}
  selection={{
    selectedRows,
    onSelectedRowsChange: setSelectedRows,
  }}
/>`

const props = [
  ["data", "Rows to render."],
  ["columns", "Simple column config with key, label, type, width, render, and align."],
  ["column.type", "Width preset: text, longText, shortText, number, currency, date, status, or actions."],
  ["column.grow", "Controls how extra container width is shared. Text presets grow by default."],
  ["column.width", "Manual width override. Wins over the type preset."],
  ["column.minWidth", "Manual minimum width override. Wins over the type preset."],
  ["column.footer", "Footer content as a value or a function using data and rendered rows."],
  ["selection", "Adds checkbox selection with controlled or default selected rows."],
  ["resizable", "Enables column resizing. Default: true."],
  ["sortable", "Enables sorting. Default: true."],
  ["showUnsortedSortIcon", "Shows a muted chevron on sortable, unsorted columns."],
  ["initialSort", "Defaults to the first sortable column ascending. Use false to start unsorted."],
  ["scrollMode", "Use page scroll by default, or table scroll with scrollMode='table'."],
  ["caption", "Optional caption for the advanced data table."],
]

function CodeBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden border bg-card">
      <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-3">
        <span className="font-mono text-[0.68rem] font-medium text-muted-foreground">
          {label}
        </span>
        <span className="text-[0.6rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          TSX
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.78rem] leading-6 sm:p-5">
        <code>{children}</code>
      </pre>
    </div>
  )
}

function DocsRail() {
  const items = [
    ["preview", "Preview"],
    ["installation", "Installation"],
    ["usage", "Usage"],
    ["primitives", "Primitives"],
    ["configuration", "Configuration"],
    ["behavior", "Behavior"],
    ["props", "Props"],
  ]

  return (
    <nav aria-label="On this page">
      <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
        On this page
      </p>
      <div className="mt-4 space-y-1">
        {items.map(([id, label]) => (
          <Link
            key={id}
            href={`#${id}`}
            className="block border-l-2 border-transparent py-1.5 pl-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-6">
      <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}

export default function TableDocsPage() {
  return (
    <SiteShell active="table" rail={<DocsRail />}>
      <article className="mx-auto max-w-5xl">
        <header className="border-b pb-10 lg:pb-12">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/#components" className="hover:text-foreground">Components</Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground">Table</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="border border-primary/30 bg-primary/5 px-2 py-1 text-[0.62rem] font-semibold tracking-[0.12em] text-primary uppercase">
                  Component
                </span>
                <span className="text-xs text-muted-foreground">v1</span>
              </div>
              <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">Table</h1>
            </div>
            <Link
              href="/r/table.json"
              className="inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase hover:text-primary"
            >
              Registry source
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            A virtualized data table with sorting, resizing, row selection,
            growth-based widths, and the familiar shadcn primitive API.
          </p>
        </header>

        <section id="preview" className="border-b py-10 lg:py-12">
          <SectionHeading
            eyebrow="01 / Preview"
            title="Built for real datasets"
            description="The advanced API handles large collections while keeping the table structure and styling under your control."
          />
          <div className="overflow-hidden border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
              <span className="text-xs font-medium">Live preview</span>
              <span className="font-mono text-[0.65rem] text-muted-foreground">600 rows</span>
            </div>
            <TablePreview height={440} />
          </div>
        </section>

        <section id="installation" className="border-b py-10 lg:py-12">
          <SectionHeading
            eyebrow="02 / Installation"
            title="Add it to your project"
            description="The registry command installs the component source and its required dependencies."
          />
          <div className="flex min-w-0 items-center border bg-foreground text-background">
            <Terminal className="ml-4 size-4 shrink-0 opacity-60" />
            <code className="min-w-0 overflow-x-auto px-4 py-4 font-mono text-xs whitespace-nowrap sm:text-sm">
              {installCommand}
            </code>
          </div>
        </section>

        <section id="usage" className="border-b py-10 lg:py-12">
          <SectionHeading
            eyebrow="03 / Usage"
            title="Configure columns, pass rows"
            description="Use the compact column configuration for the common case. Types provide sensible sizing defaults and remain fully overridable."
          />
          <CodeBlock label="users-table.tsx">{usageCode}</CodeBlock>
        </section>

        <section id="primitives" className="border-b py-10 lg:py-12">
          <SectionHeading
            eyebrow="04 / Primitives"
            title="Drop down to plain markup"
            description="The same module also exports the familiar table primitives when you need direct control over every row and cell."
          />
          <CodeBlock label="invoices-table.tsx">{primitiveCode}</CodeBlock>
        </section>

        <section id="configuration" className="border-b py-10 lg:py-12">
          <SectionHeading
            eyebrow="05 / Configuration"
            title="Tune the data experience"
            description="Widths, summaries, and selection are opt-in configuration rather than separate table variants."
          />

          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-semibold">Column widths</h3>
              <p className="mt-2 mb-4 text-sm leading-6 text-muted-foreground">
                Presets handle common content sizes. Grow controls how remaining space is shared.
              </p>
              <CodeBlock label="column-widths.ts">{widthCode}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Footer values</h3>
              <p className="mt-2 mb-4 text-sm leading-6 text-muted-foreground">
                Pass static content or derive a summary from the currently rendered rows.
              </p>
              <CodeBlock label="table-footer.ts">{footerCode}</CodeBlock>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Row selection</h3>
              <p className="mt-2 mb-4 text-sm leading-6 text-muted-foreground">
                Add controlled checkbox selection without changing the column definition.
              </p>
              <CodeBlock label="row-selection.tsx">{selectionCode}</CodeBlock>
            </div>
          </div>
        </section>

        <section id="behavior" className="border-b py-10 lg:py-12">
          <SectionHeading eyebrow="06 / Behavior" title="Header interactions" />
          <div className="grid border sm:grid-cols-2">
            <div className="border-b p-5 sm:border-r sm:border-b-0">
              <p className="text-sm font-semibold">Sorting</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Click anywhere in a sortable header cell to switch between ascending and descending order.
              </p>
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold">Resizing</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Hover a header to reveal its resize divider, then drag to set an explicit width.
              </p>
            </div>
          </div>
        </section>

        <section id="props" className="pt-10 lg:pt-12">
          <SectionHeading
            eyebrow="07 / Reference"
            title="Props"
            description="The focused surface area for the advanced table API. Native table attributes remain available on primitive exports."
          />
          <div className="overflow-x-auto border bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b bg-muted/60 text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
                <tr>
                  <th className="w-52 px-4 py-3 font-semibold">Property</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map(([name, description]) => (
                  <tr key={name} className="border-b last:border-b-0">
                    <td className="px-4 py-3.5 align-top font-mono text-xs text-primary">{name}</td>
                    <td className="px-4 py-3.5 leading-6 text-muted-foreground">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </SiteShell>
  )
}
