import { createFormatterCore, createParserCore } from '../core'
import type { AfterHook, BeforeHook } from '../core'
import { enUS } from '../locales'
import type { Locale } from '../locales'
import { removeBrackets, removeSymbol } from '../shared'

const removeCurrencySymbols: BeforeHook = (str, { currency }) => {
  str = removeBrackets(str).trim()
  str = removeSymbol(str, currency.abbr).trim()
  const negative = str[0] === '-'
  return negative
    ? `-${removeSymbol(str.slice(1), currency.symbol)}`
    : removeSymbol(str, currency.symbol)
}

const concatCurrencySymbols: AfterHook = ({ negative, numeric }, { currency }) => {
  return `${negative ? '-' : ''}${currency.symbol}${numeric}`
}

export function createCurrencyParser(locale: Locale) {
  return createParserCore(locale, removeCurrencySymbols)
}

export const parseCurrency = createCurrencyParser(enUS)

export function createCurrencyFormatter(locale: Locale, after?: AfterHook) {
  return createFormatterCore(locale, {
    before: removeCurrencySymbols,
    after: after || concatCurrencySymbols,
  })
}

export const formatCurrency = createCurrencyFormatter(enUS)
