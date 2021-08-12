import React, { useState } from 'react'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingDescription } from './StakingDescription'
import { StakingWrapper } from './styleds'
import { TokenCardWithStaking } from './TokenCardWithStaking'

export enum StakingState {
  CONNECT_WALLET = 'CONNECT_WALLET',
  NO_IXS = 'NO_IXS',
  NO_STAKE = 'NO_STAKE',
  STAKING = 'STAKING',
}

export const Staking = () => {
  const [stakingState, setStakingState] = useState(StakingState.STAKING)
  return (
    <StakingWrapper>
      {stakingState !== StakingState.STAKING && <PromoTokenCard />}
      {stakingState !== StakingState.STAKING && <StakingDescription stakingState={stakingState} />}
      {stakingState === StakingState.STAKING && <TokenCardWithStaking />}
    </StakingWrapper>
  )
}
