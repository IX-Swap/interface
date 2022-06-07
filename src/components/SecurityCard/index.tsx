import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from 'rebass'
import Column from 'components/Column'
import { Currency } from '@ixswap1/sdk-core'
import { darken } from 'polished'
import styled, { CSSProperties } from 'styled-components/macro'

import { AccreditationStatusEnum } from 'components/Vault/enum'
import { useActiveWeb3React } from 'hooks/web3'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { routes } from 'utils/routes'

import Card, { LightCard } from '../Card'
import Row, { RowBetween } from '../Row'
import { CurrencyHeader } from './CurrencyHeader'
import { Status } from './Status'

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
      min-height: 70px;
      padding: 15px 20px;
  `};
`

const StyledRowBetween = styled(RowBetween)`
  display: grid;
  grid-template-columns: auto auto;
  > div:last-child {
    justify-self: right;
  }
`

const ShortenedAmount = styled(TYPE.body4)`
  max-width: 96px;
  min-width: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
`
export default function SecurityCard({
  currency,
  style,
  isAll,
}: {
  currency: Currency
  style?: CSSProperties
  isAll: boolean
}) {
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const brokerDealerStatus = (currency as any)?.tokenInfo?.accreditationRequest?.brokerDealerStatus
  const custodianStatus = (currency as any)?.tokenInfo?.accreditationRequest?.custodianStatus
  const isAccredited = [custodianStatus, brokerDealerStatus].every(
    (status) => status === AccreditationStatusEnum.APPROVED
  )
  return (
    <Row style={style}>
      <Row style={{ paddingBottom: '10px', paddingRight: '10px' }}>
        <StyledPositionCard
          as={Link}
          to={routes.securityTokens(currency as WrappedTokenInfo)}
          data-testid="custodian-sec-token-info"
        >
          <Column>
            <StyledRowBetween>
              <Box style={{ display: 'flex', justifyContent: 'flex-start', width: 'fit-content' }}>
                <CurrencyHeader currency={currency} showFullName />
              </Box>
              {account && isAll && (
                <Box>
                  {isAccredited && (
                    <ShortenedAmount>{formatCurrencyAmount(balance, currency.decimals ?? 18)}</ShortenedAmount>
                  )}
                  {!isAccredited && (
                    <Status custodianStatus={custodianStatus} brokerDealerStatus={brokerDealerStatus} />
                  )}
                </Box>
              )}
            </StyledRowBetween>
          </Column>
        </StyledPositionCard>
      </Row>
    </Row>
  )
}
