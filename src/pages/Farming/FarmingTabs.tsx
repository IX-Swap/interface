import { Trans } from '@lingui/macro'
import { RowStart } from 'components/Row'
import { Border } from 'components/Tabs'
import React from 'react'
import { FARMING_TABS } from './Farming'
import { FarmingToggleOption, FarmingToggleWrapper } from './styleds'

interface Props {
  tab: FARMING_TABS
  setTab: (arg: FARMING_TABS) => void
}

export const FarmingTabs = ({ tab, setTab }: Props) => {
  return (
    <RowStart style={{ paddingBottom: 0, width: 'fit-content' }}>
      <FarmingToggleWrapper>
        {Object.values(FARMING_TABS).map((option: FARMING_TABS) => (
          <FarmingToggleOption key={option} active={tab === option} onClick={() => setTab(option)}>
            <Trans>{option}</Trans>
            <Border active={tab === option} />
          </FarmingToggleOption>
        ))}
      </FarmingToggleWrapper>
    </RowStart>
  )
}
