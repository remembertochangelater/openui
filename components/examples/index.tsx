"use client"

import dynamic from "next/dynamic"

import { TableFooterDemo } from "@/components/examples/table-footer-demo"
import { TablePrimitivesDemo } from "@/components/examples/table-primitives-demo"
import { TableSelectionDemo } from "@/components/examples/table-selection-demo"

function TableSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden rounded-lg border"
      style={{ height: 420 }}
    >
      <div className="h-12 border-b bg-muted" />
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="flex h-14 items-center gap-6 border-b px-3">
          <div className="size-4 rounded-[4px] bg-muted" />
          <div className="h-3 w-40 rounded-full bg-muted" />
          <div className="h-3 w-20 rounded-full bg-muted" />
          <div className="ml-auto h-3 w-12 rounded-full bg-muted" />
        </div>
      ))}
    </div>
  )
}

// The table-scroll demo measures its scroll container before it can pick rows
// to render, so it is rendered in the browser only.
const TableDemo = dynamic(
  () => import("@/components/examples/table-demo").then((mod) => mod.TableDemo),
  { ssr: false, loading: () => <TableSkeleton /> }
)

const examples = {
  "table-demo": TableDemo,
  "table-selection-demo": TableSelectionDemo,
  "table-footer-demo": TableFooterDemo,
  "table-primitives-demo": TablePrimitivesDemo,
}

export type ExampleName = keyof typeof examples

export function Example({ name }: { name: ExampleName }) {
  const Component = examples[name]
  return <Component />
}
