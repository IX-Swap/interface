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
      return `Withdrawal fee: ${(+feePrice).toFixed(4)} Matic`
    }
    return `Expected withdrawal fees: ${estimatedPrice ? `~${estimatedPrice.toFixed(4)} Matic` : ' - '}`
  }, [estimatedPrice, feePrice, paid])

  return (
    <Container paid={paid}>
      <li>
        {t`${feeText}`}
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
  color: rgba(237, 206, 255, 0.5);
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
