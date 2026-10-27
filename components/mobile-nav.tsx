"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Dialog } from "radix-ui"

import { GitHubIcon } from "@/components/icons"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { docsNav } from "@/lib/docs"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Open menu"
          className={className}
        >
          <Menu />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-background data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-2 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-top-2"
        >
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <div className="page-container flex h-14 shrink-0 items-center justify-between border-b">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <Logo className="size-5" />
              {siteConfig.wordmark}
            </Link>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Close menu">
                <X />
              </Button>
            </Dialog.Close>
          </div>

          <nav
            aria-label="Mobile"
            className="page-container flex-1 overflow-y-auto py-6"
          >
            <div className="flex flex-col gap-8">
              {docsNav.map((section) => (
                <div key={section.title} className="flex flex-col gap-1">
                  <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">
                    {section.title}
                  </p>
                  {section.items.map((item) => {
                    const active = pathname === item.href

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex h-11 items-center gap-2 rounded-md px-2 text-lg font-medium transition-colors",
                          active
                            ? "bg-accent text-foreground"
                            : "text-foreground/80 hover:bg-accent/60"
                        )}
                      >
                        {item.title}
                        {item.label ? (
                          <span className="rounded-full bg-foreground px-1.5 py-px text-[0.625rem] font-medium text-background">
                            {item.label}
                          </span>
                        ) : null}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          </nav>

          <div className="page-container flex shrink-0 items-center justify-between border-t py-4 text-sm text-muted-foreground">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
            <a href={siteConfig.links.registry} className="font-mono text-xs hover:text-foreground">
              registry.json
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
