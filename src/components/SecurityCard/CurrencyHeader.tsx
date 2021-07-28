import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import CurrencyLogo from 'components/CurrencyLogo'
import React from 'react'
import { TYPE } from 'theme'
import { RowFixed } from '../Row'
import { Dots } from '../swap/styleds'

export const CurrencyHeader = ({ currency }: { currency: Currency }) => {
  return (
    <RowFixed>
      {currency && (
        <>
          <CurrencyLogo currency={currency} size={'33px'} style={{ margin: 0 }} />
          <TYPE.body4 style={{ marginLeft: '8px' }}>{currency.symbol}</TYPE.body4>
        </>
      )}
      {!currency && (
        <TYPE.title4>
          <Dots>
            <Trans>Loading</Trans>
          </Dots>
        </TYPE.title4>
      )}
    </RowFixed>
  )
}
