export type DocsNavItem = {
  title: string
  href: string
  label?: string
}

export type DocsNavSection = {
  title: string
  items: DocsNavItem[]
}

export type ComponentEntry = {
  name: string
  title: string
  description: string
  href: string
  label?: string
}

export const components: ComponentEntry[] = [
  {
    name: "table",
    title: "Table",
    description:
      "A virtualized data table with sorting, resizing, row selection, and growth-based column widths.",
    href: "/docs/components/table",
    label: "New",
  },
]

export const docsNav: DocsNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components" },
      ...components.map(({ title, href, label }) => ({ title, href, label })),
    ],
  },
]

export const mainNav = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components" },
]

export function isMainNavActive(href: string, pathname: string) {
  if (href === "/docs") {
    return pathname === "/docs" || pathname === "/docs/installation"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getPager(href: string) {
  const items = docsNav.flatMap((section) => section.items)
  const index = items.findIndex((item) => item.href === href)

  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
  }
}
