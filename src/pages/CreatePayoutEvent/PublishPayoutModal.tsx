import React, { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import { utils } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import PAYOUT_ABI from 'abis/payout.json'
import { ModalBlurWrapper, ModalContentWrapper, CloseIcon, TYPE } from 'theme'
import RedesignedWideModal from 'components/Modal/RedesignedWideModal'
import { PinnedContentButton } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/Column'
import { formatDate } from 'pages/PayoutItem/utils'
import { useAddPopup } from 'state/application/hooks'
import {
  usePublishPayout,
  usePayoutValidation,
} from 'state/payout/hooks'
import { getContractInstance } from 'hooks/useContract'
import { routes } from 'utils/routes'

import { useCurrency } from 'hooks/Tokens'
import { PAYOUT_ADDRESS } from 'constants/addresses'
import { ApprovalState, useAllowance } from 'hooks/useApproveCallback'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { useGetPayoutAuthorization } from 'state/token-manager/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalance, useETHBalances } from 'state/wallet/hooks'

import { transformPayoutDraftDTO } from './utils'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { Line } from 'components/Line'

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
  const history = useHistory()
  const getAuthorization = useGetPayoutAuthorization()
  const addTransaction = useTransactionAdder()
  const { provider: library, account, chainId = 0 } = useWeb3React()

  const tokenCurrency = useCurrency(token.value)

  const nativeBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const currencyBalance = useCurrencyBalance(account ?? undefined, tokenCurrency ?? undefined)

  const tokenBalance = tokenCurrency?.isNative ? nativeBalance?.toFixed(4) : currencyBalance?.toFixed(4)

  const [approvalState, approve, refreshAllowance] = useAllowance(
    token.value,
    utils.parseUnits(tokenAmount, tokenCurrency?.decimals),
    PAYOUT_ADDRESS[chainId],
  )

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
      const data = await publishPayout({ ...body })
      if (!data?.id) return
      await pay({
        id: data.id,
        payoutContractAddress: data.payoutContractAddress,
      })
    } finally {
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

  const validatePayoutEvent = async () => {
    if (!id) {
      return true
    }

    const body = setBody()
    const data = await validatePayout(id, { ...body })

    return data
  }

  const pay = async ({
    id,
    payoutContractAddress,
  }: {
    id: string
    payoutContractAddress: string
  }) => {
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

      //confirmPaidInfo(payoutId, )
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
    if (payNow && approvalState === ApprovalState.NOT_APPROVED) {
      return `Approve ${token.label}`
    }

    if (approvalState === ApprovalState.PENDING) {
      return `Approving ${token.label} ...`
    }

    if (onlyPay) {
      return 'Confirm Payment'
    }

    return 'Publish Payout Event'
  }, [onlyPay, payNow, approvalState])

  const isInsufficientBalance = payNow && tokenBalance && +tokenBalance < +tokenAmount

  return (
    <RedesignedWideModal scrollable isOpen onDismiss={close}>
      <ModalBlurWrapper
        data-testid="user-modal"
        style={{ maxWidth: '569px', width: '100%', position: 'relative', padding: '10px' }}
      >
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
            <TYPE.main1>Payout Information</TYPE.main1>
            <Divider />

            <Data
              label={`Security Token:`}
              value={
                <Flex alignItems="center">
                  {secToken.icon}
                  <Box marginLeft="4px"> {secToken.label}</Box>
                </Flex>
              }
            />
            <Divider />
            <Data label={`Payout Type:`} value={type} />
            <Divider />
            <Data label={`Record Date:`} value={formatDate(recordDate)} />
            <Divider />
            <Data label={`Payment Start Date:`} value={formatDate(startDate)} />
            <Divider />
            {endDate && <Data label={`Payment Deadline:`} value={formatDate(endDate)} />}
          </Card>
          <Card marginBottom="24px">
            <TYPE.main1>{`Payment Details:`}</TYPE.main1>
            <Divider />
            {isRecordFuture ? (
              <ErrorCard>
                <TYPE.title10 width={'350px'} color={'#FF6161'} textAlign="left">
                  <Trans>{`Wrapped token amounts to be computed and will become available on the Record Date you selected`}</Trans>
                </TYPE.title10>
              </ErrorCard>
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
                  <TYPE.main1 color={'#292933'}>
                    <Trans>{`Pay Now for This Event`}</Trans>
                  </TYPE.main1>
                  <TYPE.description2>
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
                  <TYPE.main1 color={'#292933'}>
                    <Trans>{`Pay Later for This Event`}</Trans>
                  </TYPE.main1>
                  <TYPE.description2>
                    <Trans>{`Payment for this event should be received and confirmed prior to the start date of payout distribution.`}</Trans>
                  </TYPE.description2>
                </Box>
              }
            />
          </Column>
          {!tokenAmount && (
            <ErrorCard marginBottom="32px">
              <TYPE.title10 width={'350px'} color={'#FF6161'} textAlign="left">
                <Trans>{`Please indicate the Payout Amount.`}</Trans>
              </TYPE.title10>
            </ErrorCard>
          )}
          {(isInsufficientBalance) ? (
            <ErrorCard marginBottom="32px">
              <TYPE.title10 width={'350px'} color={'#FF6161'} textAlign="left">
                <Trans>{`Insufficient token amount.`}</Trans>
              </TYPE.title10>
            </ErrorCard>
          ) : null}
          <PinnedContentButton
            type="button"
            onClick={() => (onlyPay || payNow ? publishAndPaid() : onlyPublish())}
            disabled={!tokenAmount || !tokenBalance || !!isInsufficientBalance}
          >
            {!tokenBalance ? <LoaderThin size={20} /> : null}
            <Trans>{`${buttonText}`}</Trans>
          </PinnedContentButton>
        </ModalBody>
      </ModalBlurWrapper>
    </RedesignedWideModal>
  )
}

const Data: FC<DataProps> = ({ label, value }) => {
  return (
    <Wrapper>
      <div>
        <TYPE.description2> {label}</TYPE.description2>
      </div>
      <TYPE.main1>{value}</TYPE.main1>
    </Wrapper>
  )
}

const ModalHeader = styled(ModalContentWrapper)`
  border-radius: 20px 20px 0px 0px;
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
  text-align: left;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #86869d;
  justify-content: space-between;
  padding: 12px 32px;
  width: 350px;
`

const ModalBody = styled.div`
  padding: 24px;
  border-radius: 0px 0px 20px 20px;
`

const ErrorCard = styled(Box)`
  border: 1px solid #ff616180;
  padding: 16px 24px;
  background: #f9e8eb;
  border-radius: 8px;
  margintop: 20px;
`

const Card = styled(Box)`
  background: ${({ theme }) => theme.bg23};
  border-radius: 8px;
  padding: 16px;
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

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  font-weight: 400;
  align-items: center;

  > :first-child {
    color: ${({ theme }) => theme.text9};
  }

  > :last-child {
    font-weight: 500;
  }
`

const Divider = styled(Line)`
  margin: 10px 0;
`
