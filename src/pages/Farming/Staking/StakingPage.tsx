import Column from 'components/Column'
import React, { useState } from 'react'
import { Box } from 'rebass'
import { STAKING_TABS } from '../Vesting/enum'
import { GasWarning } from './GasWarning'
import { MyStakingsTable } from './MyStakingsTable'
import { StakingTableTabs } from './StakingTableTabs'
import { StakingTiers } from './StakingTiers'
import { UnstakedTable } from './UnstakedTable'

export const StakingPage = () => {
  const [tab, setTab] = useState(STAKING_TABS.ONGOING)
  return (
    <>
      <Column style={{ gap: '20px' }}>
        <GasWarning />
        <StakingTiers />
      </Column>
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
