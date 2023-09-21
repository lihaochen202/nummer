import { getLocale } from '../locales'
import type { Locale, LocaleOptions } from '../locales'
import { lastSplitGroup } from '../shared'
import { analyze } from './analyze'
import type { Hooks } from './hooks'

export interface Formatter {
  (input: number | string, digits?: number, locale?: Locale): string
  locale: LocaleOptions
}

export function createFormatterCore(locale: Locale, hooks?: Hooks) {
  const format: Formatter = (input, digits = 2, locale) => {
    input = Object.is(input, -0) ? `-${input}` : `${input}`

    const localeOptions = locale ? getLocale(locale) : format.locale

    if (hooks?.before)
      input = hooks.before(input, localeOptions)

    const { delimiter: { decimal, thousand } } = localeOptions
    const result = analyze(input, decimal, thousand)
    if (result.error)
      return ''

    const [_integer, _decimal] = toFixed(result.numeric, digits).split('.')
    result.numeric = `${lastSplitGroup(_integer, 3).join(thousand)}${_decimal ? `${decimal}${_decimal}` : ''}`
    if (hooks?.after)
      return hooks.after(result, localeOptions)
    return result.negative ? `-${result.numeric}` : result.numeric
  }
  format.locale = getLocale(locale)
  return format
}

export function toFixed(input: string, digits = 0) {
  if (!~input.indexOf('.'))
    return `${input}${digits ? `.${'0'.repeat(digits)}` : ''}`

  const [integer, decimal] = input.split('.')
  if (decimal.length <= digits)
    return `${input}${'0'.repeat(digits - decimal.length)}`

  const threshold = 5
  const lastDecimal = +(decimal[digits] || 0)
  if (lastDecimal < threshold)
    return `${integer}.${decimal.slice(0, digits)}`

  const nums = [...integer, ...decimal.slice(0, digits)]
  const added = [1]
  let index = nums.length - 1
  while (added.length && index >= 0) {
    const value = +nums[index] + added.pop()!
    if (value < 10) {
      nums[index] = `${value}`
    }
    else {
      nums[index] = '0'
      added.push(1)
    }
    index--
  }
  added.length && nums.unshift('1')
  nums.splice(nums.length - digits, 0, '.')
  return nums.join('')
}
