import React from 'react'
import { Trans } from '@lingui/macro'

import { RowBetween, RowFixed } from '../Row'
import { StyledPageHeader, TYPE } from '../../theme'
import SettingsTab from 'components/Settings'
import { useDerivedSwapInfo } from 'state/swap/hooks'

export default function SwapHeader() {
  const { allowedSlippage } = useDerivedSwapInfo()
  return (
    <StyledPageHeader>
      <RowBetween>
        <RowFixed>
          <TYPE.black fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
            <Trans>Swap</Trans>
          </TYPE.black>
        </RowFixed>
        <RowFixed>
          <SettingsTab placeholderSlippage={allowedSlippage} />
        </RowFixed>
      </RowBetween>
    </StyledPageHeader>
  )
}
