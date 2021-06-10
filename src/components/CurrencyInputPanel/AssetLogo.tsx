import React from 'react'
import { Pair } from '@uniswap/v2-sdk'
import { Currency } from '@uniswap/sdk-core'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
interface props {
  pair?: Pair | null
  currency?: Currency | null
}
export const AssetLogo = ({ pair, currency }: props) => {
  return (
    <>
      {pair ? (
        <span style={{ marginRight: '0.5rem' }}>
          <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
        </span>
      ) : currency ? (
        <CurrencyLogo style={{ marginRight: '0.5rem' }} currency={currency} size={'24px'} />
      ) : null}{' '}
    </>
  )
}
