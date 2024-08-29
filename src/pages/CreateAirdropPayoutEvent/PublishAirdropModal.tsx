import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { ModalBlurWrapper, ModalContentWrapper, TYPE } from 'theme'
import { useHistory } from 'react-router-dom'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { PinnedContentButton } from 'components/Button'
import { Line } from 'components/Line'
import { ReactComponent as AirdropIcon } from 'assets/images/airdrop.svg'
import { FormValues, transformPayoutDraftDTO } from './utils'
import { usePublishPayout } from 'state/payout/hooks'
import { ApprovalState, useAllowance } from 'hooks/useApproveCallback'
import { BigNumber, utils } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { PAYOUT_AIRDROP_PROXY_ADDRESS } from 'constants/addresses'
import { usePayoutAirdropContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useWeb3React } from '@web3-react/core'
import { floorToDecimals } from 'utils/formatCurrencyAmount'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { parseUnits } from 'ethers/lib/utils'
import { useAddPopup } from 'state/application/hooks'
import { routes } from 'utils/routes'

interface Props {
  resetForm: () => void
  close: () => void
  values: FormValues
  totalWallets: number
  availableForEditing: string[]
}

export const PublishAirdropModal: FC<Props> = ({ resetForm, values, close, totalWallets, availableForEditing }) => {
  const history = useHistory()
  const { token, csvRows, tokenAmount } = values
  const tokenCurrency = useCurrency(token?.value as string)
  const [isLoading, handleIsLoading] = useState(false)
  const addTransaction = useTransactionAdder()
  const publishPayout = usePublishPayout()
  const { chainId = 0 } = useWeb3React()
  const payoutContract = usePayoutAirdropContract()
  const addPopup = useAddPopup()

  const [approvalState, approve, refreshAllowance] = useAllowance(
    token?.value as string,
    utils.parseUnits(tokenAmount.toString(), tokenCurrency?.decimals),
    PAYOUT_AIRDROP_PROXY_ADDRESS[chainId]
  )
  const isApproved = approvalState === ApprovalState.APPROVED

  const paid = async () => {
    if (!payoutContract) return

    const maxTransfer = await payoutContract.maxTransfer()
    const batchData: [string[], BigNumber[]][] = []
    const recipientSet = new Set()

    for (let i = 0; i < csvRows.length; i += maxTransfer) {
      const batchedList = csvRows.slice(i, i + maxTransfer)
      const recipients: string[] = []
      const bnAmount: BigNumber[] = []
      batchedList.forEach(([recipient, amount]) => {
        recipientSet.add(recipient)
        recipients.push(recipient)
        bnAmount.push(parseUnits(amount.toString(), tokenCurrency?.decimals))
      })
      batchData.push([recipients, bnAmount])
    }

    if (recipientSet.size !== csvRows.length) {
      addPopup({
        info: {
          success: false,
          summary: 'There is duplicated recipient addresses',
        },
      })
      return
    }

    const body = setBody()
    const data = await publishPayout({ ...body })
    if (!data?.id) return

    for (let i = 0; i < batchData.length; i++) {
      const [recipients, bnAmounts] = batchData[i]
      const tx = await payoutContract.batchDistribute(data?.id, i, token?.value, recipients, bnAmounts)
      if (!tx.hash) return
      addTransaction(tx, {
        summary: `Distribute batch ${i + 1} of ${batchData.length} successfully.`,
      })
    }
    close()
    resetForm()
    history.push(routes.payoutItem(data.id))
  }

  const publishAndPaid = async () => {
    try {
      if (!payoutContract) return
      handleIsLoading(true)

      if (!isApproved) {
        await approve()
        await refreshAllowance()
        handleIsLoading(false)
        return
      }

      await paid()
    } finally {
      handleIsLoading(false)
    }
  }

  const setBody = () => {
    const formattedValues = Object.entries(values).reduce((acc: Record<string, any>, [key, next]) => {
      if (availableForEditing.includes(key)) {
        acc[key] = next
      }
      return acc
    }, {})

    return transformPayoutDraftDTO(formattedValues)
  }

  return (
    <RedesignedWideModal scrollable isOpen onDismiss={close}>
      <ModalBlurWrapper data-testid="areYouSureModal">
        <ModalHeader style={{ placeSelf: 'center' }}>
          <AirdropIcon />
          <Title>
            <Trans>Confirm Airdrop Distribution</Trans>
          </Title>
          <Subtitle>
            <Trans>{`Please ensure that the number of wallets and the total tokens for distribution are accurate. Once you click "Confirm," this action cannot be undone.`}</Trans>
          </Subtitle>
        </ModalHeader>

        <StyledModalBody>
          <StyledCard>
            <CardContentWrapper>
              <TYPE.main1 color="#B8B8CC">Total Wallets</TYPE.main1>
              <TYPE.main1 color="#B8B8CC">Total Amount</TYPE.main1>
            </CardContentWrapper>
            <StyledDivider />
            <CardContentWrapper>
              <ContentLabel>{totalWallets}</ContentLabel>
              <ContentLabel>{floorToDecimals(tokenAmount, 3)}</ContentLabel>
            </CardContentWrapper>
          </StyledCard>
          <ButtonContainer>
            <CancelButton onClick={close} type="button">
              <Trans>{`Cancel`}</Trans>
            </CancelButton>
            <ConfirmButton type="button" onClick={() => publishAndPaid()} disabled={isLoading}>
              {isLoading ? <LoaderThin size={20} /> : null}
              <Trans>{isApproved ? 'Confirm' : 'Approve'}</Trans>
            </ConfirmButton>
          </ButtonContainer>
        </StyledModalBody>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const ModalHeader = styled(ModalContentWrapper)`
  border-radius: 20px 20px 0px 0px;
  align-items: center;
  margin-top: 40px;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px 0px 32px;
`

const Subtitle = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #86869d;
  justify-content: space-between;
  padding: 12px;
  width: 290px;
`

const StyledModalBody = styled.div`
  padding: 24px;
  border-radius: 0px 0px 20px 20px;
  width: 500px;
  align-self: center;
`

const StyledCard = styled.div`
  background: ${({ theme }) => theme.bg23};
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e6e6ff;

  > span {
    display: block;
    padding-bottom: 4px;
    color: ${({ theme }) => theme.text2};
    border-bottom: ${({ theme }) => `1px solid ${theme.text9}`};
    margin-bottom: 12px;
  }

  > :last-child {
    margin-bottom: 0px;
  }
`

const CardContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledDivider = styled(Line)`
  margin: 10px 0;
`

const ContentLabel = styled(TYPE.label)`
  font-size: 16px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin-top: 24px;
`

const CancelButton = styled(PinnedContentButton)`
  background: none;
  color: #6666ff;
  border: 1px solid #6666ff33;
`

const ConfirmButton = styled(PinnedContentButton)``
