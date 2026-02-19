import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from "../types"
import { pluginAntfu } from "../plugins"
import { CONFIG_PREFIX, interopDefault } from "../utils"

export const StylisticConfigDefaults: StylisticConfig = {
  arrowParens: true,
  blockSpacing: true,
  braceStyle: "1tbs",
  commaDangle: "always-multiline",
  indent: 2,
  jsx: true,
  quoteProps: "consistent-as-needed",
  quotes: "double",
  semi: false,
}

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    blockSpacing,
    braceStyle,
    commaDangle,
    indent,
    jsx,
    overrides = {},
    quoteProps,
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import("@stylistic/eslint-plugin"))

  const config = pluginStylistic.configs.customize({
    blockSpacing,
    braceStyle,
    commaDangle,
    indent,
    jsx,
    pluginName: "style",
    quoteProps,
    quotes,
    semi,
  }) as TypedFlatConfigItem

  return [
    {
      name: `${CONFIG_PREFIX}/stylistic/rules`,
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        "antfu/consistent-chaining": "error",
        "antfu/consistent-list-newline": "error",
        "antfu/curly": "error",
        // 'antfu/top-level-function': 'error',
        // "curly": ["error", "all"],
        "object-curly-newline": "off",

        "style/brace-style": ["error", "1tbs", { allowSingleLine: false }],
        // "style/space-before-blocks": ["error", "always"],
        "style/generator-star-spacing": ["error", { after: true, before: false }],
        "style/yield-star-spacing": ["error", { after: true, before: false }],

        ...overrides,
      },
    },
  ]
}
