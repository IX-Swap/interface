import React from 'react'
import { HideSmall } from '../../theme'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'
import { RowBetween } from '../../components/Row'

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`
const Title = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  text-transform: uppercase;
`
export const LiquidityTitle = () => {
  return (
    <TitleRow padding={'0'}>
      <HideSmall>
        <Title>
          <Trans>Liquidity Pool</Trans>
        </Title>
      </HideSmall>
    </TitleRow>
  )
}
