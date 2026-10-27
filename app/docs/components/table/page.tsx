import type { Metadata } from "next"
import { readFile } from "node:fs/promises"
import path from "node:path"

import { CodeBlock } from "@/components/docs/code-block"
import { CommandTabs } from "@/components/docs/command-tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import {
  DocsHeading,
  DocsPage,
  DocsPageHeader,
  DocsPager,
  DocsText,
  InlineCode,
  Step,
  Steps,
} from "@/components/docs/docs-page"
import {
  DocsTabs,
  DocsTabsContent,
  DocsTabsList,
  DocsTabsTrigger,
} from "@/components/docs/docs-tabs"
import type { TocItem } from "@/components/docs/docs-toc"
import { PropsTable, type PropDefinition } from "@/components/docs/props-table"
import { installCommand, shadcnCommand, siteConfig } from "@/lib/site"

const description =
  "A virtualized data table with sorting, resizing, row selection, and growth-based column widths, plus the familiar shadcn table primitives."

export const metadata: Metadata = {
  title: "Table",
  description,
}

const toc: TocItem[] = [
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
  { id: "sorting-and-resizing", title: "Sorting and resizing" },
  { id: "scroll-modes", title: "Scroll modes" },
  { id: "examples", title: "Examples" },
  { id: "row-selection", title: "Row selection", depth: 3 },
  { id: "footer", title: "Footer", depth: 3 },
  { id: "primitives", title: "Primitives", depth: 3 },
  { id: "column-widths", title: "Column widths" },
  { id: "api-reference", title: "API Reference" },
  { id: "table-props", title: "Table", depth: 3 },
  { id: "column-props", title: "Column", depth: 3 },
  { id: "selection-props", title: "Selection", depth: 3 },
]

const importCode = `import { Table, type EmsteinUITableColumn } from "@/components/emstein-ui/table"`

const usageCode = `type User = {
  id: string
  name: string
  email: string
  score: number
}

const columns: EmsteinUITableColumn<User>[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "longText" },
  { key: "score", label: "Score", type: "number", align: "right" },
]

export function UsersTable({ users }: { users: User[] }) {
  return <Table data={users} columns={columns} getRowId={(user) => user.id} />
}`

const scrollCode = `<Table
  data={rows}
  columns={columns}
  scrollMode="table"
  tableHeight={480}
/>`

const widthCode = `const columns: EmsteinUITableColumn<Payout>[] = [
  { key: "name", label: "Name", type: "text" },
  // Takes three shares of any extra space.
  { key: "description", label: "Description", type: "longText", grow: 3 },
  // Fixed at 140px: never grows, still resizable.
  { key: "net", label: "Net", type: "currency", align: "right", width: 140, grow: false },
]`

const widthPresets = [
  ["text", 180, 120, "1"],
  ["longText", 280, 180, "2"],
  ["shortText", 140, 96, "0.5"],
  ["number", 104, 80, "0"],
  ["currency", 124, 96, "0"],
  ["date", 132, 112, "0"],
  ["status", 128, 104, "0"],
  ["actions", 72, 56, "0"],
] as const

const tableProps: PropDefinition[] = [
  { name: "data", type: "TData[]", required: true, description: "Rows to render." },
  {
    name: "columns",
    type: "EmsteinUITableColumn<TData>[]",
    required: true,
    description: "Column definitions. See Column below.",
  },
  {
    name: "getRowId",
    type: "(row: TData, index: number) => string",
    default: "row index",
    description: "Returns a stable id for each row. Selection state is keyed by this id.",
  },
  {
    name: "selection",
    type: "EmsteinUITableSelection",
    description: "Adds a checkbox column. See Selection below.",
  },
  {
    name: "sortable",
    type: "boolean",
    default: "true",
    description: "Enables sorting for every column that doesn't opt out.",
  },
  {
    name: "initialSort",
    type: '{ key: string; direction?: "asc" | "desc" } | false',
    description: (
      <>
        The starting sort. Defaults to the first sortable column, ascending. Pass{" "}
        <InlineCode>false</InlineCode> to start unsorted.
      </>
    ),
  },
  {
    name: "showUnsortedSortIcon",
    type: "boolean",
    default: "false",
    description: "Shows a muted chevron on sortable columns that aren't sorted.",
  },
  {
    name: "resizable",
    type: "boolean",
    default: "true",
    description: "Enables resizing by dragging the edge of a header cell.",
  },
  {
    name: "scrollMode",
    type: '"page" | "table"',
    default: '"page"',
    description: "Virtualize rows against the window, or inside a fixed-height scroll container.",
  },
  {
    name: "tableHeight",
    type: "number",
    default: "560",
    description: (
      <>
        Height of the scroll container when <InlineCode>scrollMode</InlineCode> is{" "}
        <InlineCode>&quot;table&quot;</InlineCode>.
      </>
    ),
  },
  {
    name: "rowHeight",
    type: "number",
    default: "56",
    description: "Row height in pixels, used for virtualization.",
  },
  {
    name: "emptyText",
    type: "string",
    default: '"No results."',
    description: "Shown when there are no rows.",
  },
  { name: "caption", type: "ReactNode", description: "Optional caption for the table." },
  {
    name: "className",
    type: "string",
    description: (
      <>
        Classes for the outer container. <InlineCode>containerClassName</InlineCode> is an alias.
      </>
    ),
  },
  {
    name: "tableClassName",
    type: "string",
    description: (
      <>
        Also available: <InlineCode>headerClassName</InlineCode>,{" "}
        <InlineCode>bodyClassName</InlineCode>, <InlineCode>footerClassName</InlineCode>, and{" "}
        <InlineCode>captionClassName</InlineCode>.
      </>
    ),
  },
]

const columnProps: PropDefinition[] = [
  {
    name: "key",
    type: "keyof TData | string",
    required: true,
    description: "Property to read from each row. Also used as the column id.",
  },
  { name: "label", type: "string", required: true, description: "Header text." },
  {
    name: "type",
    type: '"text" | "longText" | "shortText" | "number" | "currency" | "date" | "status" | "actions"',
    default: '"text"',
    description: "Width preset. See Column widths.",
  },
  {
    name: "render",
    type: "(row: TData) => ReactNode",
    description: "Custom cell content. Sorting still uses the raw value.",
  },
  {
    name: "align",
    type: '"left" | "center" | "right"',
    default: '"left"',
    description: "Alignment for the header, cells, and footer.",
  },
  { name: "width", type: "number", default: "preset", description: "Starting width in pixels." },
  { name: "minWidth", type: "number", default: "preset", description: "Minimum width in pixels." },
  {
    name: "grow",
    type: "boolean | number",
    default: "preset",
    description: (
      <>
        Share of extra container width. <InlineCode>true</InlineCode> is 1,{" "}
        <InlineCode>false</InlineCode> is 0.
      </>
    ),
  },
  {
    name: "sortable",
    type: "boolean",
    default: "true",
    description: "Set to false to disable sorting for this column.",
  },
  {
    name: "resizable",
    type: "boolean",
    default: "true",
    description: "Set to false to disable resizing for this column.",
  },
  {
    name: "footer",
    type: "ReactNode | ({ data, rows }) => ReactNode",
    description: "Footer content. Functions receive all data and the currently rendered rows.",
  },
  { name: "className", type: "string", description: "Classes for this column's body cells." },
  { name: "footerClassName", type: "string", description: "Classes for this column's footer cell." },
]

const selectionProps: PropDefinition[] = [
  {
    name: "selectedRows",
    type: "string[]",
    description: "Selected row ids. Makes selection controlled.",
  },
  {
    name: "onSelectedRowsChange",
    type: "(rows: string[]) => void",
    description: "Called with the new list of selected ids.",
  },
  {
    name: "defaultSelectedRows",
    type: "string[]",
    default: "[]",
    description: "Initially selected ids when selection is uncontrolled.",
  },
]

export default async function TableDocsPage() {
  const source = await readFile(
    path.join(process.cwd(), "components", "emstein-ui", "table.tsx"),
    "utf8"
  )

  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Table"
        description={description}
        breadcrumbs={[
          { title: "Docs", href: "/docs" },
          { title: "Components", href: "/docs/components" },
        ]}
        links={[
          { title: "TanStack Table", href: "https://tanstack.com/table", external: true },
          { title: "TanStack Virtual", href: "https://tanstack.com/virtual", external: true },
          { title: "table.json", href: "/r/table.json" },
        ]}
      />

      <ComponentPreview name="table-demo" />

      <DocsHeading id="installation">Installation</DocsHeading>
      <DocsTabs defaultValue="cli">
        <DocsTabsList>
          <DocsTabsTrigger value="cli">CLI</DocsTabsTrigger>
          <DocsTabsTrigger value="manual">Manual</DocsTabsTrigger>
        </DocsTabsList>
        <DocsTabsContent value="cli">
          <CommandTabs commands={shadcnCommand(`add ${siteConfig.namespace}/table`)} />
          <DocsText className="mt-4 text-sm">
            Or install straight from the registry URL:{" "}
            <InlineCode>npx shadcn@latest add {siteConfig.url}/r/table.json</InlineCode>
          </DocsText>
        </DocsTabsContent>
        <DocsTabsContent value="manual">
          <Steps>
            <Step>Install the dependencies</Step>
            <CommandTabs
              commands={installCommand("@tanstack/react-table @tanstack/react-virtual lucide-react")}
            />
            <Step>Add the shadcn/ui checkbox</Step>
            <CommandTabs commands={shadcnCommand("add checkbox")} />
            <Step>Copy the source into your project</Step>
            <CodeBlock code={source} title="components/emstein-ui/table.tsx" collapsible />
            <Step>Update the import paths to match your project setup</Step>
          </Steps>
        </DocsTabsContent>
      </DocsTabs>

      <DocsHeading id="usage">Usage</DocsHeading>
      <CodeBlock code={importCode} />
      <CodeBlock code={usageCode} className="mt-4" />
      <DocsText>
        Pass <InlineCode>data</InlineCode> and <InlineCode>columns</InlineCode>; virtualization,
        sorting, and resizing work out of the box. Each column&apos;s{" "}
        <InlineCode>type</InlineCode> picks a sensible width, and every preset can be overridden.
        See <a href="#column-widths" className="font-medium text-foreground underline underline-offset-4">column widths</a>.
      </DocsText>

      <DocsHeading id="sorting-and-resizing">Sorting and resizing</DocsHeading>
      <DocsText>
        Click anywhere in a sortable header cell to switch between ascending and descending order.
        The first sortable column starts sorted ascending; use{" "}
        <InlineCode>initialSort</InlineCode> to pick another column, or{" "}
        <InlineCode>initialSort={"{false}"}</InlineCode> to start unsorted.
      </DocsText>
      <DocsText>
        Hover a header to reveal its resize divider, then drag. A column trades width with its
        neighbor, so the table keeps its overall width while you resize. Turn either feature off
        for the whole table with <InlineCode>sortable</InlineCode> and{" "}
        <InlineCode>resizable</InlineCode>, or per column with the same keys.
      </DocsText>

      <DocsHeading id="scroll-modes">Scroll modes</DocsHeading>
      <DocsText>
        By default, rows are virtualized against the window: the table grows with its content and
        the page scrolls. Set <InlineCode>scrollMode=&quot;table&quot;</InlineCode> to render
        inside a fixed-height scroll container instead, as in the preview above.
      </DocsText>
      <CodeBlock code={scrollCode} className="mt-4" />

      <DocsHeading id="examples">Examples</DocsHeading>

      <DocsHeading level={3} id="row-selection">
        Row selection
      </DocsHeading>
      <DocsText>
        Pass <InlineCode>selection</InlineCode> to add a checkbox column. Control it with{" "}
        <InlineCode>selectedRows</InlineCode> and <InlineCode>onSelectedRowsChange</InlineCode>, or
        pass <InlineCode>defaultSelectedRows</InlineCode> and let the table manage it. Ids come from{" "}
        <InlineCode>getRowId</InlineCode>.
      </DocsText>
      <ComponentPreview name="table-selection-demo" />

      <DocsHeading level={3} id="footer">
        Footer
      </DocsHeading>
      <DocsText>
        Set <InlineCode>footer</InlineCode> on a column to render a summary row. Pass a value, or a
        function that receives the full <InlineCode>data</InlineCode> and the currently rendered{" "}
        <InlineCode>rows</InlineCode>.
      </DocsText>
      <ComponentPreview name="table-footer-demo" />

      <DocsHeading level={3} id="primitives">
        Primitives
      </DocsHeading>
      <DocsText>
        Render <InlineCode>Table</InlineCode> without <InlineCode>data</InlineCode> and{" "}
        <InlineCode>columns</InlineCode> and you get a plain table with the same primitives as
        shadcn/ui, so existing table markup keeps working after you switch.
      </DocsText>
      <ComponentPreview name="table-primitives-demo" />

      <DocsHeading id="column-widths">Column widths</DocsHeading>
      <DocsText>
        Every column <InlineCode>type</InlineCode> sets a starting width, a minimum width, and a
        grow factor. When the container is wider than the columns, the extra space is shared in
        proportion to <InlineCode>grow</InlineCode>. When it is narrower, columns keep their
        minimum widths and the table scrolls horizontally.
      </DocsText>
      <div className="mt-6 overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b bg-muted/50 text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Width</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Min width</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Grow</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[0.8125rem]">
            {widthPresets.map(([type, width, minWidth, grow]) => (
              <tr key={type} className="border-b last:border-b-0">
                <td className="px-4 py-2.5 font-medium">{type}</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground tabular-nums">{width}px</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground tabular-nums">{minWidth}px</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground tabular-nums">{grow}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DocsText className="mt-6">
        Override any preset per column with <InlineCode>width</InlineCode>,{" "}
        <InlineCode>minWidth</InlineCode>, and <InlineCode>grow</InlineCode>.
      </DocsText>
      <CodeBlock code={widthCode} className="mt-4" />

      <DocsHeading id="api-reference">API Reference</DocsHeading>
      <DocsHeading level={3} id="table-props" className="mt-6">
        Table
      </DocsHeading>
      <PropsTable props={tableProps} />

      <DocsHeading level={3} id="column-props">
        Column
      </DocsHeading>
      <DocsText>
        Columns are typed as <InlineCode>EmsteinUITableColumn&lt;TData&gt;</InlineCode>.
      </DocsText>
      <PropsTable props={columnProps} />

      <DocsHeading level={3} id="selection-props">
        Selection
      </DocsHeading>
      <DocsText>
        The <InlineCode>selection</InlineCode> prop is typed as{" "}
        <InlineCode>EmsteinUITableSelection</InlineCode>. Pass an empty object for uncontrolled
        selection with nothing selected.
      </DocsText>
      <PropsTable props={selectionProps} />

      <DocsPager href="/docs/components/table" />
    </DocsPage>
  )
}
