import { createHighlighterCore, type HighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"

export type CodeLanguage = "tsx" | "bash" | "json"

let highlighter: Promise<HighlighterCore> | undefined

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [
      import("shiki/themes/github-light.mjs"),
      import("shiki/themes/github-dark.mjs"),
    ],
    langs: [
      import("shiki/langs/tsx.mjs"),
      import("shiki/langs/bash.mjs"),
      import("shiki/langs/json.mjs"),
    ],
    engine: createJavaScriptRegexEngine(),
  })

  return highlighter
}

export async function highlight(code: string, lang: CodeLanguage) {
  const shiki = await getHighlighter()

  return shiki.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })
}
