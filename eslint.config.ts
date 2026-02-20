import { config } from "./src"

export default config(
  {
    astro: true,
    formatters: true,
    jsx: {
      a11y: true,
    },
    markdown: {
      overrides: {
        "no-dupe-keys": "off",
      },
    },
    nextjs: false,
    pnpm: true,
    react: true,
    solid: true,
    svelte: true,
    type: "lib",
    typescript: {
      erasableOnly: true,
    },
    vue: {
      a11y: true,
    },
  },
  {
    ignores: [
      "fixtures",
      "_fixtures",
      "**/constants-generated.ts",
    ],
  },
)
