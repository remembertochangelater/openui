import type { Metadata } from "next"

import { CodeBlock } from "@/components/docs/code-block"
import { CommandTabs } from "@/components/docs/command-tabs"
import {
  Callout,
  DocsHeading,
  DocsPage,
  DocsPageHeader,
  DocsPager,
  DocsText,
  InlineCode,
  Step,
  Steps,
} from "@/components/docs/docs-page"
import type { TocItem } from "@/components/docs/docs-toc"
import { shadcnCommand, siteConfig } from "@/lib/site"

const description = "Add Emstein UI components to a React project that uses shadcn/ui."

export const metadata: Metadata = {
  title: "Installation",
  description,
}

const toc: TocItem[] = [
  { id: "setup", title: "Setup" },
  { id: "configure-the-registry", title: "Configure the registry" },
  { id: "install-from-a-url", title: "Install from a URL" },
  { id: "updating", title: "Updating components" },
]

const usageCode = `import { Table } from "@/components/emstein-ui/table"`

const registryConfig = `{
  "registries": {
    "${siteConfig.namespace}": "${siteConfig.url}/r/{name}.json"
  }
}`

export default function InstallationPage() {
  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title="Installation"
        description={description}
        breadcrumbs={[{ title: "Docs", href: "/docs" }]}
      />

      <DocsHeading id="setup" className="mt-0">
        Setup
      </DocsHeading>
      <Steps>
        <Step>Set up shadcn/ui</Step>
        <DocsText>
          Skip this step if your project already has a <InlineCode>components.json</InlineCode>.
          Otherwise, initialize shadcn/ui first. It configures Tailwind CSS, theme variables, and
          import aliases.
        </DocsText>
        <CommandTabs commands={shadcnCommand("init")} className="mt-4" />

        <Step>Add a component</Step>
        <DocsText>
          <InlineCode>{siteConfig.namespace}</InlineCode> is listed in the official shadcn
          registry directory, so the CLI resolves the namespace for you.
        </DocsText>
        <CommandTabs commands={shadcnCommand(`add ${siteConfig.namespace}/table`)} className="mt-4" />

        <Step>Import and use it</Step>
        <CodeBlock code={usageCode} />
      </Steps>

      <DocsHeading id="configure-the-registry">Configure the registry</DocsHeading>
      <DocsText>
        To pin the registry explicitly, or if your CLI version doesn&apos;t resolve directory
        namespaces, add it to <InlineCode>components.json</InlineCode>:
      </DocsText>
      <CodeBlock code={registryConfig} lang="json" title="components.json" className="mt-4" />

      <DocsHeading id="install-from-a-url">Install from a URL</DocsHeading>
      <DocsText>Every component can also be installed straight from its registry URL:</DocsText>
      <CommandTabs commands={shadcnCommand(`add ${siteConfig.url}/r/table.json`)} className="mt-4" />
      <Callout title="Browse the registry">
        The full index lives at{" "}
        <a href={siteConfig.links.registry} className="font-medium text-foreground underline underline-offset-4">
          /r/registry.json
        </a>
        .
      </Callout>

      <DocsHeading id="updating">Updating components</DocsHeading>
      <DocsText>
        Components are your code once installed, so updates are opt-in. Run the add command again
        to pull the latest version. The CLI asks before overwriting a file that already exists, so
        review any local changes first.
      </DocsText>

      <DocsPager href="/docs/installation" />
    </DocsPage>
  )
}
