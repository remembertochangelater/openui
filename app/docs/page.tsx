import type { Metadata } from "next"
import Link from "next/link"
import { Code2, FileCode2, Palette, SlidersHorizontal } from "lucide-react"

import { CommandTabs } from "@/components/docs/command-tabs"
import { ComponentCard } from "@/components/docs/component-card"
import {
  DocsHeading,
  DocsPage,
  DocsPageHeader,
  DocsPager,
  DocsText,
  InlineCode,
} from "@/components/docs/docs-page"
import type { TocItem } from "@/components/docs/docs-toc"
import { components } from "@/lib/docs"
import { shadcnCommand, siteConfig } from "@/lib/site"

const description =
  "Production-ready components for shadcn/ui. Install them with the CLI and own every line of source."

export const metadata: Metadata = {
  title: "Introduction",
  description,
}

const toc: TocItem[] = [
  { id: "how-it-works", title: "How it works" },
  { id: "principles", title: "Principles" },
  { id: "quick-start", title: "Quick start" },
  { id: "components", title: "Components" },
]

const principles = [
  {
    icon: FileCode2,
    title: "Own the code",
    description:
      "Source lands in your repository. Read it, change it, and ship it like the rest of your components.",
  },
  {
    icon: SlidersHorizontal,
    title: "Practical defaults",
    description:
      "Sensible behavior out of the box, so the common case takes a few lines of configuration.",
  },
  {
    icon: Code2,
    title: "Focused APIs",
    description:
      "Small, typed props instead of sprawling options, with the underlying primitives still available.",
  },
  {
    icon: Palette,
    title: "Your theme",
    description:
      "Styled with shadcn/ui tokens, so components match your design system in light and dark mode.",
  },
]

export default function IntroductionPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader title="Introduction" description={description} />

      <DocsText>
        {siteConfig.name} is a collection of components built for the shadcn/ui ecosystem. It
        isn&apos;t a package you install from npm and import. It&apos;s a registry: the shadcn
        CLI copies each component&apos;s source into your project, next to the shadcn/ui
        components you already use.
      </DocsText>

      <DocsHeading id="how-it-works">How it works</DocsHeading>
      <DocsText>
        Every component is published as a registry item, and the{" "}
        <InlineCode>{siteConfig.namespace}</InlineCode> namespace is listed in the official{" "}
        <a
          href={siteConfig.links.shadcnDirectory}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4"
        >
          shadcn registry directory
        </a>
        . When you add a component, the CLI installs its npm dependencies, adds any shadcn/ui
        components it relies on, and writes the source file into your project.
      </DocsText>
      <DocsText>
        Components are styled with the same CSS variables as shadcn/ui, such as{" "}
        <InlineCode>--border</InlineCode>, <InlineCode>--muted</InlineCode>, and{" "}
        <InlineCode>--primary</InlineCode>, so they pick up your theme, dark mode included, with
        no extra setup.
      </DocsText>

      <DocsHeading id="principles">Principles</DocsHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {principles.map((principle) => (
          <div key={principle.title} className="rounded-xl border p-5">
            <div className="grid size-9 place-items-center rounded-lg border bg-muted/50">
              <principle.icon className="size-4" />
            </div>
            <h3 className="mt-4 font-medium">{principle.title}</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              {principle.description}
            </p>
          </div>
        ))}
      </div>

      <DocsHeading id="quick-start">Quick start</DocsHeading>
      <DocsText>In a project that already uses shadcn/ui, add the table with one command:</DocsText>
      <CommandTabs commands={shadcnCommand(`add ${siteConfig.namespace}/table`)} className="mt-4" />
      <DocsText>
        Starting from scratch? Follow the{" "}
        <Link href="/docs/installation" className="font-medium text-foreground underline underline-offset-4">
          installation guide
        </Link>
        .
      </DocsText>

      <DocsHeading id="components">Components</DocsHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <ComponentCard key={component.name} component={component} />
        ))}
      </div>

      <DocsPager href="/docs" />
    </DocsPage>
  )
}
