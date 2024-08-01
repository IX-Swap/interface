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
import { TYPE } from 'theme'

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
  font-weight: 600;
`

const StyledRowFixed = styled(RowFixed)`
  border: 1px solid #e6e6ff;
  padding: 12px 12px 12px 18px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
`

const BalanceContainer = styled.div`
  text-align: end;
`

const BalanceRow = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  align-items: center;
`

const BalanceDescription = styled(TYPE.description3)`
  color: #b8b8cc;
`
const BalanceTitle = styled(TYPE.title10)``

export const CurrencyRow = ({ currency, chooseToken, pair }: Props) => {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const formattedBalance = selectedCurrencyBalance ? selectedCurrencyBalance.toFixed(2) : '0.00'

  return (
    <Container onClick={chooseToken}>
      <Aligner>
        <StyledRowFixed>
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
        </StyledRowFixed>
      </Aligner>
      <BalanceContainer>
        <BalanceRow>
          <BalanceDescription>
            <Trans>Balance: </Trans>
          </BalanceDescription>
          <BalanceTitle>
            {currency?.symbol} {formattedBalance}
          </BalanceTitle>
        </BalanceRow>
      </BalanceContainer>
    </Container>
  )
}
