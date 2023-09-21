export const isNumber = (input: any): input is number => typeof input === 'number'

export const isFunction = (input: any): input is (...args: any) => any => typeof input === 'function'

export const NaNIn = Number.NaN
export const isNaNIn = Number.isNaN
