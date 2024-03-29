import React, { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import { CurrencyAmount } from '@ixswap1/sdk-core'
import { utils } from 'ethers'

import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { ButtonIXSGradient } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'
import { formatDate } from 'pages/PayoutItem/utils'
import { useAddPopup } from 'state/application/hooks'
import { usePublishPayout, usePayoutValidation } from 'state/payout/hooks'
import { usePayoutContract } from 'hooks/useContract'
import { routes } from 'utils/routes'

import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import { PAYOUT_ADDRESS } from 'constants/addresses'
import { useApproveCallback, ApprovalState } from 'hooks/useApproveCallback'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useGetPayoutAuthorization } from 'state/token-manager/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalance, useETHBalances } from 'state/wallet/hooks'

import { transformPayoutDraftDTO } from './utils'

interface Props {
  close: () => void
  values: any
  isRecordFuture: boolean
  onlyPay: boolean
  availableForEditing: string[]
}

interface DataProps {
  label: string
  value: any
}

export const PublishPayoutModal: FC<Props> = ({ values, isRecordFuture, close, onlyPay, availableForEditing }) => {
  const [payNow, handlePayNow] = useState(onlyPay)
  const [isLoading, handleIsLoading] = useState(false)

  const { token, secToken, tokenAmount, recordDate, startDate, endDate, type, id } = values
  const validatePayout = usePayoutValidation()
  const publishPayout = usePublishPayout()
  const addPopup = useAddPopup()
  const { chainId = 0, account } = useActiveWeb3React()
  const history = useHistory()
  const getAuthorization = useGetPayoutAuthorization()
  const addTransaction = useTransactionAdder()

  const tokenCurrency = useCurrency(token.value)

  const nativeBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const currencyBalance = useCurrencyBalance(account ?? undefined, tokenCurrency ?? undefined)

  const tokenBalance = (tokenCurrency?.isNative ? nativeBalance?.toFixed(4) : currencyBalance?.toFixed(4)) || 0

  const [approvalState, approve] = useApproveCallback(
    tokenCurrency ? CurrencyAmount.fromRawAmount(tokenCurrency, utils.parseUnits(tokenAmount, '18') as any) : undefined,
    PAYOUT_ADDRESS[chainId]
  )

  const payoutContract = usePayoutContract()

  const publishAndPaid = async () => {
    try {
      handleIsLoading(true)

      const isValid = await validatePayoutEvent()
      if (!isValid) {
        handleIsLoading(false)
        return
      }

      await pay()
    } catch (e: any) {
      handleIsLoading(false)
    }
  }

  const onlyPublish = async () => {
    const body = setBody()
    const data = await publishPayout({ ...body })

    if (data?.id) {
      closeForm(data.id)
    }

    handleIsLoading(false)
  }

  const handleFormSubmit = async (paidTxHash?: string, contractPayoutId?: string) => {
    const body = setBody()
    const data = await publishPayout({
      ...body,
      ...(paidTxHash && { paidTxHash }),
      ...(contractPayoutId && { contractPayoutId }),
    })

    return data
  }

  const validatePayoutEvent = async () => {
    if (!id) {
      return true
    }

    const body = setBody()
    const data = await validatePayout(id, { ...body })

    return data
  }

  const pay = async () => {
    try {
      if (approvalState === 'NOT_APPROVED') {
        await approve()
        handleIsLoading(false)
      } else {
        const payoutNonce = await payoutContract?.numberPayouts()

        const authorization = await getAuthorization({
          secTokenId: secToken.value,
          tokenAddress: token.value,
          payoutNonce,
          fund: utils.parseUnits(tokenAmount, '18'),
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

        const data = await handleFormSubmit(res.hash, authorization.payoutId)
        if (data?.id) {
          closeForm(data.id, res.hash)
        }

        handleIsLoading(false)

        //confirmPaidInfo(payoutId, )
      }
    } catch (e: any) {
      handleIsLoading(false)
    }
  }

  /*const confirmPaidInfo = async (id: number, paidTxHash?: string, contractPayoutId?: string) => {
    try {
      const data = await paidPayout(id, {
        ...(paidTxHash && { paidTxHash }),
        ...(contractPayoutId && { contractPayoutId }),
      })

      if (data?.id) {
        closeForm(data.id, paidTxHash)
      }

      handleIsLoading(false)
    } catch (e: any) {
      handleIsLoading(false)
    }
  }*/

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

  const setBody = () => {
    const formattedValues = Object.entries(values).reduce((acc: Record<string, any>, [key, next]) => {
      if (availableForEditing.includes(key)) {
        acc[key] = next
      }
      return acc
    }, {})

    return transformPayoutDraftDTO(formattedValues)
  }

  const buttonText = useMemo(() => {
    if (approvalState === ApprovalState.NOT_APPROVED) {
      return `Approve ${token.label}`
    }

    if (approvalState === ApprovalState.PENDING) {
      return `Approving ${token.label} ...`
    }

    if (onlyPay) {
      return 'Confirm Payment'
    }

    return 'Publish Payout Event'
  }, [onlyPay, approvalState])

  return (
    <RedesignedWideModal scrollable isOpen onDismiss={close}>
      <ModalBlurWrapper data-testid="user-modal" style={{ maxWidth: '569px', width: '100%', position: 'relative' }}>
        <LoadingIndicator isRelative isLoading={isLoading || approvalState === ApprovalState.PENDING} />
        <ModalHeader>
          <Title>
            <Trans>Payout Event Summary</Trans>
            <CloseIcon data-testid="cross" onClick={close} />
          </Title>
          <Subtitle>
            <Trans>{`Please review all the information and ensure they are correct before publishing the event.`}</Trans>
          </Subtitle>
        </ModalHeader>

        <ModalBody>
          <Card marginBottom="18px">
            <span>
              <Trans>{`Payout Information:`}</Trans>
            </span>
            <Data
              label={`Security Token:`}
              value={
                <Flex alignItems="center">
                  {secToken.icon}
                  <Box marginLeft="4px"> {secToken.label}</Box>
                </Flex>
              }
            />
            <Data label={`Payout Type:`} value={type} />
            <Data label={`Record Date:`} value={formatDate(recordDate)} />
            <Data label={`Payment Start Date:`} value={formatDate(startDate)} />
            {endDate && <Data label={`Payment Deadline:`} value={formatDate(endDate)} />}
          </Card>
          <Card marginBottom="24px">
            <span>
              <Trans>{`Payment Details:`}</Trans>
            </span>
            {isRecordFuture ? (
              <TYPE.title10 padding="0px 32px" color={'error'} textAlign="center">
                <Trans>{`Wrapped token amounts to be computed and will become available on the Record Date you selected`}</Trans>
              </TYPE.title10>
            ) : (
              <Data
                label={`Payout Tokens:`}
                value={
                  <Flex alignItems="center">
                    {token.icon}
                    <Box marginX="4px"> {token.label}</Box>
                    <Box>{tokenAmount}</Box>
                  </Flex>
                }
              />
            )}
          </Card>

          <Column style={{ gap: '16px', marginBottom: tokenAmount ? 32 : 24 }}>
            <Checkbox
              name="payNow"
              isRadio
              checked={payNow}
              disabled={isRecordFuture}
              onClick={() => handlePayNow(true)}
              label={
                <Box>
                  <TYPE.body3 fontWeight={700}>
                    <Trans>{`Pay Now for This Event`}</Trans>
                  </TYPE.body3>
                  <TYPE.description2 fontStyle={'italic'}>
                    <Trans>{`Indicated token amount will be allocated for distribution once payment for this event is confirmed.`}</Trans>
                  </TYPE.description2>
                </Box>
              }
            />
            <Checkbox
              name="payLater"
              isRadio
              disabled={onlyPay}
              checked={!payNow}
              onClick={() => handlePayNow(false)}
              label={
                <Box>
                  <TYPE.body3 fontWeight={700}>
                    <Trans>{`Pay Later for This Event`}</Trans>
                  </TYPE.body3>
                  <TYPE.description2 fontStyle={'italic'}>
                    <Trans>{`Payment for this event should be received and confirmed prior to the start date of payout distribution.`}</Trans>
                  </TYPE.description2>
                </Box>
              }
            />
          </Column>
          {!tokenAmount && (
            <Card marginBottom="32px">
              <TYPE.title10 padding="0px 32px" color={'error'} textAlign="center">
                <Trans>{`Please indicate the Payout Amount.`}</Trans>
              </TYPE.title10>
            </Card>
          )}
          {+tokenBalance < +tokenAmount && (
            <Card marginBottom="32px">
              <TYPE.title10 padding="0px 32px" color={'error'} textAlign="center">
                <Trans>{`Insufficient token amount.`}</Trans>
              </TYPE.title10>
            </Card>
          )}
          <StyledButtonIXSGradient
            type="button"
            onClick={() => (onlyPay || payNow ? publishAndPaid() : onlyPublish())}
            disabled={!tokenAmount || (payNow && +tokenBalance < +tokenAmount)}
          >
            <Trans>{`${buttonText}`}</Trans>
          </StyledButtonIXSGradient>
        </ModalBody>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Data: FC<DataProps> = ({ label, value }) => {
  return (
    <Wrapper>
      <div>
        <Trans>{label}</Trans>
      </div>
      <div>{value}</div>
    </Wrapper>
  )
}

const ModalHeader = styled(ModalContentWrapper)`
  border-radius: 20px 20px 0px 0px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-bottom: 1px solid rgba(39, 32, 70, 0.72);
`

const Subtitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.text9};
  justify-content: space-between;
  padding: 12px 64px;
`

const ModalBody = styled.div`
  background: ${({ theme }) => theme.bg1};
  padding: 24px;
  border-radius: 0px 0px 20px 20px;
`

const Card = styled(Box)`
  background: ${({ theme }) => theme.bg1};
  border-radius: 20px;
  padding: 16px;

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

const StyledButtonIXSGradient = styled(ButtonIXSGradient)`
  min-height: 40px;
  max-height: 40px;
  font-size: 16px;
  width: 100%;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  font-weight: 400;

  > :first-child {
    color: ${({ theme }) => theme.text9};
  }

  > :last-child {
    font-weight: 500;
  }
`
