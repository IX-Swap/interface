import React from 'react'
import styled from 'styled-components'

interface Props {
  networkName: string
  originalNetworkName: string
  symbol?: string | null
}

export const WithdrawalWarning = ({ networkName, originalNetworkName, symbol }: Props) => {
  return (
    <Container>
      Your wrapped {symbol} will be extracted from your {networkName} wallet and burnt automatically.
      <br /> You will receive {symbol} on your <span>{originalNetworkName}</span> wallet.
    </Container>
  )
}

const Container = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.error};
  font-weight: 400;
  font-size: 12px;
  > span {
    font-weight: 600;
  }
`
