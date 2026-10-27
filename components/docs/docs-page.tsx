import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Hash, Info } from "lucide-react"

import { DocsToc, type TocItem } from "@/components/docs/docs-toc"
import { getPager } from "@/lib/docs"
import { cn } from "@/lib/utils"

export function DocsPage({ toc, children }: { toc?: TocItem[]; children: ReactNode }) {
  return (
    <div className="flex min-w-0 gap-12 xl:gap-16">
      <article className="mx-auto w-full max-w-4xl min-w-0 pt-8 pb-16 lg:pt-12">
        {children}
      </article>
      {toc?.length ? (
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-52 shrink-0 self-start overflow-y-auto pt-12 pb-8 xl:block">
          <DocsToc items={toc} />
        </aside>
      ) : null}
    </div>
  )
}

export function DocsPageHeader({
  title,
  description,
  breadcrumbs = [],
  links = [],
}: {
  title: string
  description: string
  breadcrumbs?: { title: string; href: string }[]
  links?: { title: string; href: string; external?: boolean }[]
}) {
  return (
    <header className="flex flex-col gap-3 pb-8">
      {breadcrumbs.length ? (
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <Link href={crumb.href} className="transition-colors hover:text-foreground">
                  {crumb.title}
                </Link>
                <ChevronRight className="size-3.5" />
              </li>
            ))}
            <li aria-current="page" className="text-foreground">
              {title}
            </li>
          </ol>
        </nav>
      ) : null}
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
        {description}
      </p>
      {links.length ? (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex h-6 items-center gap-1 rounded-md bg-secondary px-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/70"
            >
              {link.title}
              {link.external ? <ArrowUpRight className="size-3" /> : null}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  )
}

export function DocsHeading({
  level = 2,
  id,
  children,
  className,
}: {
  level?: 2 | 3
  id: string
  children: ReactNode
  className?: string
}) {
  const Tag = level === 2 ? "h2" : "h3"

  return (
    <Tag
      id={id}
      className={cn(
        "group relative font-semibold tracking-tight",
        level === 2 ? "mt-14 mb-4 text-xl sm:text-2xl" : "mt-10 mb-3 text-lg",
        className
      )}
    >
      <a href={`#${id}`} className="inline-flex items-center gap-2">
        {children}
        <Hash
          aria-hidden="true"
          className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      </a>
    </Tag>
  )
}

export function DocsText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("leading-7 text-foreground/80 not-first:mt-4", className)}>
      {children}
    </p>
  )
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] break-words text-foreground">
      {children}
    </code>
  )
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="steps mt-6 ml-3.5 border-l pl-8 [&>h3:first-child]:mt-0">
      {children}
    </div>
  )
}

export function Step({ children }: { children: ReactNode }) {
  return (
    <h3 className="relative mt-10 mb-4 text-base leading-7 font-semibold tracking-tight">
      {children}
    </h3>
  )
}

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="mt-6 flex gap-3 rounded-xl border bg-muted/40 p-4 text-sm leading-6">
      <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="text-foreground/80">
        {title ? <p className="font-medium text-foreground">{title}</p> : null}
        {children}
      </div>
    </div>
  )
}

export function DocsPager({ href }: { href: string }) {
  const { previous, next } = getPager(href)

  if (!previous && !next) {
    return null
  }

  return (
    <nav aria-label="Pagination" className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2">
      {previous ? (
        <Link
          href={previous.href}
          className="group flex flex-col gap-1 rounded-xl border p-4 transition-colors hover:bg-accent/50"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="font-medium">{previous.title}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-xl border p-4 text-right transition-colors hover:bg-accent/50"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-medium">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  )
}
