import React from 'react'
import { VestingWrapper } from './styleds'
import { VestingInfo } from './VestingInfo'
import { VestingTable } from './VestingTable'

export const Vesting = () => {
  return (
    <VestingWrapper>
      <VestingInfo />
      <VestingTable />
    </VestingWrapper>
  )
}
