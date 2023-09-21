import { clearPrefix, error, isNaNIn, some, swap } from '../shared'

export interface AnalyzeResult {
  numeric: string
  sci?: boolean
  negative?: boolean
  error?: boolean
}

export function analyze(input: string, decimal: string, thousand: string): AnalyzeResult {
  input = input.trim()
  if (!input)
    return { numeric: '0' }

  const negative = input[0] === '-'
  if (negative)
    input = input.slice(1)

  const sci = input.includes('e')
  try {
    const numeric = sci
      ? analyzeSci(input, decimal, thousand)
      : analyzeNonSci(input, decimal, thousand)
    return { numeric, sci, negative }
  }
  catch (error) {
    return { numeric: '', error: true }
  }
}

export function analyzeNonSci(input: string, decimal: string, thousand: string) {
  if (input[0] === decimal)
    input = `0${input}`

  const chars = input.split(decimal)
  if (chars.length > 2)
    error()

  let [integerStr, decimalStr = ''] = chars
  if (some(integerStr, char => char !== '0'))
    integerStr = clearPrefix(integerStr, '0')
  const integerStrs = integerStr.split(thousand)

  if (
    integerStrs.some(char => isNaNIn(+char))
    || isNaNIn(+decimalStr)
  )
    error()

  const integer = clearPrefix(integerStrs.join(''), '0') || '0'
  return `${integer}.${decimalStr}`
}

export function analyzeSci(input: string, decimal: string, thousand: string) {
  const chars = input.split('e')
  if (chars.length > 2)
    error()

  const [_numeric, _power] = chars
  if (isNaNIn(+_power))
    error()

  const numeric = analyzeNonSci(_numeric, decimal, thousand)
  return +numeric ? offsetDecimal(numeric, +_power) : numeric
}

export function offsetDecimal(input: string, digit: number) {
  if (!digit)
    return input

  if (!+input)
    return '0'

  const chars = input.split('')
  let index = chars.indexOf('.')
  if (!~index) {
    index = chars.length
    chars.push('.')
  }

  while (digit) {
    const increment = digit > 0
    if (increment) {
      if (index === chars.length - 1)
        chars.splice(index, 1, '0', '.')
      else
        swap(chars, index, index + 1)
      index++
    }
    else {
      if (!index) {
        chars.splice(index, 1, '0')
        chars.unshift('.')
      }
      else {
        swap(chars, index, index - 1)
        index--
      }
    }

    increment ? digit-- : digit++
  }
  chars[0] === '.' && chars.unshift('0')
  return chars.join('')
}
