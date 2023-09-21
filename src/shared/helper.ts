export function error(message?: string) {
  throw new Error(message)
}

type Predicate = (char: string, index: number) => boolean

export function some(str: string, predicate: Predicate) {
  for (let i = 0; i < str.length; i++) {
    if (predicate(str[i], i))
      return true
  }
  return false
}

export function every(str: string, predicate: Predicate) {
  for (let i = 0; i < str.length; i++) {
    if (!predicate(str[i], i))
      return false
  }

  return true
}

export function clearPrefix(str: string, char: string) {
  while (str[0] === char)
    str = str.slice(1)
  return str
}

export function removeBrackets(str: string) {
  const leftBrackets = ['(', '[', '{']
  while (leftBrackets.includes(str[0]))
    str = str.slice(1)
  const rightBrackets = [')', ']', '}']
  while (rightBrackets.includes(str[str.length - 1]))
    str = str.slice(0, -1)
  return str
}

export function removeSymbol(str: string, symbol: string) {
  if (str.slice(0, symbol.length) === symbol)
    return str.slice(symbol.length)
  if (str.slice(-symbol.length) === symbol)
    return str.slice(0, -symbol.length)
  return str
}

export function swap<T>(arr: T[], i: number, j: number) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

interface SplitGroup {
  (val: string, count: number): string[]
  <T>(val: T[], count: number): T[][]
}

export const splitGroup: SplitGroup = (val: string | any[], count: number) => {
  const result: any[] = []
  for (let i = 0; i < val.length; i += count)
    result.push(val.slice(i, i + count))
  return result
}

export const lastSplitGroup: SplitGroup = (val: string | any[], count: number) => {
  const result: any[] = []
  let i = val.length
  while (i > 0) {
    const start = i - count
    result.unshift(val.slice(start < 0 ? 0 : start, i))
    i = start
  }
  return result
}
