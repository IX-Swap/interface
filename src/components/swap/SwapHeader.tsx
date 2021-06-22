import React from 'react'
import { Trans } from '@lingui/macro'

import { RowBetween, RowFixed } from '../Row'
import { StyledPageHeader, TYPE } from '../../theme'

export default function SwapHeader() {
  return (
    <StyledPageHeader>
      <RowBetween>
        <RowFixed>
          <TYPE.black fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
            <Trans>Swap</Trans>
          </TYPE.black>
        </RowFixed>
        <RowFixed></RowFixed>
      </RowBetween>
    </StyledPageHeader>
  )
}
