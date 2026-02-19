import type { ExtraLibrariesOption, FrameworkOption, PromItem } from "./types"

import c from "ansis"

export const vscodeSettingsString = `
  // disable default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  "eslint.runtime": "node",

  // enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "json5",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]


`

export const frameworkOptions: PromItem<FrameworkOption>[] = [
  {
    label: c.green("Vue"),
    value: "vue",
  },
  {
    label: c.cyan("React"),
    value: "react",
  },
  {
    label: c.red("Svelte"),
    value: "svelte",
  },
  {
    label: c.magenta("Astro"),
    value: "astro",
  },
  {
    label: c.cyan("Solid"),
    value: "solid",
  },
  {
    label: c.blue("Slidev"),
    value: "slidev",
  },
]

export const frameworks: FrameworkOption[] = frameworkOptions.map(({ value }) => (value))

export const extraOptions: PromItem<ExtraLibrariesOption>[] = [
  {
    hint: "Use external formatters (Prettier and/or dprint) to format files that ESLint cannot handle yet (.css, .html, etc)",
    label: c.red("Formatter"),
    value: "formatter",
  },
  {
    label: c.cyan("UnoCSS"),
    value: "unocss",
  },
]

export const extra: ExtraLibrariesOption[] = extraOptions.map(({ value }) => (value))

export const dependenciesMap = {
  astro: [
    "eslint-plugin-astro",
    "astro-eslint-parser",
  ],
  formatter: [
    "eslint-plugin-format",
  ],
  formatterAstro: [
    "prettier-plugin-astro",
  ],
  nextjs: [
    "@next/eslint-plugin-next",
  ],
  react: [
    "@eslint-react/eslint-plugin",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-refresh",
  ],
  slidev: [
    "prettier-plugin-slidev",
  ],
  solid: [
    "eslint-plugin-solid",
  ],
  svelte: [
    "eslint-plugin-svelte",
    "svelte-eslint-parser",
  ],
  unocss: [
    "@unocss/eslint-plugin",
  ],
  vue: [],
} as const
