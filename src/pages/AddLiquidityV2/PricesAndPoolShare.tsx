import React from 'react'
import { Currency, Percent } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import { Field } from '../../state/mint/actions'
import { PoolPriceBar } from './PoolPriceBar'

const PricesWrapper = styled.div`
  background: ${({ theme }) => theme.bg12};
  backdrop-filter: blur(4px);
  border-radius: 34px;
  padding: 1.5rem 2rem;
  margin-top: 1rem;
`
const TitleWrapper = styled.div`
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text2};
  margin-bottom: 1.5rem;
`

interface Props {
  noLiquidity?: boolean
  currencies: { [field in Field]?: Currency }
  poolTokenPercentage?: Percent
  price?: any
  // price?: Price<Currency, Currency>
}

export const PricesAndPoolShare = ({ noLiquidity, currencies, poolTokenPercentage, price }: Props) => {
  return (
    <PricesWrapper>
      <TitleWrapper>
        {noLiquidity ? <Trans>Initial prices and pool share</Trans> : <Trans>Prices and pool share</Trans>}
      </TitleWrapper>
      <PoolPriceBar
        currencies={currencies}
        poolTokenPercentage={poolTokenPercentage}
        noLiquidity={noLiquidity}
        price={price}
      />
    </PricesWrapper>
  )
}
