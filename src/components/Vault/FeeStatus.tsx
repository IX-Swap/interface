import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'

import { ReactComponent as SuccessIcon } from 'assets/images/check-success.svg'

interface Props {
  status: string
  feePrice: number | null
}

export const FeeStatus = ({ status, feePrice = 0 }: Props) => {
  return (
    <Container status={status}>
      {t`${status !== 'paidFee' ? `Withdrawal FEE ${feePrice} Matic` : 'You have already paid Withdraw FEE'}`}
      {status === 'paidFee' && <SuccessIcon />}
    </Container>
  )
}

const Container = styled.div<{ status: string }>`
  margin: 18px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  column-gap: 12px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme, status }) => (status !== 'paidFee' ? theme.bg14 : theme.green1)};
`
