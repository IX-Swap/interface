import React, { FC, useCallback, useEffect, useState } from 'react'
import { Flex, Box } from 'rebass'
import { Trans } from '@lingui/macro'
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

import { Container, DelayedContainer, StyledButton, TokenSymbol } from './styleds'
import { getClaimAuthorization, useGetUserClaim, useSaveUserClaim, getMyClaimableAmount } from 'state/payout/hooks'
import dayjs from 'dayjs'
import { usePayoutContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { LoadingIndicator } from 'components/LoadingIndicator'
import { Claimed } from './Claimed'
import { UserClaim } from './dto'
import { SecToken } from 'types/secToken'
import styled, { useTheme } from 'styled-components'
import PayoutStatusBadge from './StatusBadge'
import { TYPE } from 'theme'

interface Props {
  payout: PayoutEvent
  payoutToken: any
  myAmount: number
}

export const UserView: FC<Props> = ({ payout, payoutToken, myAmount }) => {
  const { account } = useActiveWeb3React()
  const { secToken, status, id, contractPayoutId, payoutContractAddress } = payout
  const { custodianStatus, brokerDealerStatus } = useAccreditationStatus((secToken as any)?.address || 0)
  const statuses = [custodianStatus, brokerDealerStatus]
  const [claimStatus, handleClaimStatus] = useState<UserClaim>({} as UserClaim)
  const [isLoading, handleIsLoading] = useState(false)
  const theme = useTheme()
  const [amountToClaim, setAmountToClaim] = useState(0)

  const getUserClaim = useGetUserClaim()
  const saveUserClaim = useSaveUserClaim()

  const balance = useCurrencyBalance(account ?? undefined, ({ ...secToken, isToken: true } as any) ?? undefined)
  const secTokenBalance = formatCurrencyAmount(balance, secToken?.decimals ?? 18)
  const payoutContract = usePayoutContract(payoutContractAddress)

  const addTransaction = useTransactionAdder()

  const secPayoutToken = new WrappedTokenInfo(secToken)
  const tokenInfo = secPayoutToken?.tokenInfo
  const isNotAccredited = statuses.some((status) => !status)
  const isNotTokenHolder = '0' === secTokenBalance || !amountToClaim

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserClaim(id)
      handleClaimStatus(res)
      const _amountToClaim = await getMyClaimableAmount(+id)
      setAmountToClaim(+_amountToClaim)
    }
    if (id && account) {
      fetch()
    }
  }, [id, account])

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
      <Flex
        marginBottom="24px"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        textAlign="center"
        color={theme.text2}
      >
        <Box marginRight="4px">
          <Trans>{`Based on your SEC token balance of`}</Trans>
        </Box>
        <CurrencyLogo currency={secPayoutToken} size="20px" />
        <Box marginX="4px">{(tokenInfo as SecToken).originalSymbol ?? tokenInfo.symbol}</Box>
        <Box marginX="4px" color={theme.text1}>
          {myAmount.toFixed(decimals)}
        </Box>
        <Box>
          <Trans>{`as of record date.`}</Trans>
        </Box>
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
          <Box color={theme.text1}>
            <Flex alignItems="center" justifyContent="center" marginBottom="4px" fontWeight={600} flexWrap="wrap">
              <Box fontSize="20px" lineHeight="30px" marginRight="4px" fontWeight="700">
                <Trans>{`You can now claim your payout of`}</Trans>
              </Box>
              <CurrencyLogo size="24px" currency={payoutToken} />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">
                <TokenSymbol>{payoutToken.symbol}</TokenSymbol>
                {` ${Number(amountToClaim || '0').toFixed(decimals)}`}
              </Box>
            </Flex>
            {recordDateText}
          </Box>
        )
      case PAYOUT_STATUS.SCHEDULED:
        return (
          <>
            <Flex alignItems="center" marginBottom="4px" fontWeight={600}>
              <Box fontSize="20px" lineHeight="30px" marginRight="4px">
                <Trans>{`You have a payout of`}</Trans>
              </Box>
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
            <PayoutStatusBadge status={PAYOUT_STATUS.DELAYED} />
            <div>
              <Box>
                <Trans>{`Your payout of`}</Trans>
              </Box>
              <Flex fontSize={24} fontWeight={600} style={{ gap: 4 }} alignItems="center">
                <CurrencyLogo currency={payoutToken} />
                <Box>
                  <TokenSymbol>{payoutToken.symbol}</TokenSymbol>
                  {` ${Number(amountToClaim || '0')}`}
                </Box>
              </Flex>
              <Box>
                <Trans>{`based on your SEC token balance`}</Trans>
              </Box>
            </div>
            <Flex marginBottom="24px" alignItems="center">
              <CurrencyLogo currency={secPayoutToken} size="20px" />
              <Box marginX="4px" color={theme.text2}>
                {(tokenInfo as SecToken).originalSymbol ?? tokenInfo.symbol}
              </Box>
              <Box marginX="4px">{myAmount.toFixed(decimals)}</Box>
              <Box>
                <Trans>{`as of record date will become available once payout starts.`}</Trans>
              </Box>
            </Flex>
          </DelayedContainer>
        )
      default:
        return null
    }
  }, [status, payoutToken, claimStatus, secPayoutToken])


  if (status === PAYOUT_STATUS.ENDED) return <PayoutEnded />
  if (isNotAccredited) return <NotAccreditedView secTokenId={secToken.catalogId} />
  if (isNotTokenHolder) return <NotTokenHoldersView status={status} payoutToken={payoutToken} secToken={secToken} />

  return (
    <Column style={{ gap: '32px' }}>
      <LoadingIndicator isLoading={isLoading} />
      {status !== PAYOUT_STATUS.ANNOUNCED && (
        <Container>
          {getContentByStatus()}
          {!claimStatus?.status && (
            <StyledButton disabled={status !== PAYOUT_STATUS.STARTED || isLoading} onClick={claim}>
              <Trans>{`Claim Now`}</Trans>
            </StyledButton>
          )}
        </Container>
      )}
      <FuturePayout secToken={secToken} />
    </Column>
  )
}

const NotTokenHoldersView: FC<{ payoutToken: any; secToken?: SecToken; status: PAYOUT_STATUS }> = ({
  payoutToken,
  secToken,
  status,
}) => {
  const history = useHistory()
  const secTokenSymbol = secToken?.symbol

  const onBuyClick = () => {
    history.push('/swap')
  }

  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.ANNOUNCED:
        return (
          <Flex marginBottom="24px">
            <Box marginX="4px">
              <Trans>{`Add`}</Trans>
            </Box>
            <CurrencyLogo currency={payoutToken} size="24px" />
            <Box marginX="4px" fontWeight="bold">
              {payoutToken.symbol}{' '}
            </Box>
            <Box>
              <Trans>{`to increase possible payout.`}</Trans>
            </Box>
          </Flex>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <PayoutStatusBadge status={PAYOUT_STATUS.DELAYED} />
            <Flex marginTop="16px" marginBottom="4px">
              <Box fontSize="20px" lineHeight="30px" marginRight="4px" fontWeight="700">
                <Trans>This payout event is delayed.</Trans>
              </Box>
            </Flex>
            <Box marginBottom="24px">
              <Trans>{`You have no pending payout as you have 0 ${secTokenSymbol} tokens as of record date.`}</Trans>
            </Box>
          </>
        )
      default:
        return (
          <Box style={{ display: 'flex', alignItems: 'center', gap: '2px' }} marginBottom="16px">
            <TYPE.title5>Payout unavailable: </TYPE.title5>
            <TYPE.description4> You have</TYPE.description4>
            <img
              style={{ borderRadius: '50%', margin: '0 4px -1px' }}
              width="20px"
              height="20px"
              src={secToken?.logo?.public}
            />
            <TYPE.description4>
              <StyledTokenBalance style={{fontWeight: '600'}}>0 {secTokenSymbol}</StyledTokenBalance> tokens as of record date.
            </TYPE.description4>
          </Box>
        )
    }
  }
  return (
    <Container>
      {getContentByStatus()}
      <StyledButton onClick={onBuyClick}>
        <Trans>{`Buy Now`}</Trans>
      </StyledButton>
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
      <Box marginBottom="24px">
        <Trans>{`You need to pass KYC and get accredited to be eligible for this payout.`}</Trans>
      </Box>
      <StyledButton onClick={redirect}>
        <Trans>{`Pass Accreditation`}</Trans>
      </StyledButton>
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
  const theme = useTheme()

  const onBuyClick = () => {
    history.push('/swap')
  }

  return (
    <Container>
      <Flex
        marginBottom="12px"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        color={theme.text2}
        style={{ gap: 4 }}
      >
        <Flex alignItems="center" style={{ gap: 4 }}>
          <Trans>{`Add`}</Trans>
          <CurrencyLogo currency={secToken} size="20px" />
          <Box color="#8f8fb2">{secToken.symbol}</Box>
        </Flex>
        <Trans>{`to increase possible payout.`}</Trans>
      </Flex>
      <StyledButton onClick={onBuyClick}>
        <Trans>{`Buy Now`}</Trans>
      </StyledButton>
    </Container>
  )
}

const StyledTokenBalance = styled.span`
  color: ${({ theme }) => theme.text6};
`
