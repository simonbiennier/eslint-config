import process from "node:process"

import * as p from "@clack/prompts"
import c from "ansis"
import { cac } from "cac"

import { version } from "../../package.json"
import { CONFIG_NAME } from "../utils"
import { run } from "./run"

function header(): void {
  console.log("\n")
  p.intro(`${c.green`${CONFIG_NAME} `}${c.dim`v${version}`}`)
}

const cli = cac(CONFIG_NAME)

cli
  .command("", "Run the initialization or migration")
  .option("--yes, -y", "Skip prompts and use default values", { default: false })
  .option("--template, -t <template>", "Use the framework template for optimal customisation: vue / react / svelte / astro", { type: [] })
  .option("--extra, -e <extra>", "Use the extra utils: formatter / unocss", { type: [] })
  .action(async (args) => {
    header()
    try {
      await run(args)
    } catch (error) {
      p.log.error(c.inverse.red(" Failed to migrate "))
      p.log.error(c.red`✘ ${String(error)}`)
      process.exit(1)
    }
  })

cli.help()
cli.version(version)
cli.parse()
