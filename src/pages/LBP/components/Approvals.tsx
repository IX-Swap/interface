import styled from 'styled-components'
import { ReactComponent as SerenityIcon } from '../../../assets/images/serenity.svg'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyAmount } from '@ixswap1/sdk-core'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { getTokenOption } from './Tokenomics'
import { ReactComponent as Checked } from '../../../assets/images/check-2.svg'

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const Card = styled.div<{ approved: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ approved }) => (approved ? '#24E49F' : '#e6e6ff')};
  background: ${({ approved }) => (approved ? '#e9fcf6' : '#ffffff')};
  border-radius: 6px;
  width: calc(50% - 10px);
  height: 200px;
  margin: 5px;
  @media (max-width: 768px) {
    width: calc(100% - 20px);
    max-width: 350px;
  }
`

const Button = styled.button<{ approved: boolean }>`
  border: 1px solid ${({ approved }) => (approved ? '#24E49F' : '#e6e6ff')};
  background: ${({ approved }) => (approved ? '#e9fcf6' : '#ffffff')};
  color: ${({ approved }) => (approved ? '#292933E5' : '#6666ff')};
  width: 250px;
  height: 48px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
`

interface Props {
  addressA?: string
  addressB: string
  shareValue: number
  assetValue: number
  contractAddress: string
}

export default function Approvals({ addressA, addressB, assetValue, shareValue, contractAddress }: Props) {
  const tokenCurrencyA = useCurrency(addressA)
  const tokenCurrencyB = useCurrency(addressB)
  const tokenBOption = getTokenOption(addressB, tokenCurrencyB?.chainId || 1)

  const [approvalA, approveACallback] = useApproveCallback(
    tokenCurrencyA
      ? CurrencyAmount.fromRawAmount(tokenCurrencyA, ethers.utils.parseUnits(shareValue?.toString() || '0', 18) as any)
      : undefined,
    contractAddress || ''
  )

  const [approvalB, approveBCallback] = useApproveCallback(
    tokenCurrencyB
      ? CurrencyAmount.fromRawAmount(
          tokenCurrencyB,
          ethers.utils.parseUnits(assetValue?.toString() || '0', tokenBOption?.tokenDecimals) as any
        )
      : undefined,
    contractAddress || ''
  )

  const getApprovalButtonText = (approvalState: ApprovalState) => {
    switch (approvalState) {
      case ApprovalState.APPROVED:
        return 'Approved'
      case ApprovalState.PENDING:
        return 'Approving...'
      default:
        return 'Approve Asset'
    }
  }

  const buttonTextA = useMemo(() => getApprovalButtonText(approvalA), [approvalA])
  const buttonTextB = useMemo(() => getApprovalButtonText(approvalB), [approvalB])

  const handleButtonAssetClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      try {
        await approveACallback()
      } catch (error) {
        console.error('Approval failed', error)
      }
    },
    [approveACallback]
  )

  const handleButtonShareClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      try {
        await approveBCallback()
      } catch (error) {
        console.error('Approval failed', error)
      }
    },
    [approveBCallback]
  )

  return (
    <CardContainer>
      <Card approved={approvalA === 'APPROVED'}>
        <SerenityIcon />
        <p style={{ color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center' }}>Approve Serenity</p>

        <Button
          approved={approvalA === 'APPROVED'}
          disabled={approvalA === 'APPROVED'}
          onClick={handleButtonAssetClick}
        >
          {approvalA === 'APPROVED' && <Checked style={{ position: 'absolute', left: '24%' }} />}

          {buttonTextA}
        </Button>
      </Card>
      <Card approved={approvalB === 'APPROVED'}>
        <img src={tokenBOption?.logo} alt={`${tokenBOption?.tokenSymbol} logo`} />
        <p style={{ color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center' }}>
          Approve {tokenBOption?.tokenSymbol}
        </p>
        <Button
          approved={approvalB === 'APPROVED'}
          disabled={approvalB === 'APPROVED'}
          onClick={handleButtonShareClick}
        >
          {approvalB === 'APPROVED' && <Checked style={{ position: 'absolute', left: '24%' }} />}
          {buttonTextB}
        </Button>
      </Card>
    </CardContainer>
  )
}
