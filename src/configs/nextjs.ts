import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from "../types"
import { GLOB_SRC } from "../globs"
import { CONFIG_NAME, CONFIG_PREFIX, ensurePackages, interopDefault } from "../utils"

function normalizeRules(rules: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) =>
      [key, typeof value === "string" ? [value] : value],
    ),
  )
}

export async function nextjs(
  options: OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_SRC],
    overrides = {},
  } = options

  await ensurePackages([
    "@next/eslint-plugin-next",
  ])

  const pluginNextJS = await interopDefault(import("@next/eslint-plugin-next"))

  function getRules(name: keyof typeof pluginNextJS.configs): Record<string, any> {
    const rules = pluginNextJS.configs?.[name]?.rules
    if (!rules) {
      throw new Error(`[${CONFIG_NAME}] Failed to find config ${name} in @next/eslint-plugin-next`)
    }
    return normalizeRules(rules)
  }

  return [
    {
      name: `${CONFIG_PREFIX}/nextjs/setup`,
      plugins: {
        next: pluginNextJS,
      },
    },
    {
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: "module",
      },
      name: `${CONFIG_PREFIX}/nextjs/rules`,
      rules: {
        ...getRules("recommended"),
        ...getRules("core-web-vitals"),

        ...overrides,
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  ]
}
