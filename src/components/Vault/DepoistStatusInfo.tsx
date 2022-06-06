import React from 'react'
import styled from 'styled-components'

import { CopyAddress } from 'components/CopyAddress'

interface Props {
  originalSymbol?: string | null
  fromAddress?: string | null
  toAddress?: string | null
  amount?: string | null
}

export const DepoistStatusInfo = ({ fromAddress, toAddress, amount, originalSymbol }: Props) => {
  return (
    <Container>
      <Info>
        Make Deposit by sending {amount} {originalSymbol}:
      </Info>
      <Title>
        Send from your <span>Ethereum Wallet</span>
      </Title>
      <CopyAddress address={fromAddress ?? ''} wrapperStyles={{ fontSize: '13px', fontWeight: 500 }} />
      <Title style={{ marginTop: 25 }}>To Custodian Wallet</Title>
      <CopyAddress address={toAddress ?? ''} wrapperStyles={{ fontSize: '13px', fontWeight: 500 }} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Info = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.text2};
  margin-bottom: 8px;
`

const Title = styled.div`
  color: ${({ theme }) => theme.text9};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
  > span {
    color: ${({ theme }) => theme.error};
  }
`
