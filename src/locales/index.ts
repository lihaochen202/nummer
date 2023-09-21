import { isFunction } from '../shared'
import type { Locale } from './types'

export * from './types'
export * from './en-US'

export function getLocale(locale: Locale) {
  return isFunction(locale) ? locale() : locale
}
