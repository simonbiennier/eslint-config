import type { TypedFlatConfigItem } from "../types"
import createCommand from "eslint-plugin-command/config"

import { CONFIG_PREFIX } from "../utils"

export async function command(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ...createCommand(),
      name: `${CONFIG_PREFIX}/command/rules`,
    },
  ]
}
