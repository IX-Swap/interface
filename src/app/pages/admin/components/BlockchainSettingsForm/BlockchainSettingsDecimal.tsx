import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { NumericInput } from 'components/form/NumericInput'
import { numberFormat } from 'config/numberFormat'
import { BlockchainSettingsFormValues } from './BlockchainSettingsForm'
import { numericValueExtractor } from 'helpers/forms'

export const BlockchainSettingsDecimal = () => {
  const { control } = useFormContext<BlockchainSettingsFormValues>()

  return (
    <TypedField
      component={NumericInput}
      numberFormat={numberFormat}
      variant='outlined'
      style={{ width: 142 }}
      name='decimal'
      label={'Decimals'}
      control={control}
      valueExtractor={numericValueExtractor}
    />
  )
}
