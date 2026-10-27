import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="page-container flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/docs">Read the docs</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  )
}
