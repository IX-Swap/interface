import React from 'react'
import styled from 'styled-components'
import { ReactComponent as SerenityIcon } from '../../../assets/images/serenity.svg'
import { ApprovalState, useAllowance } from 'hooks/useApproveCallback'
import { ethers } from 'ethers'
import { useCallback, useMemo } from 'react'
import { getTokenOption } from './Tokenomics'
import { ReactComponent as Checked } from '../../../assets/images/check-2.svg'
import { LBP_FACTORY_ADDRESS } from 'constants/addresses'
import { useWeb3React } from 'hooks/useWeb3React'
import useDecimals from 'hooks/useDecimals'

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
const LogoIcon = styled.img`
  height: 25px;
  width: 25px;
  border-radius: 50%;
`

interface Props {
  addressA?: string
  addressB: string
  shareValue?: number
  assetValue?: number
  contractAddress?: string
  shareName?: string
  shareLogo?: any
  isEditable?: boolean
}

enum ApprovalType {
  ASSET = 'asset',
  SHARE = 'share',
}

export default function Approvals({
  addressA,
  addressB,
  assetValue,
  shareValue,
  shareName,
  shareLogo,
  isEditable,
}: Props) {
  const { chainId } = useWeb3React()
  const tokenBOption = getTokenOption(addressB, chainId)

  const tokenADecimals = useDecimals(addressA) ?? 18
  const tokenBDecimals = useDecimals(addressB) ?? tokenBOption?.tokenDecimals

  // share
  const [approvalA, approveACallback] = useAllowance(
    addressA,
    ethers.utils.parseUnits(shareValue?.toString() || '0', tokenADecimals),
    LBP_FACTORY_ADDRESS[chainId || 0] || ''
  )

  // asset
  const [approvalB, approveBCallback] = useAllowance(
    addressB,
    ethers.utils.parseUnits(assetValue?.toString() || '0', tokenBDecimals) as any,
    LBP_FACTORY_ADDRESS[chainId || 0] || ''
  )

  const getApprovalButtonText = (approvalState: ApprovalState, type: ApprovalType) => {
    switch (approvalState) {
      case ApprovalState.APPROVED:
        return 'Approved'
      case ApprovalState.PENDING:
        return `Approving ${type === ApprovalType.ASSET ? 'Base Token' : 'Project Token'}...`
      default:
        return `Approve ${type === ApprovalType.ASSET ? 'Base Token' : 'Project Token'}`
    }
  }

  const buttonTextA = useMemo(() => getApprovalButtonText(approvalA, ApprovalType.SHARE), [approvalA])
  const buttonTextB = useMemo(() => getApprovalButtonText(approvalB, ApprovalType.ASSET), [approvalB])

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

  const renderLogo = (shareLogo: any) => {
    return shareLogo && typeof shareLogo === 'object' && shareLogo.public ? (
      <LogoIcon as="img" src={shareLogo.public} alt="Serenity Logo" />
    ) : shareLogo && (typeof shareLogo === 'string' || shareLogo instanceof File) ? (
      <LogoIcon
        as="img"
        src={shareLogo instanceof File ? URL.createObjectURL(shareLogo) : shareLogo}
        alt="Serenity Logo"
      />
    ) : (
      <SerenityIcon />
    )
  }

  return (
    <CardContainer>
      <Card approved={approvalA === 'APPROVED'}>
        {renderLogo(shareLogo)}
        <p style={{ color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center' }}>
          Approve {shareName ? shareName : 'Project Token'}{' '}
        </p>

        <Button
          approved={approvalA === 'APPROVED'}
          disabled={approvalA === 'APPROVED' || !isEditable}
          onClick={handleButtonAssetClick}
        >
          {approvalA === 'APPROVED' && <Checked style={{ position: 'absolute', left: '24%' }} />}

          {buttonTextA}
        </Button>
      </Card>
      <Card approved={approvalB === 'APPROVED'}>
        {tokenBOption?.logo ? <img src={tokenBOption?.logo} /> : <SerenityIcon />}
        <p style={{ color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center' }}>
          Approve {tokenBOption?.tokenSymbol ? tokenBOption?.tokenSymbol : 'Base Token'}
        </p>
        <Button
          approved={approvalB === 'APPROVED'}
          disabled={approvalB === 'APPROVED' || !isEditable}
          onClick={handleButtonShareClick}
        >
          {approvalB === 'APPROVED' && <Checked style={{ position: 'absolute', left: '24%' }} />}
          {buttonTextB}
        </Button>
      </Card>
    </CardContainer>
  )
}
