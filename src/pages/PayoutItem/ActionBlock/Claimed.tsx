import React, { FC } from 'react'
import { Flex, Box } from 'rebass'
import { Trans } from '@lingui/macro'

import CurrencyLogo from 'components/CurrencyLogo'

interface Props {
  payoutToken: any
  amountToClaim: string | number
}
export const Claimed: FC<Props> = ({ payoutToken, amountToClaim }) => {
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
