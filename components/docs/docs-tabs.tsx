"use client"

import type { ComponentProps } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function DocsTabs({ className, ...props }: ComponentProps<typeof Tabs>) {
  return <Tabs className={cn("mt-4 gap-4", className)} {...props} />
}

export function DocsTabsList({ className, ...props }: ComponentProps<typeof TabsList>) {
  return (
    <div className="border-b">
      <TabsList
        className={cn("h-auto gap-5 rounded-none bg-transparent p-0", className)}
        {...props}
      />
    </div>
  )
}

export function DocsTabsTrigger({ className, ...props }: ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      className={cn(
        "relative h-10 flex-none rounded-none border-0 px-0 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full data-active:bg-transparent data-active:shadow-none data-active:after:bg-foreground dark:data-active:border-transparent dark:data-active:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export function DocsTabsContent(props: ComponentProps<typeof TabsContent>) {
  return <TabsContent {...props} />
}
