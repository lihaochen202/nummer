import type { LocaleProvider } from './types'

export const enUS: LocaleProvider = () => ({
  delimiter: {
    thousand: ',',
    decimal: '.',
  },
  currency: {
    abbr: 'USD',
    symbol: '$',
  },
})
