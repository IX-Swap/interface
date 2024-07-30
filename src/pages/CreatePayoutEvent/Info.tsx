import React from 'react'
import { Trans } from '@lingui/macro'
import { TYPE } from 'theme'
import { PayoutHeaderCard } from './styleds'

export const Info = () => {
  return (
    <PayoutHeaderCard marginTop='16px' marginBottom="32px">
      <TYPE.body style={{ fontWeight: '600' }}>
        What is a payout event?
      </TYPE.body>
      <TYPE.description8>
        A payout event allows issuers to distribute tokens to qualified token holders.
      </TYPE.description8>
    </PayoutHeaderCard>
  )
}
