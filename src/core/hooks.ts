import type { LocaleOptions } from '../locales'
import type { AnalyzeResult } from './analyze'

export type BeforeHook = (source: string, locale: LocaleOptions) => string

export type AfterHook = (result: AnalyzeResult, locale: LocaleOptions) => string

export interface Hooks {
  before?: BeforeHook
  after?: AfterHook
}
