import Link from "next/link"

import { CommandMenu } from "@/components/command-menu"
import { GitHubIcon } from "@/components/icons"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70">
      <div className="page-container flex h-14 items-center gap-2">
        <Link
          href="/"
          className="mr-2 flex items-center gap-2 rounded-md font-semibold tracking-tight lg:mr-4"
        >
          <Logo className="size-5 shrink-0" />
          <span>{siteConfig.wordmark}</span>
        </Link>

        <MainNav className="hidden md:flex" />

        <div className="ml-auto flex items-center gap-1">
          <CommandMenu />
          <span aria-hidden="true" className="mx-1 hidden h-4 w-px bg-border md:block" />
          <Button variant="ghost" size="icon-sm" asChild>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
            >
              <GitHubIcon />
            </a>
          </Button>
          <ThemeToggle />
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  )
}
