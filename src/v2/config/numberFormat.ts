import { NumberFormatProps } from 'react-number-format'

export const percentageFormat: NumberFormatProps = {
  allowNegative: false,
  decimalScale: 2,
  inputMode: 'numeric',
  suffix: ' %',
  isNumericString: true
}

export const monthsFormat: NumberFormatProps = {
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
