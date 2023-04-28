import { percentageNumberFormat } from 'config/numberFormat'
import React from 'react'
import NumberFormat from 'react-number-format'

export interface PercentageNumberInterface {
  value?: number
}

export const PercentageNumber = ({ value }: PercentageNumberInterface) => {
  return (
    <NumberFormat
      {...percentageNumberFormat}
      displayType='text'
      value={value !== undefined ? value : '-'}
      style={{ color: '#778194' }}
    />
  )
}
