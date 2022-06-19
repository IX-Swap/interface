import React, { FC } from 'react'
import { t } from '@lingui/macro'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'

import { ButtonIXSGradient } from 'components/Button'
import CurrencyLogo from 'components/CurrencyLogo'
import Column from 'components/Column'

import { Container } from './styleds'
import { PAYOUT_STATUS } from '..'
import { momentFormatDate } from '../utils'

interface Props {
  status: PAYOUT_STATUS
}

export const ManagerView: FC<Props> = ({ status }) => {
  const isPaid = false

  const getContentByStatus = () => {
    switch (status) {
      case PAYOUT_STATUS.STARTED:
        return (
          <>
            {t`Already claimed:`}
            <Flex alignItems="center" fontWeight={600}>
              <CurrencyLogo size="24px" />
              <Flex marginLeft="4px" fontSize="24px" lineHeight="36px">{`COIN 345/1000`}</Flex>
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
              <CurrencyLogo size="24px" />
              <Box marginLeft="4px" fontSize="24px" lineHeight="36px">{`BUSD 10000`}</Box>
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
                <CurrencyLogo size="20px" />
                <Box marginX="4px" fontWeight={600}>{`COIN`}</Box>
                {t`tokens.`}
              </Flex>
              <Flex alignItems="center">
                <CurrencyLogo size="24px" />
                <Box marginLeft="4px" fontSize="24px" lineHeight="36px" fontWeight={600}>{`COIN 12.432`}</Box>
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
    }
  }

  return <Container>{getContentByStatus()}</Container>
}

const StyledButtonIXSGradient = styled(ButtonIXSGradient)`
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  max-height: 40px;
  min-height: 40px;
  border-radius: 40px;
  padding: 12px 24px;
`
