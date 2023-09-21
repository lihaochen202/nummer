export interface LocaleDelimiter {
  thousand: string
  decimal: string
}

export interface LocaleCurrency {
  abbr: string
  symbol: string
}

export interface LocaleOptions {
  delimiter: LocaleDelimiter
  currency: LocaleCurrency
}

export type LocaleProvider = () => LocaleOptions

export type Locale = LocaleOptions | LocaleProvider
