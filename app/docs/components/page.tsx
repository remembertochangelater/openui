import type { Metadata } from "next"

import { ComingSoonCard, ComponentCard } from "@/components/docs/component-card"
import { DocsPage, DocsPageHeader, DocsPager } from "@/components/docs/docs-page"
import { components } from "@/lib/docs"

const description =
  "Every component in the registry. Each one installs with the shadcn CLI and ships as source you own."

export const metadata: Metadata = {
  title: "Components",
  description,
}

export default function ComponentsPage() {
  return (
    <DocsPage>
      <DocsPageHeader
        title="Components"
        description={description}
        breadcrumbs={[{ title: "Docs", href: "/docs" }]}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <ComponentCard key={component.name} component={component} />
        ))}
        <ComingSoonCard />
      </div>
      <DocsPager href="/docs/components" />
    </DocsPage>
  )
}
