import { createFormatterCore, createParserCore } from '../core'
import { enUS } from '../locales'
import type { Locale } from '../locales'

export const createNumericParser = (locale: Locale) => createParserCore(locale)
export const parseNumeric = createNumericParser(enUS)

export const createNumericFormatter = (locale: Locale) => createFormatterCore(locale)
export const formatNumeric = createNumericFormatter(enUS)
