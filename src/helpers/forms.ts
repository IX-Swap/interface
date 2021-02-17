import { NumberFormatValues } from 'react-number-format'
import { Control, FieldError } from 'react-hook-form'
import get from 'lodash/get'
import { wysiwygToHtml } from 'helpers/rendering'

export const booleanValueExtractor = (
  _: React.ChangeEvent<{}>,
  value: boolean
): boolean => value

export const reverseBooleanValueExtractor = (
  _: React.ChangeEvent<{}>,
  value: boolean
): boolean => !value

export const numericValueExtractor = (
  values: NumberFormatValues
): number | undefined => values.floatValue

export const plainValueExtractor = (value: any) => value

export const sliderValueExtractor = (_: any, value: any) => value

export const wysiwygValueExtractor = (value: string) => {
  return wysiwygToHtml(value)
}

export const dateTimeValueExtractor = (value: Date, _stringValue: string) => {
  return value
}

export const hasValue = <T = any>(value: any): value is T => {
  if (typeof value === 'string') {
    return value.trim() !== ''
  }

  return value !== undefined && value !== null
}

export const pathToString = (path: any, rootPath?: string): string => {
  const fieldPath = Array.isArray(path)
    ? path
        .map(value =>
          Number.isInteger(value) ? `[${value as string}]` : value
        )
        .join('.')
        .replace(/.\[/, '[')
    : path

  return rootPath === undefined
    ? fieldPath
    : `${rootPath}.${fieldPath as string}`
}

export const getErrorFromControl = (path: string, control: Control) => {
  return get(control?.formStateRef.current.errors, path) as
    | FieldError
    | undefined
}
