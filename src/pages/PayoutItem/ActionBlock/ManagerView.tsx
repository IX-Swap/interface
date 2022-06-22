import React, { FC } from 'react'
import { t } from '@lingui/macro'
import { Box, Flex } from 'rebass'

import CurrencyLogo from 'components/CurrencyLogo'
import Column from 'components/Column'
import { PAYOUT_STATUS } from 'constants/enums'
import { PayoutEvent } from 'state/token-manager/types'

import { Container, StyledButtonIXSGradient } from './styleds'
import { momentFormatDate } from '../utils'

interface Props {
  payout: PayoutEvent
  payoutToken: any
}

export const ManagerView: FC<Props> = ({ payout, payoutToken }) => {
  const { status, isPaid } = payout

  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.STARTED:
        return (
          <>
            {t`Already claimed:`}
            <Flex alignItems="center" fontWeight={600}>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Flex marginLeft="4px" fontSize="24px" lineHeight="36px">{`${payoutToken?.symbol} 345/1000`}</Flex>
            </Flex>
          </>
        )
      case PAYOUT_STATUS.SCHEDULED:
        return !isPaid ? (
          <>
            <Box marginBottom="4px">{t`The event is not paid yet.`}</Box>
            <Box marginBottom="24px">{t`Please proceed with the payment before the payment start date.`}</Box>
            <StyledButtonIXSGradient>{t`Pay for this event`}</StyledButtonIXSGradient>
          </>
        ) : (
          <>
            <Flex marginBottom="4px" alignItems="center" fontWeight={600}>
              <Box marginRight="4px" fontSize="20px" lineHeight="30px">{t`You have allocated for this event`}</Box>
              <CurrencyLogo currency={payoutToken} size="24px" />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`${payoutToken.symbol} 10000`}</Box>
            </Flex>
            <Flex>
              <Box marginRight="4px">{t`Users will be able to start claiming on`}</Box>
              <Box fontWeight={600}>{momentFormatDate(new Date())}</Box>
            </Flex>
          </>
        )
      case PAYOUT_STATUS.ENDED:
        return (
          <>
            <Column style={{ gap: '4px', alignItems: 'center', marginBottom: 24 }}>
              <Box>{t`The event has been ended.`}</Box>
              <Flex alignItems="center">
                <Box marginRight="4px">{t`You can Claim Back`}</Box>
                <CurrencyLogo currency={payoutToken} size="20px" />
                <Box marginX="4px" fontWeight={600}>
                  {payoutToken.symbol}
                </Box>
                {t`tokens.`}
              </Flex>
              <Flex alignItems="center">
                <CurrencyLogo currency={payoutToken} size="24px" />
                <Box
                  marginLeft="4px"
                  fontSize="24px"
                  lineHeight="36px"
                  fontWeight={600}
                >{`${payoutToken.symbol} 12.432`}</Box>
              </Flex>
            </Column>
            <StyledButtonIXSGradient>{t`Claim Back COIN`}</StyledButtonIXSGradient>
          </>
        )
      case PAYOUT_STATUS.DELAYED:
        return (
          <>
            <Box marginBottom="4px">{t`The event is not paid yet.`}</Box>
            <Box marginBottom="24px">{t`Please proceed with the payment.`}</Box>
            <StyledButtonIXSGradient>{t`Pay for this Event`}</StyledButtonIXSGradient>
          </>
        )
      case PAYOUT_STATUS.DRAFT:
        return (
          <>
            <Box marginBottom="24px">{t`This event is not published and is not displayed in Payout Events list.`}</Box>
            <StyledButtonIXSGradient>{t`Publish Event`}</StyledButtonIXSGradient>
          </>
        )
      case PAYOUT_STATUS.ANNOUNCED:
        return t`Your record date has not come yet, tokens will be counted on March 12, 2022.`
      default:
        return null
    }
  }

  return <Container>{getContentByStatus()}</Container>
}
