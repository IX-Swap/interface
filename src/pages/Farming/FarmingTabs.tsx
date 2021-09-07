import { Border } from 'components/Tabs'
import React from 'react'
import { DiscreteInternalLink } from 'theme'
import { routes } from 'utils/routes'
import { FARMING_STRINGS, FARMING_TABS } from './enum'
import { FarmingToggleOption, FarmingToggleWrapper, TabsRow } from './styleds'

interface Props {
  tab: FARMING_TABS
}
const urls = {
  [FARMING_TABS.STAKING]: routes.staking,
  [FARMING_TABS.VESTING]: routes.vesting,
}
export const FarmingTabs = ({ tab }: Props) => {
  return (
    <TabsRow>
      <FarmingToggleWrapper>
        {[FARMING_TABS.STAKING, FARMING_TABS.VESTING].map((option) => (
          <FarmingToggleOption as={DiscreteInternalLink} key={option} active={tab === option} to={urls[option]}>
            <>{FARMING_STRINGS[option]}</>
            <Border active={tab === option} />
          </FarmingToggleOption>
        ))}
      </FarmingToggleWrapper>
    </TabsRow>
  )
}
