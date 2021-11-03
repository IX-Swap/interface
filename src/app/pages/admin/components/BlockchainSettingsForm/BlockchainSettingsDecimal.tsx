import { TypedField } from 'components/form/TypedField'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { NumericInput } from 'components/form/NumericInput'
import { numberFormat } from 'config/numberFormat'
import { BlockchainSettingsFormValues } from './BlockchainSettingsForm'
import { numericValueExtractor } from 'helpers/forms'

interface BlockchainSettingsDecimalProps {
  network?: string
  decimal: BlockchainSettingsFormValues['decimal']
}

export const BlockchainSettingsDecimal = ({
  network,
  decimal
}: BlockchainSettingsDecimalProps) => {
  const { control } = useFormContext<BlockchainSettingsFormValues>()

  useEffect(() => {
    // this is weird, although I set shouldDirty to false, the field is still
    // marked as dirty in the form state, and the "Update" button becomes active
    // need to spend more time to see what is wrong with it
    control.setValue('decimal', decimal, {
      shouldDirty: false
    })

    // we need to update the value manually because BlockchainSettingsForm
    // is not being unmounted when switching networks, maybe we can figure this
    // out later on, I remember same thing was happening is DSO module
    // eslint-disable-next-line
  }, [network])

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
      defaultValue={decimal}
    />
  )
}
