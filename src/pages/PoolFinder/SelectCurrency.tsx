import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import useTheme from 'hooks/useTheme'

import { ColumnCenter } from '../../components/Column'
import { CurrencyRow } from './CurrencyRow'
import { Fields } from './enums'
import { ReactComponent as Plus } from '../../assets/images/newAdd.svg'

interface Props {
  currency0: Currency | null
  currency1: Currency | null
  chooseToken: (arg: Fields) => void
}

const plusIconStyle = {
  width: '50px',
  height: '50px',
  zIndex: '1',
  marginTop: '-27px',
  marginBottom: '-50px',
}

export const SelectCurrency = ({ currency0, currency1, chooseToken }: Props) => {
  return (
    <>
      <CurrencyRow currency={currency0} chooseToken={() => chooseToken(Fields.TOKEN0)} />
      <ColumnCenter>
        <Plus style={plusIconStyle} />
      </ColumnCenter>
      <CurrencyRow currency={currency1} chooseToken={() => chooseToken(Fields.TOKEN1)} />
    </>
  )
}
