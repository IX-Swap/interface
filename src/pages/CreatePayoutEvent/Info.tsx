import React from 'react'
import { Trans } from '@lingui/macro'

import { TYPE } from 'theme'

import { FormCard } from './styleds'

export const Info = () => {
  return (
    <FormCard marginBottom="32px">
      <TYPE.title6 marginBottom="8px" style={{ textTransform: 'uppercase' }}>
        <Trans>What is a payout event?</Trans>
      </TYPE.title6>
      <TYPE.body1>
        <Trans>A payout event allows issuers to distribute tokens to qualified token holders.</Trans>
      </TYPE.body1>
    </FormCard>
  )
}
