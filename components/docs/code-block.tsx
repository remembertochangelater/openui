import { FileCode2 } from "lucide-react"

import { CodeCollapsible } from "@/components/docs/code-collapsible"
import { CopyButton } from "@/components/docs/copy-button"
import { highlight, type CodeLanguage } from "@/lib/highlight"
import { cn } from "@/lib/utils"

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  collapsible = false,
  className,
}: {
  code: string
  lang?: CodeLanguage
  title?: string
  collapsible?: boolean
  className?: string
}) {
  const source = code.trim()
  const html = await highlight(source, lang)
  const body = (
    <div
      className="overflow-x-auto py-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-xl border bg-code text-code-foreground",
        className
      )}
    >
      {title ? (
        <figcaption className="flex h-11 items-center gap-2 border-b pr-2 pl-4 text-[0.8125rem] text-muted-foreground">
          <FileCode2 className="size-3.5 shrink-0" />
          <span className="truncate font-mono">{title}</span>
          <CopyButton value={source} className="ml-auto" />
        </figcaption>
      ) : (
        <CopyButton value={source} className="absolute top-3 right-3 z-10 bg-code" />
      )}
      {collapsible ? <CodeCollapsible>{body}</CodeCollapsible> : body}
    </figure>
  )
}
