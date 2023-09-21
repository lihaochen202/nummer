import { getLocale } from '../locales'
import type { Locale, LocaleOptions } from '../locales'
import { NaNIn, isNumber } from '../shared'
import { analyze } from './analyze'
import type { BeforeHook } from './hooks'

export interface Parser {
  (input: number | string, locale?: Locale): number
  locale: LocaleOptions
}

export function createParserCore(locale: Locale, before?: BeforeHook) {
  const parse: Parser = (input, locale) => {
    if (isNumber(input))
      return input

    const localeOptions = locale ? getLocale(locale) : parse.locale

    if (before)
      input = before(input, localeOptions)

    const { delimiter: { decimal, thousand } } = localeOptions
    const { error, negative, numeric } = analyze(input, decimal, thousand)
    if (error)
      return NaNIn
    return negative ? -numeric : +numeric
  }
  parse.locale = getLocale(locale)
  return parse
}
