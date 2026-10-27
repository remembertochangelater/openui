import { readFile } from "node:fs/promises"
import path from "node:path"

import { CodeBlock } from "@/components/docs/code-block"
import { ComponentPreviewTabs } from "@/components/docs/component-preview-tabs"
import { Example, type ExampleName } from "@/components/examples"

export async function ComponentPreview({
  name,
  className,
}: {
  name: ExampleName
  className?: string
}) {
  const source = await readFile(
    path.join(process.cwd(), "components", "examples", `${name}.tsx`),
    "utf8"
  )

  return (
    <ComponentPreviewTabs
      className={className}
      preview={<Example name={name} />}
      code={
        <CodeBlock
          code={source}
          title={`${name}.tsx`}
          collapsible={source.split("\n").length > 40}
        />
      }
    />
  )
}
