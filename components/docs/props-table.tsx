import type { ReactNode } from "react"

export type PropDefinition = {
  name: string
  type: string
  default?: string
  required?: boolean
  description: ReactNode
}

export function PropsTable({ props }: { props: PropDefinition[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th scope="col" className="w-[38%] px-4 py-2.5 font-medium">
              Prop
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Type
            </th>
            <th scope="col" className="w-32 px-4 py-2.5 font-medium">
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b align-top last:border-b-0">
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <code className="font-mono text-[0.8125rem] font-medium">{prop.name}</code>
                  {prop.required ? (
                    <span className="rounded bg-foreground/5 px-1 py-px text-[0.625rem] font-medium text-muted-foreground">
                      required
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 leading-6 text-muted-foreground">{prop.description}</p>
              </td>
              <td className="px-4 py-3">
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs leading-6 break-words">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <code className="font-mono text-xs leading-6 text-muted-foreground">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
