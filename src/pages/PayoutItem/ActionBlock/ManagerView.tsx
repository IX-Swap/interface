import React, { FC, useCallback, useEffect, useState } from 'react'
import { Trans, t } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'

import CurrencyLogo from 'components/CurrencyLogo'
import Column from 'components/Column'
import { PAYOUT_STATUS } from 'constants/enums'
import { PayoutEvent } from 'state/token-manager/types'
import { routes } from 'utils/routes'
import {
  getClaimBackAuthorization,
  useGetRemainingTokens,
  useGetTotalClaims,
  useGetUserClaim,
  useSaveManagerClaimBack,
} from 'state/payout/hooks'

import { Container, StyledButtonIXSGradient } from './styleds'
import { formatDate } from '../utils'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { usePayoutContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { UserClaim } from './dto'
import { useActiveWeb3React } from 'hooks/web3'
import { FetchingBalance } from './FetchingBalance'
import { LoadingIndicator } from 'components/LoadingIndicator'

interface Props {
  payout: PayoutEvent
  payoutToken: any
  onUpdate?: () => void
}

export const ManagerView: FC<Props> = ({ payout, payoutToken, onUpdate }) => {
  const history = useHistory()
  const getTotalClaims = useGetTotalClaims()
  const getRemainingTokens = useGetRemainingTokens()

  const { account } = useActiveWeb3React()
  const { status, isPaid, secToken, tokenAmount, recordDate, id, startDate, contractPayoutId, paidTxHash } = payout

  const [totalClaims, handleTotalClaims] = useState(0)
  const [remaining, setRemaining] = useState<string | undefined>(undefined)
  const [claimStatus, handleClaimStatus] = useState<UserClaim>({} as UserClaim)
  const [isLoading, handleIsLoading] = useState(false)

  const getUserClaim = useGetUserClaim()
  const saveManagerClaimBack = useSaveManagerClaimBack()

  useEffect(() => {
    const fetch = async () => {
      const [res, remainingTokens] = await Promise.all([getTotalClaims(id), getRemainingTokens(id)])

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

  const balance = useCurrencyBalance(account ?? undefined, ({ ...secToken, isToken: true } as any) ?? undefined)
  const secTokenBalance = formatCurrencyAmount(balance, secToken?.decimals ?? 18)
  const payoutContract = usePayoutContract()

  const addTransaction = useTransactionAdder()

  const claimBack = useCallback(async () => {
    try {
      handleIsLoading(true)
      const nonce = await payoutContract?.nonce(contractPayoutId, account)

      const authorization = await getClaimBackAuthorization({
        id,
        token: payoutToken.address,
        deadline: dayjs().add(1, 'hour').toISOString(),
        nonce,
      })

      const tx = await payoutContract?.claim(authorization)

      handleIsLoading(false)

      await saveManagerClaimBack({ payoutEventId: id, secToken: secToken.id, txHash: tx.hash })
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
  }, [])

  if (secTokenBalance === '-') return <FetchingBalance />

  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.STARTED:
        return (
          <>
            <Trans>{`Already claimed:`}</Trans>
            <Flex alignItems="center" fontWeight={600}>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Flex marginLeft="4px" fontSize="24px" lineHeight="36px">{`${
                payoutToken?.symbol ?? 'Payout Token'
              } ${totalClaims}/${tokenAmount}`}</Flex>
            </Flex>
          </>
        )
      case PAYOUT_STATUS.SCHEDULED:
        return !isPaid && !paidTxHash ? (
          <>
            <Box marginBottom="4px"><Trans>{`The event is not paid yet.`}</Trans></Box>
            <Box marginBottom="24px"><Trans>{`Please proceed with the payment before the payment start date.`}</Trans></Box>
            <StyledButtonIXSGradient onClick={goToEdit}><Trans>{`Pay for This Event`}</Trans></StyledButtonIXSGradient>
          </>
        ) : !isPaid && paidTxHash ? (
          <>
            <Flex marginBottom="4px" alignItems="center" fontWeight={600}>
              <Box marginRight="4px" fontSize="20px" lineHeight="30px">
              <Trans>{`Paid was successful. Waiting for system confirmation.`}</Trans>
              </Box>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${
                payoutToken?.symbol ?? 'Payout Token'
              } ${tokenAmount}`}</Box>
            </Flex>
          </>
        ) : (
          <>
            <Flex marginBottom="4px" alignItems="center" fontWeight={600}>
              <Box marginRight="4px" fontSize="20px" lineHeight="30px"><Trans>{`You have allocated for this event`}</Trans></Box>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${
                payoutToken?.symbol ?? 'Payout Token'
              } ${tokenAmount}`}</Box>
            </Flex>
            <Flex>
              <Box marginRight="4px"><Trans>{`Users will be able to start claiming on`}</Trans></Box>
              <Box fontWeight={600}>{formatDate(dayjs(startDate))}</Box>
            </Flex>
          </>
        )
      case PAYOUT_STATUS.ENDED:
        if (payout?.isReturned) {
          return (
            <Column style={{ gap: '4px', alignItems: 'center' }}>
              <Box><Trans>{`The event has been ended.`}</Trans></Box>
              <Box><Trans>{`All tokens have been claimed back`}</Trans></Box>
            </Column>
          )
        }

        return (
          <>
            <Column style={{ gap: '4px', alignItems: 'center', marginBottom: 24 }}>
              <Box><Trans>{`The event has been ended.`}</Trans></Box>
              <Flex alignItems="center">
                <Box marginRight="4px"><Trans>{`You can Claim Back`}</Trans></Box>
                <CurrencyLogo currency={payoutToken} size="20px" />
                <Box marginX="4px" fontWeight={600}>
                  {payoutToken?.symbol ?? 'Payout Token'}
                </Box>
                <Trans>{`tokens.`}</Trans>
              </Flex>
              <Flex alignItems="center">
                <CurrencyLogo currency={payoutToken} size="24px" />
                <Box marginLeft="4px" fontSize="24px" lineHeight="36px" fontWeight={600}>
                  {`${payoutToken?.symbol ?? 'Payout Token'} ${remaining}`}
                </Box>
              </Flex>
            </Column>
            <LoadingIndicator isLoading={isLoading} />
            {!isLoading && (
              <StyledButtonIXSGradient onClick={claimBack}>
                <Box marginX="8px"><Trans>{`Claim Back `}</Trans></Box>
                <CurrencyLogo currency={payoutToken} size="24px" />
                <Box marginX="2px">{payoutToken?.symbol}</Box>
              </StyledButtonIXSGradient>
            )}
          </>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <Box marginBottom="4px"><Trans>{`The event is not paid yet.`}</Trans></Box>
            <Box marginBottom="24px"><Trans>{`Please proceed with the payment.`}</Trans></Box>
            <StyledButtonIXSGradient onClick={goToEdit}><Trans>{`Pay for This Event`}</Trans></StyledButtonIXSGradient>
          </>
        )
      case PAYOUT_STATUS.DRAFT:
        return (
          <>
            <Box marginBottom="24px"><Trans>{`This event is not published and is not displayed in Payout Events list.`}</Trans></Box>
            <StyledButtonIXSGradient onClick={goToEdit}><Trans>{`Publish Event`}</Trans></StyledButtonIXSGradient>
          </>
        )
      case PAYOUT_STATUS.ANNOUNCED:
        return `Your record date has not come yet, tokens will be counted on ${formatDate(recordDate)}`
      default:
        return null
    }
  }

  return <Container>{getContentByStatus()}</Container>
}
