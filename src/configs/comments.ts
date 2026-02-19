import type { TypedFlatConfigItem } from "../types"

import { pluginComments } from "../plugins"
import { CONFIG_PREFIX } from "../utils"

export async function comments(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      name: `${CONFIG_PREFIX}/eslint-comments/rules`,
      plugins: {
        "eslint-comments": pluginComments,
      },
      rules: {
        "eslint-comments/no-aggregating-enable": "error",
        "eslint-comments/no-duplicate-disable": "error",
        "eslint-comments/no-unlimited-disable": "error",
        "eslint-comments/no-unused-enable": "error",
      },
    },
  ]
}
