import type { OptionsUnoCSS, TypedFlatConfigItem } from "../types"

import { CONFIG_PREFIX, ensurePackages, interopDefault } from "../utils"

export async function unocss(
  options: OptionsUnoCSS = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    attributify = true,
    strict = false,
  } = options

  await ensurePackages([
    "@unocss/eslint-plugin",
  ])

  const [
    pluginUnoCSS,
  ] = await Promise.all([
    interopDefault(import("@unocss/eslint-plugin")),
  ] as const)

  return [
    {
      name: `${CONFIG_PREFIX}/unocss`,
      plugins: {
        unocss: pluginUnoCSS,
      },
      rules: {
        "unocss/order": "warn",
        ...attributify
          ? {
              "unocss/order-attributify": "warn",
            }
          : {},
        ...strict
          ? {
              "unocss/blocklist": "error",
            }
          : {},
      },
    },
  ]
}
