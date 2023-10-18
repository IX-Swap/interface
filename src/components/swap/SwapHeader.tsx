import { Trans } from '@lingui/macro'
import SettingsTab from 'components/Settings'
import React from 'react'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { StyledPageHeader, TYPE } from '../../theme'
import { RowBetween, RowFixed } from '../Row'

export default function SwapHeader() {
  const { allowedSlippage } = useDerivedSwapInfo()
  return (
    // <StyledPageHeader style={{ padding: '0px' }}>
    <RowBetween marginBottom={'25px'}>
      <RowFixed>
        <TYPE.black data-testid="swapTitle" fontWeight={600} fontSize={22} style={{ marginRight: '8px' }}>
          <Trans>Swap</Trans>
        </TYPE.black>
      </RowFixed>
      <RowFixed>
        <SettingsTab placeholderSlippage={allowedSlippage} />
      </RowFixed>
    </RowBetween>
    // </StyledPageHeader>
  )
}
