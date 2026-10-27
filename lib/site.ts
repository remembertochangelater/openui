export const siteConfig = {
  name: "Emstein UI",
  wordmark: "emstein ui",
  url: "https://ui.emstein.com",
  description:
    "Production-ready, shadcn-compatible React components. Install them with the shadcn CLI and own every line of source.",
  namespace: "@emstein-ui",
  links: {
    github: "https://github.com/remembertochangelater/openui",
    registry: "/r/registry.json",
    shadcnDirectory: "https://ui.shadcn.com/docs/directory",
  },
}

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

const runners: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn",
  bun: "bunx --bun",
}

const installers: Record<PackageManager, string> = {
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
  bun: "bun add",
}

export function shadcnCommand(args: string): Record<PackageManager, string> {
  return {
    npm: `${runners.npm} shadcn@latest ${args}`,
    pnpm: `${runners.pnpm} shadcn@latest ${args}`,
    yarn: `${runners.yarn} shadcn@latest ${args}`,
    bun: `${runners.bun} shadcn@latest ${args}`,
  }
}

export function installCommand(packages: string): Record<PackageManager, string> {
  return {
    npm: `${installers.npm} ${packages}`,
    pnpm: `${installers.pnpm} ${packages}`,
    yarn: `${installers.yarn} ${packages}`,
    bun: `${installers.bun} ${packages}`,
  }
}
