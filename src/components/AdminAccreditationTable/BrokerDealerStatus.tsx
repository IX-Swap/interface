import React from 'react'
import styled from 'styled-components'

import { EllipsisText } from 'theme'

import { getStatusIcon } from './utils'

interface Props {
  status: string
  kyc?: any
  broker?: string
}

export const BrokerDealerStatus = ({ status, broker = '' }: Props) => {
  return (
    <Container>
      <img src={getStatusIcon(status)} alt="icon" width="20px" height="20px" />
      <EllipsisText>{broker}</EllipsisText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  width: 100%;
`
