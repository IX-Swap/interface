import React, { FC } from 'react'
import { Flex, Box } from 'rebass'
import { Trans, t } from '@lingui/macro'

import Column from 'components/Column'
import CurrencyLogo from 'components/CurrencyLogo'
import { PAYOUT_STATUS } from 'constants/enums'
import { PayoutEvent } from 'state/token-manager/types'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'

import { Container, FuturePayoutContainer, StyledButtonIXSGradient } from './styleds'

interface Props {
  payout: PayoutEvent
  payoutToken: any
}

export const UserView: FC<Props> = ({ payout, payoutToken }) => {
  const { secToken, status } = payout
  const secPayoutToken = new WrappedTokenInfo(secToken)
  const tokenInfo = secPayoutToken?.tokenInfo
  const isNotAccredited = false
  const isNotTokenHolder = false
  const isClaimed = false

  if (status === PAYOUT_STATUS.ENDED) return <PayoutEnded />
  if (isNotAccredited) return <NotAccreditedView />
  if (isNotTokenHolder) return <NotTokenHoldersView status={status} />

  const getContentByStatus = () => {
    const recordDateText = (
      <Flex style={{ color: '#edceff80' }} marginBottom="24px" alignItems="center">
        <Box marginRight="4px">{t`based on your SEC token balance of`}</Box>
        <CurrencyLogo currency={secPayoutToken} size="20px" />
        <Box marginX="4px">{`${(tokenInfo as any).originalSymbol ?? tokenInfo.symbol} 30`}</Box>
        <Box>{t`as of record date.`}</Box>
      </Flex>
    )

    switch (status) {
      case PAYOUT_STATUS.STARTED:
        return isClaimed ? (
          <>
            <Box marginBottom="4px" fontSize="20px" lineHeight="30px" fontWeight={600}>
              {t`You have already claimed:`}
            </Box>
            <Flex alignItems="center">
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box
                marginLeft="4px"
                fontSize="24px"
                lineHeight="36px"
                fontWeight={600}
              >{`${payoutToken.symbol} 0.002`}</Box>
            </Flex>
          </>
        ) : (
          <>
            <Flex alignItems="center" marginBottom="4px" fontWeight={600}>
              <Box fontSize="20px" lineHeight="30px" marginRight="4px">{t`You can now claim your payout of`}</Box>
              <CurrencyLogo size="24px" currency={payoutToken} />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${payoutToken.symbol} 0.002`}</Box>
            </Flex>
            {recordDateText}
          </>
        )
      case PAYOUT_STATUS.SCHEDULED:
        return (
          <>
            <Flex alignItems="center" marginBottom="4px" fontWeight={600}>
              <Box fontSize="20px" lineHeight="30px" marginRight="4px">{t`You have a payout of`}</Box>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${payoutToken.symbol} 0.002 available`}</Box>
            </Flex>
            {recordDateText}
          </>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <Flex marginBottom="4px">
              <Trans>
                This payout event is <strong style={{ marginLeft: '4px', color: '#ED0376' }}>delayed.</strong>
              </Trans>
            </Flex>
            <Flex fontSize="20px" lineHeight="30px" alignItems="center" marginBottom="12px" fontWeight={600}>
              <Box marginRight="4px">{t`Your payout of`}</Box>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box marginX="4px" fontSize="24px" lineHeight="36px">{`${payoutToken.symbol} 0.002`}</Box>
              <Box>{t`will became available once payout starts`}</Box>
            </Flex>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Column style={{ gap: '32px' }}>
      {status !== PAYOUT_STATUS.ANNOUNCED && (
        <Container>
          {getContentByStatus()}
          {!isClaimed && (
            <StyledButtonIXSGradient
              // disabled={status !== PAYOUT_STATUS.STARTED}
              disabled={true}
            >{t`Claim Now`}</StyledButtonIXSGradient>
          )}
        </Container>
      )}
      <FuturePayout payoutToken={payoutToken} />
    </Column>
  )
}

const NotTokenHoldersView: FC<{ status: PAYOUT_STATUS }> = ({ status }) => {
  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.ANNOUNCED:
        return (
          <>
            <Box marginBottom="4px">{t`No SEC tokens detected.`}</Box>
            <Box marginBottom="24px">{t`You need SEC tokens to be eligible for this payout.`}</Box>
          </>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <Flex marginBottom="4px">
              <Trans>
                This payout event is <strong style={{ marginLeft: '4px', color: '#ED0376' }}>delayed.</strong>
              </Trans>
            </Flex>
            <Box marginBottom="24px">{t`You have no pending payout as you have 0 SEC tokens as of record date.`}</Box>
          </>
        )
      default:
        return (
          <>
            <Box marginBottom="4px">{t`Payout unavailable.`}</Box>
            <Box marginBottom="24px">{t`You have 0 SEC tokens as of record date.`}</Box>
          </>
        )
    }
  }
  return (
    <Container>
      {getContentByStatus()}
      <StyledButtonIXSGradient>{t`Buy Now`}</StyledButtonIXSGradient>
    </Container>
  )
}

const NotAccreditedView: FC = () => {
  return (
    <Container>
      <Box marginBottom="24px">{t`You need to pass KYC and get accredited to be eligible for this payout.`}</Box>
      <StyledButtonIXSGradient>{t`Pass Accreditation`}</StyledButtonIXSGradient>
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

const FuturePayout: FC<{ payoutToken: any }> = ({ payoutToken }) => {
  return (
    <FuturePayoutContainer>
      <Flex marginBottom="12px" alignItems="center">
        <Box marginRight="4px">{t`Add`}</Box>
        <CurrencyLogo currency={payoutToken} size="20px" />
        <Box marginX="4px" fontWeight={600}>
          {payoutToken.symbol}
        </Box>
        <Box marginRight="4px">{t`to increase possible profits in future payout.`}</Box>
      </Flex>
      <StyledButtonIXSGradient>{t`Buy Now`}</StyledButtonIXSGradient>
    </FuturePayoutContainer>
  )
}
