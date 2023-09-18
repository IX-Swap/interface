import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { t } from '@lingui/macro'

import { ReactComponent as SuccessIcon } from 'assets/images/check-2.svg'

import { WithdrawStatus } from './enum'

interface Props {
  status: string
  feePrice: string
  estimatedPrice: number | null
}

export const FeeStatus = ({ status, feePrice, estimatedPrice }: Props) => {
  const paid = [WithdrawStatus.FEE_ACCEPTED, WithdrawStatus.PENDING].includes(status as WithdrawStatus)

  const feeText = useMemo(() => {
    if (paid || feePrice) {
      return `${(+feePrice).toFixed(4)} Matic`
    }
    return `~${estimatedPrice ? `${estimatedPrice.toFixed(4)} Matic` : ' - '}`
  }, [estimatedPrice, feePrice, paid])

  return (
    <Container paid={paid}>
      <li>
        <span style={{ color: '#666680', marginRight: '4px' }}>{t`Withdrawal fee: `}</span>
        <FeeAmount paid={paid}>{feeText}</FeeAmount>
        {paid && <SuccessIcon />}
      </li>
      <li>Burning fee: will be calculated on Txn Confirmation</li>
    </Container>
  )
}

const Container = styled.div<{ paid: boolean }>`
  margin: 18px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 14px;
  row-gap: 4px;
  color: ${({ theme }) => theme.text2};
  svg {
    margin-left: 12px;
    path {
      fill: ${({ theme }) => theme.green1};
    }
  }
  > :first-child {
    ${({ paid }) =>
      paid &&
      css`
        color: ${({ theme }) => theme.green1};
      `}
  }
`

const FeeAmount = styled.span<{ paid: boolean }>`
  color: ${({ theme, paid }) => (paid ? theme.green1 : 'black')};
`
