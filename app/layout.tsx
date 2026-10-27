import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Applies the stored (or system) theme before first paint and follows
// system changes until the visitor picks a theme explicitly.
const themeScript = `(() => {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = () => {
    let theme = null;
    try { theme = localStorage.getItem("theme"); } catch {}
    const dark = theme ? theme === "dark" : media.matches;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  };
  apply();
  media.addEventListener("change", apply);
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Components for shadcn/ui`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: [
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans"
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="content" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
