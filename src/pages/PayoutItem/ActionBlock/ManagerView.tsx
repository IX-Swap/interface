import React, { FC, useCallback, useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'

import CurrencyLogo from 'components/CurrencyLogo'
import Column from 'components/Column'
import { PAYOUT_STATUS } from 'constants/enums'
import { PayoutEvent } from 'state/token-manager/types'
import { routes } from 'utils/routes'
import { getClaimBackAuthorization, useGetRemainingTokens, useGetTotalClaims, useGetUserClaim, useSaveManagerClaimBack, useSaveUserClaim } from 'state/payout/hooks'

import { Container, StyledButtonIXSGradient } from './styleds'
import { formatDate } from '../utils'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { usePayoutContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { UserClaim } from './dto'
import { useActiveWeb3React } from 'hooks/web3'
import { useAccreditationStatus } from 'state/secTokens/hooks'
import { FetchingBalance } from './FetchingBalance'
import { utils } from 'ethers'
import { LoadingIndicator } from 'components/LoadingIndicator'

interface Props {
  payout: PayoutEvent
  payoutToken: any,
  onUpdate?: () => void
}

export const ManagerView: FC<Props> = ({ payout, payoutToken, onUpdate }) => {
  const history = useHistory()
  const getTotalClaims = useGetTotalClaims()
  const getRemainingTokens = useGetRemainingTokens()

  const { account } = useActiveWeb3React()
  const { status, isPaid, secToken, tokenAmount, recordDate, id, startDate, contractPayoutId } = payout
  const { custodianStatus, brokerDealerStatus } = useAccreditationStatus((secToken as any)?.address || 0)

  const [totalClaims, handleTotalClaims] = useState(0)
  const [remaining, setRemaining] = useState<string | undefined>(undefined)
  const [claimStatus, handleClaimStatus] = useState<UserClaim>({} as UserClaim)
  const [isLoading, handleIsLoading] = useState(false)
  
  const getUserClaim = useGetUserClaim()
  const saveManagerClaimBack = useSaveManagerClaimBack()


  useEffect(() => {
    const fetch = async () => {
      const [res, remainingTokens] = await Promise.all([
        getTotalClaims(id),
        getRemainingTokens(id)
      ])

      setRemaining(remainingTokens)
      handleTotalClaims(res)
    }

    if (id) {
      fetch()
    }
  }, [id])

  const goToEdit = () => {
    history.push(routes.editPayoutEvent(id))
  }
  
  
  const statuses = [custodianStatus, brokerDealerStatus]
  
  
  const balance = useCurrencyBalance(account ?? undefined, ({ ...secToken, isToken: true } as any) ?? undefined)
  const secTokenBalance = formatCurrencyAmount(balance, secToken?.decimals ?? 18)
  const payoutContract = usePayoutContract()

  const addTransaction = useTransactionAdder()
  
  const claimBack = useCallback(
    async () => {
      try {
        handleIsLoading(true)
        const nonce = await payoutContract?.nonce(contractPayoutId, account)

        const authorization = await getClaimBackAuthorization({
          id,
          token: payoutToken.address,
          deadline: dayjs().add(1, 'hour').toISOString(),
          nonce,
        })

        const amount = utils.formatEther(authorization.amount)
        const tx = await payoutContract?.claim(authorization)

        handleIsLoading(false)

        await saveManagerClaimBack({ payoutEventId: id, secToken: secToken.id, sum: `${amount}`, txHash: tx.hash })
        const res = await getUserClaim(id)
        handleClaimStatus(res)

        if (tx.hash) {
          addTransaction(tx, {
            summary: `Claim Back was successful. Waiting for system confirmation.`,
          })

          if (onUpdate) {
            onUpdate()
          }
        }
      } catch (e: any) {
        handleIsLoading(false)
      }
    },
    []
  )
  
  if (secTokenBalance === '-') return <FetchingBalance />

  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.STARTED:
        return (
          <>
            {t`Already claimed:`}
            <Flex alignItems="center" fontWeight={600}>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Flex marginLeft="4px" fontSize="24px" lineHeight="36px">{`${
                payoutToken?.symbol ?? 'Payout Token'
              } ${totalClaims}/${tokenAmount}`}</Flex>
            </Flex>
          </>
        )
      case PAYOUT_STATUS.SCHEDULED:
        return !isPaid ? (
          <>
            <Box marginBottom="4px">{t`The event is not paid yet.`}</Box>
            <Box marginBottom="24px">{t`Please proceed with the payment before the payment start date.`}</Box>
            <StyledButtonIXSGradient onClick={goToEdit}>{t`Pay for this event`}</StyledButtonIXSGradient>
          </>
        ) : (
          <>
            <Flex marginBottom="4px" alignItems="center" fontWeight={600}>
              <Box marginRight="4px" fontSize="20px" lineHeight="30px">{t`You have allocated for this event`}</Box>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${
                payoutToken?.symbol ?? 'Payout Token'
              } ${tokenAmount}`}</Box>
            </Flex>
            <Flex>
              <Box marginRight="4px">{t`Users will be able to start claiming on`}</Box>
              <Box fontWeight={600}>{formatDate(dayjs(startDate))}</Box>
            </Flex>
          </>
        )
      case PAYOUT_STATUS.ENDED:
        if (payout?.isReturned) {
          return (
            <Column style={{ gap: '4px', alignItems: 'center' }}>
              <Box>{t`The event has been ended.`}</Box>
              <Box>{t`All tokens have been claimed back`}</Box>
            </Column>
          )
        }

        return (
          <>
            <Column style={{ gap: '4px', alignItems: 'center', marginBottom: 24 }}>
              <Box>{t`The event has been ended.`}</Box>
              <Flex alignItems="center">
                <Box marginRight="4px">{t`You can Claim Back`}</Box>
                <CurrencyLogo currency={payoutToken} size="20px" />
                <Box marginX="4px" fontWeight={600}>
                  {payoutToken?.symbol ?? 'Payout Token'}
                </Box>
                {t`tokens.`}
              </Flex>
              <Flex alignItems="center">
                <CurrencyLogo currency={payoutToken} size="24px" />
                <Box marginLeft="4px" fontSize="24px" lineHeight="36px" fontWeight={600}>
                  {`${payoutToken?.symbol ?? 'Payout Token'} ${remaining}`}</Box>
              </Flex>
            </Column>
            <LoadingIndicator isLoading={isLoading} />
            {!isLoading && (
              <StyledButtonIXSGradient onClick={claimBack}>{t`Claim Back COIN`}</StyledButtonIXSGradient>
            )}
          </>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <Box marginBottom="4px">{t`The event is not paid yet.`}</Box>
            <Box marginBottom="24px">{t`Please proceed with the payment.`}</Box>
            <StyledButtonIXSGradient onClick={goToEdit}>{t`Pay for this event`}</StyledButtonIXSGradient>
          </>
        )
      case PAYOUT_STATUS.DRAFT:
        return (
          <>
            <Box marginBottom="24px">{t`This event is not published and is not displayed in Payout Events list.`}</Box>
            <StyledButtonIXSGradient onClick={goToEdit}>{t`Publish Event`}</StyledButtonIXSGradient>
          </>
        )
      case PAYOUT_STATUS.ANNOUNCED:
        return t`Your record date has not come yet, tokens will be counted on ${formatDate(recordDate)}`
      default:
        return null
    }
  }

  return <Container>{getContentByStatus()}</Container>
}
