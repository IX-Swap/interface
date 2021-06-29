import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import CurrencyLogo from 'components/CurrencyLogo'
import { Text } from 'rebass'
import { RowFixed } from '../Row'
import { Dots } from '../swap/styleds'

export const CurrencyHeader = ({ currency }: { currency: Currency }) => {
  return (
    <RowFixed>
      <CurrencyLogo currency={currency} size={'33px'} style={{ margin: 0 }} />
      <Text fontWeight={600} fontSize={20} style={{ marginLeft: '8px', lineHeight: '30px' }}>
        {currency ? (
          `${currency.symbol}`
        ) : (
          <Dots>
            <Trans>Loading</Trans>
          </Dots>
        )}
      </Text>
    </RowFixed>
  )
}
