import React from 'react'
import styled from 'styled-components'

import { CopyAddress } from 'components/CopyAddress'
import { Box } from 'rebass'

interface Props {
  originalSymbol?: string | null
  fromAddress?: string | null
  toAddress?: string | null
  amount?: string | null
  network?: string | undefined
}

export const DepoistStatusInfo = ({ fromAddress, toAddress, amount, originalSymbol, network }: Props) => {
  return (
    <Container>
      <Box>
        <Title>
          Make Deposit {amount} {originalSymbol}:
        </Title>
        <CopyAddress
          address={fromAddress ?? ''}
          network={network}
          wrapperStyles={{ fontSize: '13px', fontWeight: 500 }}
          deposit={true}
        />
      </Box>
      <Box>
        <Title>To Custodian Wallet</Title>
        <CopyAddress
          address={toAddress ?? ''}
          network={network}
          wrapperStyles={{ fontSize: '13px', fontWeight: 500 }}
          deposit={true}
        />
      </Box>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`
const Info = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: ${({ theme }) => theme.text2};
  margin-bottom: 8px;
`

const Title = styled.div`
  color: #b8b8cc;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
  // > span {
  //   color: ${({ theme }) => theme.error};
  // }
`
