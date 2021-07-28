import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import DoubleCurrencyLogo from '../DoubleLogo'
import { AutoRow } from '../Row'
import { Dots } from '../swap/styleds'

export const CurrencyHeader = ({ currency0, currency1 }: { currency0: Currency; currency1: Currency }) => {
  return (
    <AutoRow gap="13px">
      <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={33} />
      <Text fontWeight={600} fontSize={20} style={{ marginLeft: '8px', lineHeight: '30px' }}>
        {!currency0 || !currency1 ? (
          <Dots>
            <Trans>Loading</Trans>
          </Dots>
        ) : (
          `${currency0.symbol}/${currency1.symbol}`
        )}
      </Text>
    </AutoRow>
  )
}
