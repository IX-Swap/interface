import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import useTheme from 'hooks/useTheme'
import { Plus } from 'react-feather'
import { ColumnCenter } from '../../components/Column'
import { CurrencyRow } from './CurrencyRow'
import { Fields } from './enums'

interface Props {
  currency0: Currency | null
  currency1: Currency | null
  chooseToken: (arg: Fields) => void
}

export const SelectCurrency = ({ currency0, currency1, chooseToken }: Props) => {
  const theme = useTheme()
  return (
    <>
      <CurrencyRow currency={currency0} chooseToken={() => chooseToken(Fields.TOKEN0)} />
      <ColumnCenter>{/* <Plus size="16" color={theme.text2} /> */}</ColumnCenter>
      <CurrencyRow currency={currency1} chooseToken={() => chooseToken(Fields.TOKEN1)} />
    </>
  )
}
