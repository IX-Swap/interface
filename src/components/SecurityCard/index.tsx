import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ChevronElement } from 'components/ChevronElement'
import { useActiveWeb3React } from 'hooks/web3'
import { darken } from 'polished'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box } from 'rebass'
import { useCurrencyBalance } from 'state/wallet/hooks'
import styled from 'styled-components/macro'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { routes } from 'utils/routes'
import { shortenAddress } from '../../utils'
import { ButtonGradient } from '../Button'
import Card, { LightCard } from '../Card'
import { AutoColumn } from '../Column'
import { RowBetween, RowCenter } from '../Row'
import { TextRow } from '../TextRow/TextRow'
import { CurrencyHeader } from './CurrencyHeader'
import { Status } from './Status'
import { getStoStatus } from './STOStatus'

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
  padding: 2rem 2rem 1.5rem 2rem;
  margin-bottom: 0.5rem;
`

export default function SecurityCard({ currency }: { currency: Currency }) {
  const [showMore, setShowMore] = useState(false)
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  // TODO: adjust status when you will have the data
  return (
    <StyledPositionCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <CurrencyHeader currency={currency} />
          <Box style={{ gap: '6px', display: 'flex', width: 'fit-content' }}>
            <Status status={getStoStatus((currency as any).tokenInfo?.tokenUser?.status)} />
            <ChevronElement showMore={showMore} setShowMore={setShowMore} />
          </Box>
        </FixedHeightRow>

        {showMore && (
          <AutoColumn gap="8px">
            <TextRow textLeft={<Trans>Token ID</Trans>} textRight={shortenAddress((currency as any).address)} />
            <TextRow textLeft={<Trans>Deposit address wallet</Trans>} />
            <TextRow textLeft={<Trans>Amount</Trans>} textRight={formatCurrencyAmount(balance, 4)} />
            <RowCenter marginTop="10px">
              <ButtonGradient as={Link} to={routes.securityTokens(currency)} width={'50%'} data-testid="token-info">
                <Trans>Info</Trans>
              </ButtonGradient>
            </RowCenter>
          </AutoColumn>
        )}
      </AutoColumn>
    </StyledPositionCard>
  )
}
