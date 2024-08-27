import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { ModalBlurWrapper, ModalContentWrapper, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { PinnedContentButton } from 'components/Button'
import { Line } from 'components/Line'
import { ReactComponent as AirdropIcon } from 'assets/images/airdrop.svg'
import { formatNumberWithDecimals } from 'state/lbp/hooks'
import { transformPayoutDraftDTO } from './utils'
import { useCreateDraftPayout, usePublishPayout } from 'state/payout/hooks'
import { ApprovalState, useAllowance } from 'hooks/useApproveCallback'
import { utils } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { PAYOUT_ADDRESS } from 'constants/addresses'
import { useWeb3React } from '@web3-react/core'
import { getContractInstance } from 'hooks/useContract'
import PAYOUT_ABI from 'abis/payout.json'
import { useGetPayoutAuthorization } from 'state/token-manager/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useAddPopup } from 'state/application/hooks'
import { routes } from 'utils/routes'
import { useHistory } from 'react-router-dom'
interface Props {
  close: () => void
  values: any
  totalAmount: any
  totalWallets: any
  onlyPay?: boolean
  availableForEditing: string[]
}

export const PublishAirdropModal: FC<Props> = ({ values, close, totalAmount, totalWallets, availableForEditing, onlyPay }) => {
  const [payNow, handlePayNow] = useState(onlyPay)
  const { token, secToken, tokenAmount, recordDate, startDate, endDate, id } = values
  const tokenCurrency = useCurrency(token.value)
  const [isLoading, handleIsLoading] = useState(false)
  const getAuthorization = useGetPayoutAuthorization()
  const addPopup = useAddPopup()
  const history = useHistory()
  const addTransaction = useTransactionAdder()
  const createDraft = useCreateDraftPayout()
  const { provider: library, account, chainId = 0 } = useWeb3React()

  console.log(values, 'valuesvaluesvaluesvalues')
  const [approvalState, approve, refreshAllowance] = useAllowance(
    token.value,
    utils.parseUnits(tokenAmount, tokenCurrency?.decimals),
    PAYOUT_ADDRESS[chainId]
  )
  const publishPayout = usePublishPayout()

  const publishAndPaid = async () => {
    try {
      handleIsLoading(true)

      const isValid = await validatePayoutEvent()
      if (!isValid) {
        handleIsLoading(false)
        return
      }

      /** The event was created, need to pay only */
      if (values.id) {
        await pay({
          id: values.id,
          payoutContractAddress: values.payoutContractAddress,
        })
        return
      }

      const body = setBody()
      const data = await createDraft({ ...body })
      if (!data?.id) return
      await pay({
        id: data.id,
        payoutContractAddress: data.payoutContractAddress,
      })
    } finally {
      handleIsLoading(false)
    }
  }

  const validatePayoutEvent = async () => {
    if (!id) {
      return true
    }
  }

  const onlyPublish = async () => {
    const body = setBody()
    console.log(body)
    const data = await publishPayout({ ...body })

    if (data?.id) {
      closeForm(data.id)
    }

    handleIsLoading(false)
  }

  const pay = async ({ id, payoutContractAddress }: { id: string; payoutContractAddress: string }) => {
    if (approvalState === ApprovalState.NOT_APPROVED) {
      await approve()
      await refreshAllowance()
      handleIsLoading(false)
    } else {
      const payoutContract = getContractInstance({
        addressOrAddressMap: payoutContractAddress,
        ABI: PAYOUT_ABI,
        withSignerIfPossible: true,
        library,
        account,
        chainId,
      })
      const payoutNonce = await payoutContract?.numberPayouts()

      const authorization = await getAuthorization({
        secTokenId: secToken.value,
        payoutEventId: id,
        tokenAddress: token.value,
        payoutNonce,
        fund: utils.parseUnits(tokenAmount, tokenCurrency?.decimals),
        startDate,
        ...(endDate && {
          endDate,
        }),
      })

      const gasLimit = await payoutContract?.estimateGas.initPayout(authorization)

      const res = await payoutContract?.initPayout(authorization, { gasLimit })
      addTransaction(res, {
        summary: `The transaction was successful. Waiting for system confirmation.`,
      })

      const data = await handleFormSubmit(id, res.hash, authorization.payoutId)
      if (data?.id) {
        closeForm(data.id, res.hash)
      }

    //   confirmPaidInfo(payoutId, )
    }
  }

  const handleFormSubmit = async (id: string, paidTxHash?: string, contractPayoutId?: string) => {
    const body = setBody()
    const data = await publishPayout({
      ...body,
      id,
      paidTxHash,
      contractPayoutId,
    })

    return data
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

  const closeForm = async (id: number, paidTxHash?: string) => {
    close()
    addPopup({
      info: {
        success: true,
        summary: `Payout was successfully ${!id ? 'created' : paidTxHash ? 'paid' : 'published'}`,
      },
    })

    history.push({ pathname: routes.payoutItemManager(id) })
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
              <ContentLabel>{formatNumberWithDecimals(totalAmount, 3)}</ContentLabel>
            </CardContentWrapper>
          </StyledCard>
          <ButtonContainer>
            <CancelButton onClick={close} type="button">
              <Trans>{`Cancel`}</Trans>
            </CancelButton>
            <ConfirmButton type="button" onClick={() => (onlyPay || payNow ? publishAndPaid() : onlyPublish())}>
              <Trans>{`Confirm`}</Trans>
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
