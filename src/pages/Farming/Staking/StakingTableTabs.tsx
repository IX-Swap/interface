import { Trans } from '@lingui/macro'
import { Border, ToggleOption, ToggleWrapper } from 'components/Tabs'
import React from 'react'
import { STAKING_TABS, STAKING_TABS_STRINGS } from '../Vesting/enum'

interface Props {
  tab: STAKING_TABS
  setTab: (param: STAKING_TABS) => void
}

export const StakingTableTabs = ({ tab, setTab }: Props) => {
  return (
    <ToggleWrapper style={{ justifyContent: 'flex-start', marginBottom: '10px', width: '100%' }}>
      {Object.values(STAKING_TABS).map((option) => (
        <ToggleOption key={option} onClick={() => setTab(option)} active={tab === option}>
          <Trans>{STAKING_TABS_STRINGS[option]}</Trans>
          <Border active={tab === option} />
        </ToggleOption>
      ))}
    </ToggleWrapper>
  )
}
