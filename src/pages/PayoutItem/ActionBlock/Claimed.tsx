import React, { FC } from 'react'
import { Flex, Box } from 'rebass'
import { Trans, t } from '@lingui/macro'

import CurrencyLogo from 'components/CurrencyLogo'

interface Props {
  payoutToken: any
  claimStatus: string
  amountToClaim: string
}
enum ClaimSatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  FAILED = 'failed',
}
export const Claimed: FC<Props> = ({ payoutToken, amountToClaim, claimStatus }) => {
  switch (claimStatus) {
    case ClaimSatus.ACCEPTED: {
      return (
        <>
          <Box marginBottom="4px" fontSize="20px" lineHeight="30px" fontWeight={600}>
            <Trans>{`You have already claimed:`}</Trans>
          </Box>
          <Flex alignItems="center">
            <CurrencyLogo currency={payoutToken} size="24px" />
            <Box
              marginLeft="4px"
              fontSize="24px"
              lineHeight="36px"
              fontWeight={600}
            >{`${payoutToken.symbol} ${amountToClaim}`}</Box>
          </Flex>
        </>
      )
    }
    case ClaimSatus.PENDING: {
      return (
        <>
          <Box marginBottom="4px" fontSize="20px" lineHeight="30px" fontWeight={600}>
          <Trans>{`Your claim request has been submitted. Waiting for system confirmation.`}</Trans>
          </Box>
          <Flex alignItems="center">
            <CurrencyLogo currency={payoutToken} size="24px" />
            <Box
              marginLeft="4px"
              fontSize="24px"
              lineHeight="36px"
              fontWeight={600}
            >{`${payoutToken.symbol} ${amountToClaim}`}</Box>
          </Flex>
        </>
      )
    }
    case ClaimSatus.FAILED: {
      return (
        <>
          <Box marginBottom="4px" fontSize="20px" lineHeight="30px" fontWeight={600} color="#FF6161">
          <Trans>{`Your claim request failed. Please contact support for further assistance.`}</Trans>
          </Box>
          <Flex alignItems="center">
            <CurrencyLogo currency={payoutToken} size="24px" />
            <Box
              marginLeft="4px"
              fontSize="24px"
              lineHeight="36px"
              fontWeight={600}
            >{`${payoutToken.symbol} ${amountToClaim}`}</Box>
          </Flex>
        </>
      )
    }
    default:
      return null
  }
}
