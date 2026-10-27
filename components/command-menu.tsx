"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Braces, CornerDownLeft, FileText, Hash, Search } from "lucide-react"
import { Dialog } from "radix-ui"

import { docsNav } from "@/lib/docs"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

type CommandItem = {
  title: string
  href: string
  group: string
  icon: typeof FileText
  keywords?: string
  hardNavigation?: boolean
}

const tableSections = [
  ["Installation", "installation"],
  ["Usage", "usage"],
  ["Examples", "examples"],
  ["Column widths", "column-widths"],
  ["API Reference", "api-reference"],
] as const

const commandItems: CommandItem[] = [
  ...docsNav.flatMap((section) =>
    section.items.map((item) => ({
      title: item.title,
      href: item.href,
      group: section.title,
      icon: FileText,
    }))
  ),
  ...tableSections.map(([title, id]) => ({
    title: `Table › ${title}`,
    href: `/docs/components/table#${id}`,
    group: "Table",
    icon: Hash,
    keywords: "data grid",
  })),
  {
    title: "registry.json",
    href: siteConfig.links.registry,
    group: "Registry",
    icon: Braces,
    keywords: "json index",
    hardNavigation: true,
  },
  {
    title: "table.json",
    href: "/r/table.json",
    group: "Registry",
    icon: Braces,
    keywords: "json source",
    hardNavigation: true,
  },
]

function subscribeToNothing() {
  return () => {}
}

function useIsMac() {
  return React.useSyncExternalStore(
    subscribeToNothing,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => false
  )
}

export function CommandMenu() {
  const router = useRouter()
  const isMac = useIsMac()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)
  const listRef = React.useRef<HTMLDivElement>(null)

  const results = React.useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean)

    return commandItems.filter((item) => {
      const haystack = `${item.title} ${item.group} ${item.keywords ?? ""}`.toLowerCase()
      return terms.every((term) => haystack.includes(term))
    })
  }, [query])

  const groups = React.useMemo(() => {
    const map = new Map<string, { item: CommandItem; index: number }[]>()
    results.forEach((item, index) => {
      map.set(item.group, [...(map.get(item.group) ?? []), { item, index }])
    })
    return [...map.entries()]
  }, [results])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement

      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !isTyping)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  React.useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  function onOpenChange(value: boolean) {
    setOpen(value)

    if (!value) {
      setQuery("")
      setActiveIndex(0)
    }
  }

  function select(item: CommandItem) {
    onOpenChange(false)

    if (item.hardNavigation) {
      window.location.assign(item.href)
    } else {
      router.push(item.href)
    }
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) {
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % results.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + results.length) % results.length)
    } else if (event.key === "Enter") {
      event.preventDefault()
      select(results[activeIndex] ?? results[0])
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Search documentation"
          className="inline-flex size-8 items-center justify-center gap-2 rounded-md text-sm text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 md:w-56 md:justify-start md:border md:bg-muted/40 md:pr-1.5 md:pl-2.5 md:shadow-xs md:hover:bg-muted lg:w-64 dark:md:bg-input/30"
        >
          <Search className="size-4 shrink-0" />
          <span className="hidden md:inline">Search docs...</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 items-center gap-0.5 rounded border bg-background px-1.5 font-mono text-[0.625rem] font-medium text-muted-foreground md:inline-flex">
            {isMac ? "⌘" : "Ctrl"} K
          </kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-[12vh] left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <div className="flex h-12 items-center gap-2.5 border-b px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search pages and sections..."
              role="combobox"
              aria-expanded="true"
              aria-controls="command-menu-results"
              aria-activedescendant={results.length ? `command-item-${activeIndex}` : undefined}
              className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden h-5 items-center rounded border bg-muted px-1.5 font-mono text-[0.625rem] text-muted-foreground sm:inline-flex">
              Esc
            </kbd>
          </div>

          <div
            ref={listRef}
            id="command-menu-results"
            role="listbox"
            className="max-h-[min(24rem,60vh)] overflow-y-auto p-2"
          >
            {groups.length ? (
              groups.map(([group, entries]) => (
                <div key={group} role="group" aria-label={group} className="pb-1">
                  <p className="px-2 pt-2 pb-1.5 text-xs font-medium text-muted-foreground">
                    {group}
                  </p>
                  {entries.map(({ item, index }) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.href}
                        id={`command-item-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        onMouseMove={() => setActiveIndex(index)}
                        onClick={() => select(item)}
                        className="flex h-10 cursor-pointer items-center gap-3 rounded-md px-2 text-sm text-foreground/80 aria-selected:bg-accent aria-selected:text-foreground"
                      >
                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{item.title}</span>
                        <CornerDownLeft
                          className={cn(
                            "ml-auto size-3.5 shrink-0 text-muted-foreground",
                            index !== activeIndex && "invisible"
                          )}
                        />
                      </div>
                    )
                  })}
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No results for “{query}”.
              </p>
            )}
          </div>

          <div className="hidden items-center gap-4 border-t bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded border bg-background px-1 font-mono text-[0.625rem]">↑↓</kbd>
              Navigate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded border bg-background px-1 font-mono text-[0.625rem]">↵</kbd>
              Open
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
