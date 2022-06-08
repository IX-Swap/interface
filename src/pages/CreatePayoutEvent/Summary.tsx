import React, { FC } from 'react'
import { Label } from '@rebass/forms'
import { Trans } from '@lingui/macro'

import { TYPE } from 'theme'

interface Props {
  poolsAmount: string
  walletsAmount: string
}

export const Summary: FC<Props> = ({ poolsAmount, walletsAmount }) => {
  return (
    <>
      <Label marginBottom="11px">
        <TYPE.title11 color="text2">
          <Trans>Token Payout Summary</Trans>
        </TYPE.title11>
      </Label>
    </>
  )
}
