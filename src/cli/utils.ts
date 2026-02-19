import { execSync } from "node:child_process"
import fsp from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { CONFIG_NAME } from "../utils"

export async function getPackage(): Promise<Record<string, any>> {
  const cwd = process.cwd()
  const pathPackageJSON = path.join(cwd, "package.json")
  const pkgContent = await fsp.readFile(pathPackageJSON, "utf-8")
  return JSON.parse(pkgContent)
}

export function isGitRepo(): boolean {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

export function isGitClean(): boolean {
  try {
    execSync("git diff-index --quiet HEAD --")
    return true
  } catch {
    return false
  }
}

export function getEslintConfigContent(
  mainConfig: string,
  additionalConfigs?: string[],
): string {
  return `
import config from "${CONFIG_NAME}"

export default config({
${mainConfig}
}${additionalConfigs?.map(config => `,{\n${config}\n}`)})
`.trimStart()
}
