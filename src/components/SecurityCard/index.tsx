import { Currency } from '@ixswap1/sdk-core'
import useTheme from 'hooks/useTheme'
import { useActiveWeb3React } from 'hooks/web3'
import { darken } from 'polished'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Box } from 'rebass'
import { useCurrencyBalance } from 'state/wallet/hooks'
import styled, { CSSProperties } from 'styled-components/macro'
import { SemiTransparent, TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { routes } from 'utils/routes'
import Card, { LightCard } from '../Card'
import Row, { RowBetween, RowStart } from '../Row'
import { CurrencyHeader } from './CurrencyHeader'
import { Status } from './Status'
import { getStoStatus, STOStatus } from './STOStatus'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`
const StyledPositionCard = styled(LightCard)`
  border: none;
  background: ${({ theme }) => theme.bgG4};
  position: relative;
  overflow: hidden;
  padding: 18px 20px 18px 22px;
  text-decoration: none;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      min-height: 85px
  `};
`

export default function SecurityCard({ currency, style }: { currency: Currency; style?: CSSProperties }) {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const status = useMemo(() => {
    const statusText = (currency as any).tokenInfo?.tokenUser?.status
    return statusText ? getStoStatus(statusText) : ''
  }, [currency])
  // TODO: adjust status when you will have the data
  return (
    <Row style={style}>
      <Row style={{ paddingBottom: '10px' }}>
        <StyledPositionCard as={Link} to={routes.securityTokens(currency)} data-testid="custodian-sec-token-info">
          <RowBetween style={{ flexWrap: 'wrap' }}>
            <RowStart style={{ width: 'fit-content' }}>
              <CurrencyHeader currency={currency} />
              <SemiTransparent>
                <TYPE.body4 style={{ marginLeft: '12px', fontWeight: 'normal' }} color={theme.text2}>
                  {currency.name}
                </TYPE.body4>
              </SemiTransparent>
            </RowStart>
            {status && (
              <Box style={{ width: 'fit-content' }}>
                {status === STOStatus.PASSED && <TYPE.body4>{formatCurrencyAmount(balance, 9)}</TYPE.body4>}
                {status !== STOStatus.PASSED && <Status status={status} />}
              </Box>
            )}
          </RowBetween>
        </StyledPositionCard>
      </Row>
    </Row>
  )
}
