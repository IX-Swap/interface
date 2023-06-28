import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ETHEREUM_DECIMAL_PLACES } from 'config'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { useCurrencyBalance } from 'app/pages/invest/hooks/useCurrencyBalance'

export interface NumberOfUnitsProps {
  symbol: string
  dsoDecimalScale?: number
}

export const NumberOfUnits = ({
  symbol,
  dsoDecimalScale
}: NumberOfUnitsProps) => {
  const decimalScale = dsoDecimalScale ?? ETHEREUM_DECIMAL_PLACES
  const { control } = useFormContext()

  const { currencyBalance } = useCurrencyBalance(symbol)
  const noBalance = currencyBalance <= 0

  return (
    <TypedField
      component={NumericInput}
      control={control}
      name='numberOfUnits'
      disabled={noBalance}
      label='Number of Units'
      numberFormat={{ ...moneyNumberFormat, decimalScale }}
      valueExtractor={numericValueExtractor}
    />
  )
}
