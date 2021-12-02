import { Trans } from '@lingui/macro'
import SettingsTab from 'components/Settings'
import React from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { StyledPageHeader, TYPE } from '../../theme'
import { RowBetween, RowFixed } from '../Row'

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
