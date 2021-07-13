import { percentageNumberFormat } from 'config/numberFormat'
import { getPercentageValue } from 'config/utils'
import React from 'react'
import NumberFormat from 'react-number-format'

export interface PercentageNumberInterface {
  value?: number
}

export const PercentageNumber = ({ value }: PercentageNumberInterface) => {
  const valueToPercent = (value?: number) => {
    return value !== undefined ? getPercentageValue(value) : value
  }

  return (
    <NumberFormat
      {...percentageNumberFormat}
      displayType='text'
      value={valueToPercent(value)}
    />
  )
}
