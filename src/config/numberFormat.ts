import { NumberFormatProps } from 'react-number-format'

export const positiveNumberFormat: NumberFormatProps = {
  allowNegative: false,
  inputMode: 'numeric',
  decimalScale: 0
}

export const numberFormat: NumberFormatProps = {
  allowNegative: false,
  inputMode: 'numeric'
}

export const percentageNumberFormat: NumberFormatProps = {
  allowNegative: false,
  decimalScale: 3,
  inputMode: 'numeric',
  suffix: ' %',
  isNumericString: true
}

export const monthsNumberFormat: NumberFormatProps = {
  allowNegative: false,
  isNumericString: true,
  inputMode: 'numeric',
  decimalScale: 0,
  suffix: ' months'
}

export const moneyNumberFormat: NumberFormatProps = {
  decimalScale: 2,
  inputMode: 'numeric',
  thousandSeparator: true,
  allowEmptyFormatting: true,
  isNumericString: true,
  allowNegative: false
}

export const leadingZerosNumberFormat: NumberFormatProps = {
  ...positiveNumberFormat,
  isNumericString: true,
  allowLeadingZeros: true
}
