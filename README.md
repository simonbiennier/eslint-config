# @simonbiennier/eslint-config

[![npm](https://img.shields.io/npm/v/@simonbiennier/eslint-config?color=444&label=)](https://npmjs.com/package/@simonbiennier/eslint-config)

- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Reasonable defaults, best practices, only one line of config
- Designed to work with TypeScript, JSX, Vue, JSON, YAML, Toml, Markdown, etc. Out-of-box.
- [Customisable](#customisation)
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Optional [React](#react), [Next.js](#nextjs), [Svelte](#svelte), [UnoCSS](#unocss), [Astro](#astro), [Solid](#solid) support
- Optional [formatters](#formatters) support for formatting CSS, HTML, XML, etc.
- **Style principle**: Minimal for reading, stable for diff, consistent
  - Sorted imports, dangling commas
  - Double quotes, no semi
  - Using [ESLint stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Respects `.gitignore` by default
- Requires ESLint v9.5.0+

> [!NOTE]
> This repository is a fork of [antfu/eslint-config](https://github.com/antfu/eslint-config).

## Usage

### Starter wizard

Use the provided CLI tool to help you set up your project.

```bash
pnpx @simonbiennier/eslint-config@latest
```

### Manual install

If you prefer to set up manually:

```bash
pnpm i -D eslint @simonbiennier/eslint-config
```

And create `eslint.config.js` in your project root:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config()
```

<details>
<summary>
Combined with legacy config:
</summary>

If you still use some configs from the legacy eslintrc format, you can use the [`@eslint/eslintrc`](https://www.npmjs.com/package/@eslint/eslintrc) package to convert them to the flat config.

```js
import { FlatCompat } from "@eslint/eslintrc"
// eslint.config.mjs
import config from "@simonbiennier/eslint-config"

const compat = new FlatCompat()

export default config(
  {
    ignores: [],
  },

  // legacy config
  ...compat.config({
    extends: [
      "eslint:recommended",
      // other extends...
    ],
  })

  // other flat configs...
)
```

> Note that `.eslintignore` no longer works in flat config, see [customization](#customisation) for more details.

</details>

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## IDE support (auto fix on save)

<details>
<summary>🟦 VS Code support</summary>

<br>

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
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
  ],

  // js, ts settings
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "javascript.preferences.importModuleSpecifier": "non-relative",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.validate.enable": true,
  "typescript.validate.enable": true
}
```

</details>

## Customisation

Since v1.0, we migrated to [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organisation and composition.

Normally you only need to import the `config` preset:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  // Type of the project. 'lib' for libraries, the default is 'app'
  type: "lib",

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  // The `ignores` option in the option (first argument) is specifically treated to always be global ignores
  // And will **extend** the config's default ignores, not override them
  // You can also pass a function to modify the default ignores
  ignores: [
    "**/fixtures",
    // ...globs
  ],

  // Parse the `.gitignore` file to get the ignores, on by default
  gitignore: true,

  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: "single", // or 'double'
  },

  // TypeScript and Vue are autodetected, you can also explicitly enable them:
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
})
```

The `config` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config(
  {
    // configures for config
  },

  // from the second arguments they are eslint flat configs
  // you can have multiple configs
  {
    files: ["**/*.ts"],
    rules: {},
  },
  {
    rules: {},
  },
)
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

<details>
<summary>Advanced example</summary>

We wouldn't recommend using this style in general unless you know exactly what they are doing, as there are shared options between configs and might need extra care to make them consistent.

```js
// eslint.config.js
import {
  combine,
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  toml,
  typescript,
  unicorn,
  vue,
  yaml,
} from "@simonbiennier/eslint-config"

export default combine(
  ignores(),
  javascript(/* options */),
  comments(),
  node(),
  jsdoc(),
  imports(),
  unicorn(),
  typescript(/* options */),
  stylistic(),
  vue(),
  jsonc(),
  yaml(),
  toml(),
  markdown(),
)
```

</details>

Check out the [configs](https://github.com/simonbiennier/eslint-config/blob/main/src/configs) and [factory](https://github.com/simonbiennier/eslint-config/blob/main/src/factory.ts) for more details.

> Thanks to [sxzz/eslint-config](https://github.com/sxzz/eslint-config) for the inspiration and reference.

### Plugin renaming

Since flat config requires us to explicitly provide the plugin names (instead of the mandatory convention from npm package name), we renamed some plugins to make the overall scope more consistent and easier to write.

| New Prefix | Original Prefix        | Source Plugin                                                                                         |
| ---------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `import/*` | `import-lite/*`        | [eslint-plugin-import-lite](https://github.com/9romise/eslint-plugin-import-lite)                     |
| `node/*`   | `n/*`                  | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)                                |
| `yaml/*`   | `yml/*`                | [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml)                                   |
| `ts/*`     | `@typescript-eslint/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)            |
| `style/*`  | `@stylistic/*`         | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic)                      |
| `test/*`   | `vitest/*`             | [@vitest/eslint-plugin](https://github.com/vitest-dev/eslint-plugin-vitest)                           |
| `test/*`   | `no-only-tests/*`      | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests)             |
| `next/*`   | `@next/next`           | [@next/eslint-plugin-next](https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next) |

When you want to override rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

> [!NOTE]
> About plugin renaming - it is actually rather a dangerous move that might lead to potential naming collisions, pointed out [here](https://github.com/eslint/eslint/discussions/17766) and [here](https://github.com/prettier/eslint-config-prettier#eslintconfigjs-flat-config-plugin-caveat). As this config also very **personal** and **opinionated**, I ambitiously position this config as the only **"top-level"** config per project, that might pivots the taste of how rules are named.
>
> This config cares more about the user-facings DX, and try to ease out the implementation details. For example, users could keep using the semantic `import/order` without ever knowing the underlying plugin has migrated twice to `eslint-plugin-i` and then to `eslint-plugin-import-x`. User are also not forced to migrate to the implicit `i/order` halfway only because we swapped the implementation to a fork.
>
> That said, it's probably still not a good idea. You might not want to do this if you are maintaining your own eslint config.
>
> Feel free to open issues if you want to combine this config with some other config presets but faced naming collisions. I am happy to figure out a way to make them work. But at this moment I have no plan to revert the renaming.

Since v2.9.0, this preset will automatically rename the plugins also for your custom configs. You can use the original prefix to override the rules directly.

<details>
<summary>Change back to original prefix</summary>

If you really want to use the original prefix, you can revert the plugin renaming by:

```ts
import config from "@simonbiennier/eslint-config"

export default config()
  .renamePlugins({
    ts: "@typescript-eslint",
    yaml: "yml",
    node: "n"
    // ...
  })
```

</details>

### Rule overrides

Certain rules would only be enabled in specific files, for example, `ts/*` rules would only be enabled in `.ts` files and `vue/*` rules would only be enabled in `.vue` files. If you want to override the rules, you need to specify the file extension:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config(
  {
    vue: true,
    typescript: true
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ["**/*.vue"],
    rules: {
      "vue/operator-linebreak": ["error", "before"],
    },
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      "style/semi": ["error", "never"],
    },
  }
)
```

We also provided the `overrides` options in each integration to make it easier:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  vue: {
    overrides: {
      "vue/operator-linebreak": ["error", "before"],
    },
  },
  typescript: {
    overrides: {
      "ts/consistent-type-definitions": ["error", "interface"],
    },
  },
  yaml: {
    overrides: {
      // ...
    },
  },
})
```

### Config composer

Since v2.10.0, the factory function `config()` returns a [`FlatConfigComposer` object from `eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils#composer) where you can chain the methods to compose the config even more flexibly.

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config()
  .prepend(
    // some configs before the main config
  )
  // overrides any named configs
  .override(
    "simonbiennier/stylistic/rules",
    {
      rules: {
        "style/generator-star-spacing": ["error", { after: true, before: false }],
      }
    }
  )
  // rename plugin prefixes
  .renamePlugins({
    "old-prefix": "new-prefix",
    // ...
  })
// ...
```

### Vue

Vue support is detected automatically by checking if `vue` is installed in your project. You can also explicitly enable/disable it:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  vue: true
})
```

#### Vue 2

We have limited support for Vue 2 (as it's already [reached EOL](https://v2.vuejs.org/eol/)). If you are still using Vue 2, you can configure it manually by setting `vueVersion` to `2`:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  vue: {
    vueVersion: 2
  },
})
```

As it's in maintenance mode, we only accept bug fixes for Vue 2. It might also be removed in the future when `eslint-plugin-vue` drops support for Vue 2. We recommend upgrading to Vue 3 if possible.

#### Vue accessibility

To enable Vue accessibility support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  vue: {
    a11y: true
  },
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D eslint-plugin-vuejs-accessibility
```

### Optional configs

We provide some optional configs for specific use cases, that we don't include their dependencies by default.

#### Formatters

Use external formatters to format files that ESLint cannot handle yet (`.css`, `.html`, etc). Powered by [`eslint-plugin-format`](https://github.com/antfu/eslint-plugin-format).

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    markdown: "prettier",
  }
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D eslint-plugin-format
```

#### React

To enable React support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  react: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D @eslint-react/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react-refresh
```

#### Next.js

To enable Next.js support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  nextjs: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D @next/eslint-plugin-next
```

#### Svelte

To enable svelte support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  svelte: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D eslint-plugin-svelte
```

#### Astro

To enable astro support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  astro: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D eslint-plugin-astro
```

#### Solid

To enable Solid support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  solid: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D eslint-plugin-solid
```

#### UnoCSS

To enable UnoCSS support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  unocss: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D @unocss/eslint-plugin
```

#### Angular

To enable Angular support, you need to explicitly turn it on:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  angular: true,
})
```

Running `pnpx eslint` should prompt you to install the required dependencies, otherwise, you can install them manually:

```bash
pnpm i -D @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser
```

### Optional rules

This config also provides some optional plugins/rules for extended usage.

#### `command`

Powered by [`eslint-plugin-command`](https://github.com/antfu/eslint-plugin-command). It is not a typical rule for linting, but an on-demand micro-codemod tool that triggers by specific comments.

For a few triggers, for example:

- `/// to-function` - converts an arrow function to a normal function
- `/// to-arrow` - converts a normal function to an arrow function
- `/// to-for-each` - converts a for-in/for-of loop to `.forEach()`
- `/// to-for-of` - converts a `.forEach()` to a for-of loop
- `/// keep-sorted` - sorts an object/array/interface
- ... etc. - refer to the [documentation](https://github.com/antfu/eslint-plugin-command#built-in-commands)

You can add the trigger comment one line above the code you want to transform, for example (note the triple slash):

<!-- eslint-skip -->

```ts
/// to-function
const foo = async (msg: string): void => {
  console.log(msg)
}
```

Will be transformed to this when you hit save with your editor or run `eslint --fix`:

```ts
async function foo(msg: string): void {
  console.log(msg)
}
```

The command comments are usually one-off and will be removed along with the transformation.

### Type aware rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  typescript: {
    tsconfigPath: "tsconfig.json",
  },
})
```

### Editor specific disables

Auto-fixing for the following rules are disabled when ESLint is running in a code editor:

- [`prefer-const`](https://eslint.org/docs/rules/prefer-const)
- [`test/no-only-tests`](https://github.com/levibuzolic/eslint-plugin-no-only-tests)
- [`unused-imports/no-unused-imports`](https://www.npmjs.com/package/eslint-plugin-unused-imports)
- [`pnpm/json-enforce-catalog`](https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm#rules)
- [`pnpm/json-prefer-workspace-settings`](https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm#rules)
- [`pnpm/json-valid-catalog`](https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm#rules)

> Since v3.16.0, they are no longer disabled, but made non-fixable using [this helper](https://github.com/antfu/eslint-flat-config-utils#composerdisablerulesfix).

This is to prevent unused imports from getting removed by the editor during refactoring to get a better developer experience. Those rules will be applied when you run ESLint in the terminal or [lint staged](#lint-staged). If you don't want this behavior, you can disable them:

```js
// eslint.config.js
import config from "@simonbiennier/eslint-config"

export default config({
  isInEditor: false
})
```

### Lint staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
pnpm i -D lint-staged simple-git-hooks

// to active the hooks
pnpx simple-git-hooks
```

## View what rules are enabled

I built a visual tool to help you view what rules are enabled in your project and apply them to what files, [@eslint/config-inspector](https://github.com/eslint/config-inspector)

Go to your project root that contains `eslint.config.js` and run:

```bash
pnpx @eslint/config-inspector
```

## FAQ

### Prettier?

You can still use Prettier to format files that are not supported well by ESLint yet, such as `.css`, `.html`, etc. See [formatters](#formatters) for more details.

### oxlint?

We do have a plan to integrate [oxlint](https://github.com/oxc-project/oxc) in someway to speed up the linting process. However there are still some blocks we are waiting for. Track the progress [in this issue: **Oxlint integration plan**](https://github.com/antfu/eslint-config/issues/767).

### dprint?

[dprint](https://dprint.dev/) is also a great formatter that with more abilities to customize. However, it's in the same model as Prettier which reads the AST and reprints the code from scratch. This means it's similar to Prettier, which ignores the original line breaks and might also cause the inconsistent diff. So in general, we prefer to use ESLint to format and lint JavaScript/TypeScript code.

Meanwhile, we do have dprint integrations for formatting other files such as `.md`. See [formatters](#formatters) for more details.

### How to format CSS?

You can opt-in to the [`formatters`](#formatters) feature to format your CSS. Note that it's only doing formatting, but not linting. If you want proper linting support, give [`stylelint`](https://stylelint.io/) a try.
