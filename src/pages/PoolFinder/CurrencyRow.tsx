import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'

import { Box, Text } from 'rebass'
import styled from 'styled-components'

import { RowEnd, RowFixed } from '../../components/Row'
import { AssetLogo } from 'components/CurrencyInputPanel/AssetLogo'
import { formatCurrencySymbol } from 'utils/formatCurrencySymbol'
import { ReactComponent as NewDropDown } from '../../assets/images/dropdownIcon.svg'
import { Pair } from '@ixswap1/v2-sdk'

import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks/web3'

interface Props {
  currency: Currency | null
  chooseToken: () => void
  pair?: Pair | null
}

const Container = styled.div`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bg23};
  width: 100%;
  padding: 26px 2rem;
  border: 1px solid #e6e6ff;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      border-radius: 1rem;
  `};
`

const Aligner = styled.span`
  display: flex;
  align-items: right;
  justify-content: right;
  width: 100%;
`

const StyledTokenName: any = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? 'margin: 0 0.25rem 0 0.25rem;' : 'margin: 0 0.25rem 0 0.25rem;')}
  font-size: ${({ active }) => (active ? '14px' : '14px')};
  color: ${({ theme }) => theme.text1};
`

export const CurrencyRow = ({ currency, chooseToken, pair }: Props) => {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const formattedBalance = selectedCurrencyBalance ? selectedCurrencyBalance.toFixed(2) : '0.00'

  return (
    <Container onClick={chooseToken}>
      <Aligner>
        <RowFixed
          style={{
            border: '1px solid #E6E6FF',
            padding: '8px 12px 8px 18px',
            background: '#FFFFFF',
            cursor: 'pointer',
          }}
        >
          <AssetLogo pair={pair} currency={currency} />
          <StyledTokenName className="pair-name-container">
            {pair ? (
              `${pair?.token0.symbol}:${pair?.token1.symbol}`
            ) : (
              <>
                {formatCurrencySymbol({ currency }) || (
                  <Box>
                    <Trans>Choose token</Trans>
                  </Box>
                )}
              </>
            )}
          </StyledTokenName>
          <NewDropDown />
        </RowFixed>
      </Aligner>
      <div style={{ textAlign: 'end' }}>
        <Trans>
          <span style={{ color: '#B8B8CC' }}>Balance: </span>
          {currency?.symbol} {formattedBalance}
        </Trans>
      </div>
    </Container>
  )
}
