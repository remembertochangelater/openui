import Link from "next/link"

import { Logo } from "@/components/logo"
import { siteConfig } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="page-container flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="size-4 shrink-0" />
          <p>
            {siteConfig.name} is MIT licensed. The source is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <Link href="/docs/components" className="hover:text-foreground">
            Components
          </Link>
          <a href={siteConfig.links.registry} className="hover:text-foreground">
            Registry
          </a>
          <a
            href={siteConfig.links.shadcnDirectory}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            shadcn directory
          </a>
        </nav>
      </div>
    </footer>
  )
}
