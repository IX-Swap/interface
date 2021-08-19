import StakingModal2 from 'components/earn/StakingModal2'
import React from 'react'
import { useToggleStakeModal } from 'state/application/hooks'
import { useStakingStatus } from 'state/stake/hooks'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingDescription } from './StakingDescription'
import { StakingWrapper } from './styleds'
import { TokenCardWithStaking } from './TokenCardWithStaking'

export enum StakingStatus {
  CONNECT_WALLET = 'CONNECT_WALLET',
  NO_IXS = 'NO_IXS',
  NO_STAKE = 'NO_STAKE',
  STAKING = 'STAKING',
}

export const Staking = () => {
  const stakingStatus = useStakingStatus()
  const toggle = useToggleStakeModal()
  return (
    <>
      <StakingModal2 onDismiss={toggle} />
      <StakingWrapper>
        {stakingStatus !== StakingStatus.STAKING && <PromoTokenCard stakingStatus={stakingStatus} />}
        {stakingStatus !== StakingStatus.STAKING && <StakingDescription stakingStatus={stakingStatus} />}
        {stakingStatus === StakingStatus.STAKING && <TokenCardWithStaking />}
      </StakingWrapper>
    </>
  )
}
