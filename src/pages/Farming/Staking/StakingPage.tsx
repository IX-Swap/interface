import Column from 'components/Column'
import React, { useState } from 'react'
import { Box } from 'rebass'
import { STAKING_TABS } from '../Vesting/enum'
import { MyStakingsTable } from './MyStakingsTable'
import { StakingTableTabs } from './StakingTableTabs'
import { StakingTiers } from './StakingTiers'
import { UnstakedTable } from './UnstakedTable'

export const StakingPage = () => {
  const [tab, setTab] = useState(STAKING_TABS.ONGOING)
  return (
    <>
      <StakingTiers />
      <Box style={{ width: '100%' }}>
        <Column>
          <StakingTableTabs tab={tab} setTab={setTab} />

          {tab === STAKING_TABS.ONGOING && <MyStakingsTable />}
          {tab === STAKING_TABS.UNSTAKED && <UnstakedTable />}
        </Column>
      </Box>
    </>
  )
}
