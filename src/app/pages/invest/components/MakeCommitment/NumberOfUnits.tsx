import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { ETHEREUM_DECIMAL_PLACES } from 'config'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { useBalancesByAssetId } from 'hooks/balance/useBalancesByAssetId'

export interface NumberOfUnitsProps {
  dsoCurrencyId: string
  isCampaign?: boolean
  dsoDecimalScale?: number
}

export const NumberOfUnits = ({
  dsoCurrencyId,
  isCampaign = false,
  dsoDecimalScale
}: NumberOfUnitsProps) => {
  const decimalScale = dsoDecimalScale ?? ETHEREUM_DECIMAL_PLACES
  const { control, setValue } = useFormContext()

  const { data } = useBalancesByAssetId(dsoCurrencyId)
  const noBalance = (data.map[dsoCurrencyId]?.available ?? 0) <= 0

  useEffect(() => {
    if (isCampaign) {
      setValue('numberOfUnits', 1)
    }
  }, [isCampaign, setValue])

  return (
    <TypedField
      component={NumericInput}
      control={control}
      name='numberOfUnits'
      disabled={isCampaign || noBalance}
      label='Number of Units'
      numberFormat={{ ...moneyNumberFormat, decimalScale }}
      valueExtractor={numericValueExtractor}
    />
  )
}
