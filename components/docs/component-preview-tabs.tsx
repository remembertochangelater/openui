"use client"

import type { ReactNode } from "react"

import {
  DocsTabs,
  DocsTabsContent,
  DocsTabsList,
  DocsTabsTrigger,
} from "@/components/docs/docs-tabs"

export function ComponentPreviewTabs({
  preview,
  code,
  className,
}: {
  preview: ReactNode
  code: ReactNode
  className?: string
}) {
  return (
    <DocsTabs defaultValue="preview" className={className}>
      <DocsTabsList>
        <DocsTabsTrigger value="preview">Preview</DocsTabsTrigger>
        <DocsTabsTrigger value="code">Code</DocsTabsTrigger>
      </DocsTabsList>
      <DocsTabsContent value="preview">
        <div className="flex min-h-56 w-full items-center justify-center rounded-xl border bg-background p-3 sm:p-6 lg:p-8">
          {preview}
        </div>
      </DocsTabsContent>
      <DocsTabsContent value="code">{code}</DocsTabsContent>
    </DocsTabs>
  )
}
