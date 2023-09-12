import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { StyledDropDown } from 'components/CurrencyInputPanel'
import { Box, Text } from 'rebass'
import styled from 'styled-components'
import CurrencyLogo from '../../components/CurrencyLogo'
import { RowEnd, RowFixed } from '../../components/Row'

interface Props {
  currency: Currency | null
  chooseToken: () => void
}

const Container = styled.div`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bg23};
  width: 100%;
  padding: 14px 2rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      boder-radius: 1rem;
  `};
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const CurrencyRow = ({ currency, chooseToken }: Props) => {
  return (
    <Container onClick={chooseToken}>
      {/* <Aligner> */}
      <RowEnd style={{ border: '1px solid #E6E6FF', padding: '5px 12px 5px 12px', background: '#FFFFFF' }}>
        {currency && <CurrencyLogo currency={currency} />}
        <Text color={'#292933'} fontWeight={600} fontSize={'18px'} lineHeight={'34px'} marginLeft={'12px'}>
          {currency ? currency.symbol : <Trans>Choose token</Trans>}
        </Text>
        <Box marginLeft={'6px'}>
          <StyledDropDown selected={!!currency} />
        </Box>
      </RowEnd>
      {/* </Aligner> */}
    </Container>
  )
}
