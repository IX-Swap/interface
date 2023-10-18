import React from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'

interface Props {
  networkName: string
  originalNetworkName: string
  symbol?: string | null
}

export const WithdrawalWarning = ({ networkName, originalNetworkName, symbol }: Props) => {
  return (
    <>
      {isMobile ? (
        <Container style={{ padding: '20px', backgroundColor: '#fff0f1', textAlign: 'center' }}>
          Your wrapped {symbol} will be extracted from your {networkName} wallet and burnt automatically. You will
          receive {symbol} on your <span>{originalNetworkName}</span> wallet.
        </Container>
      ) : (
        <Container style={{ padding: '50px', backgroundColor: '#fff0f1', textAlign: 'center' }}>
          Your wrapped {symbol} will be extracted from your {networkName} <br /> wallet and burnt automatically.
          <br /> You will receive {symbol} on your <span>{originalNetworkName}</span> wallet.
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  font-weight: 400;
  font-size: 13px;
  background-color: #fff0f1;
  color: #666680;
  font-weight: 400;
  font-size: 12px;
  padding: 40px;
  > span {
    font-weight: 600;
  }
`
