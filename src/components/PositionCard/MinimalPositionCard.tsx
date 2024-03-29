import React, { useState } from 'react'
import JSBI from 'jsbi'
import { Percent } from '@ixswap1/sdk-core'
import { darken } from 'polished'
import { Text } from 'rebass'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import { useTotalSupply } from '../../hooks/useTotalSupply'
import { useActiveWeb3React } from '../../hooks/web3'
import { useTokenBalance } from '../../state/wallet/hooks'
import { unwrappedToken } from '../../utils/unwrappedToken'
import { AutoColumn } from '../Column'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { PositionCardProps } from './interfaces'
import useTheme from 'hooks/useTheme'
import { TextRow } from 'components/TextRow/TextRow'
import Card from '../Card'
import CurrencyLogo from 'components/CurrencyLogo'
import { isMobile } from 'react-device-detect'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`

const MinimalPositionWrapper = styled.div`
  background: ${({ theme }) => theme.bg25};
  // padding: 42px 40px 42px 40px;
  border-radius: 8px;
  margin-top: 1.5rem;
  z-index: -5;
  max-width: 592px;
  width: 100%;
  border: solid 1px #e6e6ff;

  // @media (max-width: 768px) {
  //   padding: 22px 20px 22px 20px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//  padding: 22px 20px 22px 20px;
  `};
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  // @media (max-width: 768px) {
  //   font-size: 12px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   font-size: 12px;
  `};
`

const StyledText20 = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  // @media (max-width: 768px) {
  //   font-size: 12px;
  // }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   font-size: 12px;
  `};
`

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()
  const theme = useTheme()
  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)
  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]
  const showMinimalPositionCard = userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, JSBI.BigInt(0))
  const size = isMobile === true ? 25 : 40
  return (
    <>
      {showMinimalPositionCard ? (
        <MinimalPositionWrapper>
          <AutoColumn style={{ background: '#F7F7FA', border: '1px solid #E6E6FF ', padding: '40px' }} gap="12px">
            <FixedHeightRow onClick={() => setShowMore(!showMore)}>
              <RowFixed>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={false} size={size} />
                <StyledText color={theme.text12} marginLeft={'25px'}>
                  {currency0.symbol}/{currency1.symbol}
                </StyledText>
              </RowFixed>
              <RowFixed>
                <StyledText20 color={theme.text12}>
                  {userPoolBalance ? userPoolBalance.toSignificant(9) : '-'}
                </StyledText20>
              </RowFixed>
            </FixedHeightRow>
            <AutoColumn gap="10px">
              <TextRow
                textLeft={<Trans>My pool share</Trans>}
                textRight={<>{poolTokenPercentage ? poolTokenPercentage.toFixed(6) + '%' : '-'}</>}
              />
              <TextRow
                textLeft={<>{currency0.symbol}</>}
                textRight={
                  <>
                    {token0Deposited?.toSignificant(6)} <CurrencyLogo currency={currency0} size={'20px'} />
                  </>
                }
              />
              <TextRow
                textLeft={<>{currency1.symbol}</>}
                textRight={
                  <>
                    {token1Deposited?.toSignificant(6)} <CurrencyLogo currency={currency1} size={'20px'} />
                  </>
                }
              />
            </AutoColumn>
          </AutoColumn>
        </MinimalPositionWrapper>
      ) : null}
    </>
  )
}
