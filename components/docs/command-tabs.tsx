"use client"

import * as React from "react"
import { Terminal } from "lucide-react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { CopyButton } from "@/components/docs/copy-button"
import type { PackageManager } from "@/lib/site"
import { cn } from "@/lib/utils"

const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"]
const storageKey = "emstein-ui:package-manager"
const listeners = new Set<() => void>()

function isPackageManager(value: unknown): value is PackageManager {
  return packageManagers.includes(value as PackageManager)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)

  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function getSnapshot(): PackageManager {
  try {
    const value = localStorage.getItem(storageKey)
    return isPackageManager(value) ? value : "npm"
  } catch {
    return "npm"
  }
}

function setPackageManager(value: PackageManager) {
  try {
    localStorage.setItem(storageKey, value)
  } catch {}

  listeners.forEach((listener) => listener())
}

// Every command block on the site shares the visitor's package manager choice.
function usePackageManager() {
  return React.useSyncExternalStore(subscribe, getSnapshot, () => "npm" as const)
}

export function CommandTabs({
  commands,
  className,
}: {
  commands: Record<PackageManager, string>
  className?: string
}) {
  const packageManager = usePackageManager()

  return (
    <TabsPrimitive.Root
      value={packageManager}
      onValueChange={(value) => {
        if (isPackageManager(value)) {
          setPackageManager(value)
        }
      }}
      className={cn("overflow-hidden rounded-xl border bg-code", className)}
    >
      <div className="flex h-11 items-center gap-1 border-b pr-2 pl-3">
        <Terminal className="mr-1.5 size-3.5 shrink-0 text-muted-foreground" />
        <TabsPrimitive.List aria-label="Package manager" className="flex items-center gap-0.5">
          {packageManagers.map((manager) => (
            <TabsPrimitive.Trigger
              key={manager}
              value={manager}
              className="h-7 rounded-md px-2 font-mono text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-active:bg-accent data-active:text-foreground"
            >
              {manager}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        <CopyButton value={commands[packageManager]} label="Copy command" className="ml-auto" />
      </div>
      {packageManagers.map((manager) => (
        <TabsPrimitive.Content key={manager} value={manager} className="outline-none">
          <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] leading-6 sm:px-5">
            <code>{commands[manager]}</code>
          </pre>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
