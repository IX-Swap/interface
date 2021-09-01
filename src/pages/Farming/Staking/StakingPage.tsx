import React from 'react'
import { StakingTiers } from './StakingTiers'
import { MyStakingsTable } from './MyStakingsTable'
import { StakingStatus } from 'state/stake/reducer'

export const StakingPage = ({ stakingStatus }: { stakingStatus: StakingStatus }) => {
  return (
    <>
      <StakingTiers />
      <MyStakingsTable />
    </>
  )
}
