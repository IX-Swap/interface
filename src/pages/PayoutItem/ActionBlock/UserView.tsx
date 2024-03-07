import React, { FC, useCallback, useEffect, useState } from 'react'
import { Flex, Box } from 'rebass'
import { Trans, t } from '@lingui/macro'
import { useHistory } from 'react-router-dom'

import Column from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import { PAYOUT_STATUS } from 'constants/enums'
import { PayoutEvent } from 'state/token-manager/types'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { routes } from 'utils/routes'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { useAccreditationStatus } from 'state/secTokens/hooks'

import { Container, DelayedContainer, FuturePayoutContainer, StyledButtonIXSGradient } from './styleds'
import { getClaimAuthorization, useGetUserClaim, useSaveUserClaim } from 'state/payout/hooks'
import dayjs from 'dayjs'
import { usePayoutContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { FetchingBalance } from './FetchingBalance'
import { Claimed } from './Claimed'
import { UserClaim } from './dto'

interface Props {
  payout: PayoutEvent
  payoutToken: any
  myAmount: number
}

export const UserView: FC<Props> = ({ payout, payoutToken, myAmount }) => {
  const { account } = useActiveWeb3React()
  const { secToken, status, secTokenAmount, tokenAmount, id, contractPayoutId } = payout
  const { custodianStatus, brokerDealerStatus } = useAccreditationStatus((secToken as any)?.address || 0)
  const statuses = [custodianStatus, brokerDealerStatus]
  const [claimStatus, handleClaimStatus] = useState<UserClaim>({} as UserClaim)
  const [isLoading, handleIsLoading] = useState(false)

  const getUserClaim = useGetUserClaim()
  const saveUserClaim = useSaveUserClaim()

  const balance = useCurrencyBalance(account ?? undefined, ({ ...secToken, isToken: true } as any) ?? undefined)
  const secTokenBalance = formatCurrencyAmount(balance, secToken?.decimals ?? 18)
  const payoutContract = usePayoutContract()

  const addTransaction = useTransactionAdder()

  const secPayoutToken = new WrappedTokenInfo(secToken)
  const tokenInfo = secPayoutToken?.tokenInfo
  const isNotAccredited = statuses.some((status) => !status)
  const isNotTokenHolder = '0' === secTokenBalance || !myAmount

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserClaim(id)
      handleClaimStatus(res)
    }
    if (id) {
      fetch()
    }
  }, [id, account])

  const amountToClaim = +tokenAmount * (+secTokenAmount > 0 ? myAmount / +secTokenAmount : myAmount)

  const decimals = tokenInfo?.decimals < 7 ? tokenInfo.decimals : 6

  const claim = useCallback(async () => {
    try {
      handleIsLoading(true)
      const nonce = await payoutContract?.nonce(contractPayoutId, account)

      const authorization = await getClaimAuthorization({
        id,
        token: payoutToken.address,
        deadline: dayjs().add(1, 'hour').toISOString(),
        nonce,
      })

      const tx = await payoutContract?.claim(authorization)

      await saveUserClaim({ payoutEventId: id, secToken: secToken.id, txHash: tx.hash })
      const res = await getUserClaim(id)
      handleClaimStatus(res)

      if (tx.hash) {
        addTransaction(tx, {
          summary: `Claim was successful. Waiting for system confirmation.`,
        })
      }

      handleIsLoading(false)
    } catch (e: any) {
      handleIsLoading(false)
    }
  }, [contractPayoutId, account, id, secToken, getUserClaim, saveUserClaim])

  const getContentByStatus = useCallback(() => {
    const recordDateText = (
      <Flex style={{ color: '#edceff80' }} marginBottom="24px" alignItems="center">
        <Box marginRight="4px"><Trans>{`based on your Security token balance of`}</Trans></Box>
        <CurrencyLogo currency={secPayoutToken} size="20px" />
        <Box marginX="4px">{`${(tokenInfo as any).originalSymbol ?? tokenInfo.symbol} ${myAmount.toFixed(
          decimals
        )}`}</Box>
        <Box><Trans>{`as of record date.`}</Trans></Box>
      </Flex>
    )

    switch (status) {
      case PAYOUT_STATUS.STARTED:
        return claimStatus?.status ? (
          <Claimed
            claimStatus={claimStatus.status}
            payoutToken={payoutToken}
            amountToClaim={Number(amountToClaim || '0').toFixed(decimals)}
          />
        ) : (
          <>
            <Flex alignItems="center" marginBottom="4px" fontWeight={600}>
              <Box fontSize="20px" lineHeight="30px" marginRight="4px"><Trans>{`You can now claim your payout of`}</Trans></Box>
              <CurrencyLogo size="24px" currency={payoutToken} />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${payoutToken.symbol} ${Number(
                amountToClaim || '0'
              ).toFixed(decimals)}`}</Box>
            </Flex>
            {recordDateText}
          </>
        )
      case PAYOUT_STATUS.SCHEDULED:
        return (
          <>
            <Flex alignItems="center" marginBottom="4px" fontWeight={600}>
              <Box fontSize="20px" lineHeight="30px" marginRight="4px"><Trans>{`You have a payout of`}</Trans></Box>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${payoutToken.symbol} ${Number(
                amountToClaim || '0'
              ).toFixed(decimals)} available`}</Box>
            </Flex>
            {recordDateText}
          </>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <DelayedContainer>
            <div>
              <Trans>
                This payout event is <strong style={{ marginLeft: '4px', color: '#ED0376' }}>delayed.</strong>
              </Trans>
            </div>
            <div>
              <Box><Trans>{`Your payout of`}</Trans></Box>
              <Flex fontSize={24} fontWeight={600} style={{ gap: 4 }} alignItems="center">
                <CurrencyLogo currency={payoutToken} />
                <Box>{`${payoutToken.symbol} ${Number(amountToClaim || '0')}`}</Box>
              </Flex>
              <Box><Trans>{`based on your Security token balance of`}</Trans></Box>
            </div>
            <div>
              <CurrencyLogo currency={secPayoutToken} size="20px" />
              <Box marginX="4px">{`${(tokenInfo as any).originalSymbol ?? tokenInfo.symbol} ${myAmount.toFixed(
                decimals
              )}`}</Box>
              <Box><Trans>{`as of record date will become available once payout starts.`}</Trans></Box>
            </div>
          </DelayedContainer>
        )
      default:
        return null
    }
  }, [status, payoutToken, claimStatus, secPayoutToken])

  if (secTokenBalance === '-') return <FetchingBalance />
  if (status === PAYOUT_STATUS.ENDED) return <PayoutEnded />
  if (isNotAccredited) return <NotAccreditedView secTokenId={secToken.catalogId} />
  if (isNotTokenHolder) return <NotTokenHoldersView status={status} payoutToken={payoutToken} />

  return (
    <Column style={{ gap: '32px' }}>
      <LoadingIndicator isLoading={isLoading} />
      {status !== PAYOUT_STATUS.ANNOUNCED && (
        <Container>
          {getContentByStatus()}
          {!claimStatus?.status && (
            <StyledButtonIXSGradient
              disabled={status !== PAYOUT_STATUS.STARTED || isLoading}
              onClick={claim}
            ><Trans>{`Claim Now`}</Trans></StyledButtonIXSGradient>
          )}
        </Container>
      )}
      <FuturePayout secToken={secToken} />
    </Column>
  )
}

const NotTokenHoldersView: FC<{ payoutToken: any; status: PAYOUT_STATUS }> = ({ payoutToken, status }) => {
  const history = useHistory()

  const onBuyClick = () => {
    history.push('/swap')
  }

  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.ANNOUNCED:
        return (
          <Flex marginBottom="24px">
            <Box marginX="4px"><Trans>{`Add`}</Trans></Box>
            <CurrencyLogo currency={payoutToken} size="24px" />
            <Box marginX="4px" fontWeight="bold">
              {payoutToken.symbol}{' '}
            </Box>
            <Box><Trans>{`to increase possible payout.`}</Trans></Box>
          </Flex>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <Flex marginBottom="4px">
              <Trans>
                This payout event is <strong style={{ marginLeft: '4px', color: '#ED0376' }}>delayed.</strong>
              </Trans>
            </Flex>
            <Box marginBottom="24px"><Trans>{`You have no pending payout as you have 0 SEC tokens as of record date.`}</Trans></Box>
          </>
        )
      default:
        return (
          <>
            <Box marginBottom="4px"><Trans>{`Payout unavailable.`}</Trans></Box>
            <Box marginBottom="24px"><Trans>{`You have 0 SEC tokens as of record date.`}</Trans></Box>
          </>
        )
    }
  }
  return (
    <Container>
      {getContentByStatus()}
      <StyledButtonIXSGradient onClick={onBuyClick}><Trans>{`Buy Now`}</Trans></StyledButtonIXSGradient>
    </Container>
  )
}

const NotAccreditedView: FC<{ secTokenId: any }> = ({ secTokenId }) => {
  const history = useHistory()

  const redirect = () => {
    history.push(routes.securityToken(secTokenId))
  }

  return (
    <Container>
      <Box marginBottom="24px"><Trans>{`You need to pass KYC and get accredited to be eligible for this payout.`}</Trans></Box>
      <StyledButtonIXSGradient onClick={redirect}><Trans>{`Pass Accreditation`}</Trans></StyledButtonIXSGradient>
    </Container>
  )
}

const PayoutEnded: FC = () => (
  <Container>
    <Flex>
      <Trans>
        This payout event is <strong style={{ marginLeft: '4px' }}>ended.</strong>
      </Trans>
    </Flex>
  </Container>
)

const FuturePayout: FC<{ secToken: any }> = ({ secToken }) => {
  const history = useHistory()

  const onBuyClick = () => {
    history.push('/swap')
  }

  return (
    <FuturePayoutContainer>
      <Flex marginBottom="12px" alignItems="center" justifyContent="center" flexWrap="wrap" style={{ gap: 4 }}>
        <Flex alignItems="center" style={{ gap: 4 }}>
          <Trans>{`Add`}</Trans>
          <CurrencyLogo currency={secToken} size="20px" />
          <Box fontWeight={600}>{secToken.symbol}</Box>
        </Flex>
        <Trans>{`to increase possible profits in future payout.`}</Trans>
      </Flex>
      <StyledButtonIXSGradient onClick={onBuyClick}><Trans>{`Buy Now`}</Trans></StyledButtonIXSGradient>
    </FuturePayoutContainer>
  )
}
