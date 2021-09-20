import { Trans } from '@lingui/macro'
import SettingsTab from 'components/Settings'
import React from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import styled from 'styled-components'
import { RowBetween } from '../../components/Row'

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  `};
`
const Title = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
`
export const LiquidityTitle = () => {
  const { allowedSlippage } = useDerivedSwapInfo()
  return (
    <TitleRow padding={'0'}>
      <Title>
        <Trans>Liquidity Pool</Trans>
      </Title>
      <SettingsTab placeholderSlippage={allowedSlippage} />
    </TitleRow>
  )
}
