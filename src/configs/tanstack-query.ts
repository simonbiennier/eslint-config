import type { OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from "../types"

import { GLOB_SRC } from "../globs"
import { CONFIG_PREFIX, ensurePackages, interopDefault } from "../utils"

export async function tanstackQuery(
  options: OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_SRC],
    overrides = {},
  } = options

  await ensurePackages([
    "@tanstack/eslint-plugin-query",
  ])

  const pluginQuery = await interopDefault(import("@tanstack/eslint-plugin-query"))

  const rules = pluginQuery.configs.recommended.rules

  return [
    {
      name: `${CONFIG_PREFIX}/tanstack-query`,
      plugins: {
        tanstack: pluginQuery,
      },
    },
    {
      files,
      name: `${CONFIG_PREFIX}/tanstack-query/rules`,
      rules: {
        ...rules,
        ...overrides,
      },
    },
  ]
}
