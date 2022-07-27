import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const UnitPrice = () => {
  const { control } = useFormContext()

  return (
    <TypedField
      disabled
      component={NumericInput}
      control={control}
      name='pricePerUnit'
      label='Unit Price'
      valueExtractor={numericValueExtractor}
      numberFormat={moneyNumberFormat}
    />
  )
}
