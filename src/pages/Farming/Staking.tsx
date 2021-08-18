import StakingModal2 from 'components/earn/StakingModal2'
import React, { useState } from 'react'
import { useToggleStakeModal } from 'state/application/hooks'
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
  const [stakingState, setStakingState] = useState(StakingState.NO_STAKE)
  const toggle = useToggleStakeModal()
  return (
    <>
      <StakingModal2 onDismiss={toggle} />
      <StakingWrapper>
        {stakingState !== StakingState.STAKING && <PromoTokenCard stakingState={stakingState} />}
        {stakingState !== StakingState.STAKING && <StakingDescription stakingState={stakingState} />}
        {stakingState === StakingState.STAKING && <TokenCardWithStaking />}
      </StakingWrapper>
    </>
  )
}
