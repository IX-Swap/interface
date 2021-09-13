import React, { useState } from 'react'
import { StakingTiers } from './StakingTiers'
import { MyStakingsTable } from './MyStakingsTable'
import { STAKING_TABS } from '../enum'
import { StakingTableTabs } from './StakingTableTabs'
import Column from 'components/Column'
import { UnstakedTable } from './UnstakedTable'

export const StakingPage = () => {
  const [tab, setTab] = useState(STAKING_TABS.ONGOING)
  return (
    <>
      <StakingTiers />
      <Column>
        <StakingTableTabs tab={tab} setTab={setTab} />
        {tab === STAKING_TABS.ONGOING && <MyStakingsTable />}
        {tab === STAKING_TABS.UNSTAKED && <UnstakedTable />}
      </Column>
    </>
  )
}
