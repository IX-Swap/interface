import { NumberFormatProps } from 'react-number-format'

export const positiveNumberFormat: NumberFormatProps<any> = {
  allowNegative: false,
  inputMode: 'numeric',
  decimalScale: 0
}

export const numberFormat: NumberFormatProps<any> = {
  allowNegative: false,
  inputMode: 'numeric'
}

export const percentageNumberFormat: NumberFormatProps<any> = {
  allowNegative: false,
  decimalScale: 3,
  inputMode: 'numeric',
  suffix: ' %',
  isNumericString: true
}

export const monthsNumberFormat: NumberFormatProps<any> = {
  allowNegative: false,
  isNumericString: true,
  inputMode: 'numeric',
  decimalScale: 0,
  suffix: ' months'
}

export const moneyNumberFormat: NumberFormatProps<any> = {
  decimalScale: 2,
  inputMode: 'numeric',
  thousandSeparator: true,
  allowEmptyFormatting: true,
  isNumericString: true,
  allowNegative: false
}

export const leadingZerosNumberFormat: NumberFormatProps<any> = {
  ...positiveNumberFormat,
  isNumericString: true,
  allowLeadingZeros: true
}
