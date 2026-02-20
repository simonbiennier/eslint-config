export interface PromItem<T> {
  label: string
  value: T
  hint?: string
}

export type FrameworkOption = "vue" | "react" | "svelte" | "astro" | "solid" | "slidev"

export type ExtraLibrariesOption = "formatter" | "a11y"

export interface PromptResult {
  uncommittedConfirmed: boolean
  frameworks: FrameworkOption[]
  extra: ExtraLibrariesOption[]
  updateVscodeSettings: unknown
}
