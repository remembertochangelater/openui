import type { ReactNode } from "react"

import { DocsSidebar } from "@/components/docs/docs-sidebar"

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-container flex flex-1 gap-10">
      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 self-start overflow-y-auto py-10 pr-2 lg:block">
        <DocsSidebar />
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
