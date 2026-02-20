import type { ExtraLibrariesOption, PromptResult } from "../types"
import fsp from "node:fs/promises"

import path from "node:path"
import process from "node:process"

import * as p from "@clack/prompts"

import c from "ansis"
import { version } from "../../../package.json"
import { CONFIG_NAME } from "../../utils"
import { dependenciesMap } from "../constants"
import { versionsMap } from "../constants-generated"
import { getPackage } from "../utils"

export async function updatePackageJson(result: PromptResult): Promise<void> {
  const cwd = process.cwd()

  const pathPackageJSON = path.join(cwd, "package.json")

  p.log.step(c.cyan`Bumping ${CONFIG_NAME} to v${version}`)

  const pkg = await getPackage()

  pkg.scripts ??= {}
  // eslint-disable-next-line dot-notation
  pkg.scripts["lint"] = "eslint --cache ."
  pkg.scripts["lint:fix"] = "eslint --cache --fix ."
  p.note(c.dim`lint, lint:fix`, "Added scripts")

  pkg.devDependencies ??= {}
  pkg.devDependencies[CONFIG_NAME] = `^${version}`
  pkg.devDependencies.eslint ??= versionsMap.eslint

  const addedPackages: string[] = []

  if (result.extra.length) {
    result.extra.forEach((item: ExtraLibrariesOption) => {
      switch (item) {
        case "formatter":
          (<const>[
            ...dependenciesMap.formatter,
            ...(result.frameworks.includes("astro") ? dependenciesMap.formatterAstro : []),
          ]).forEach((f) => {
            if (!f) return

            pkg.devDependencies[f] = versionsMap[f as keyof typeof versionsMap]
            addedPackages.push(f)
          })
          break
        case "a11y":
          dependenciesMap.a11y.forEach((f) => {
            pkg.devDependencies[f] = versionsMap[f as keyof typeof versionsMap]
            addedPackages.push(f)
          })
          break
      }
    })
  }

  for (const framework of result.frameworks) {
    const deps = dependenciesMap[framework]
    if (deps) {
      deps.forEach((f) => {
        pkg.devDependencies[f] = versionsMap[f as keyof typeof versionsMap]
        addedPackages.push(f)
      })
    }
  }

  if (addedPackages.length) {
    p.note(c.dim(addedPackages.join(", ")), "Added packages")
  }

  await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, 2))
  p.log.success(c.green`Changes wrote to package.json`)
}
