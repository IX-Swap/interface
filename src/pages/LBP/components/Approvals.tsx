import styled from 'styled-components'
import { ReactComponent as SerenityIcon } from '../../../assets/images/serenity.svg'
import { ApprovalState, useOptimizedApproveCallback } from 'hooks/useApproveCallback'
import { useCurrency } from 'hooks/Tokens'
import { CurrencyAmount } from '@ixswap1/sdk-core'
import { ethers } from 'ethers'
import { useCallback, useMemo } from 'react'
import { getTokenOption } from './Tokenomics'
import { ReactComponent as Checked } from '../../../assets/images/check-2.svg'
import { LBP_FACTORY_ADDRESS } from 'constants/addresses'
import { useWeb3React } from '@web3-react/core'

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
}

enum ApprovalType {
  ASSET = 'asset',
  SHARE = 'share',
}

export default function Approvals({ addressA, addressB, assetValue, shareValue, shareName, shareLogo }: Props) {
  const { chainId } = useWeb3React()
  const tokenBOption = getTokenOption(addressB, chainId)

  // share
  const [approvalA, approveACallback] = useOptimizedApproveCallback(
    addressA,
    ethers.utils.parseUnits(shareValue?.toString() || '0', 18),
    LBP_FACTORY_ADDRESS[chainId || 0] || ''
  )

  // asset
  const [approvalB, approveBCallback] = useOptimizedApproveCallback(
    addressB,
    ethers.utils.parseUnits(assetValue?.toString() || '0', tokenBOption?.tokenDecimals) as any,
    LBP_FACTORY_ADDRESS[chainId || 0] || ''
  )

  const getApprovalButtonText = (approvalState: ApprovalState, type: ApprovalType) => {
    switch (approvalState) {
      case ApprovalState.APPROVED:
        return 'Approved'
      case ApprovalState.PENDING:
        return `Approving ${type === ApprovalType.ASSET ? 'Asset' : 'Share'}...`
      default:
        return `Approve ${type === ApprovalType.ASSET ? 'Asset' : 'Share'}`
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
          Approve {shareName ? shareName : 'Share'}{' '}
        </p>

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
        {tokenBOption?.logo ? <img src={tokenBOption?.logo} /> : <SerenityIcon />}
        <p style={{ color: '#292933', fontWeight: '600', fontSize: '16px', textAlign: 'center' }}>
          Approve {tokenBOption?.tokenSymbol ? tokenBOption?.tokenSymbol : 'Asset'}
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
