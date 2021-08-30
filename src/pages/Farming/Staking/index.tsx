import IXSStakingModal from 'components/earn/IXSStakingModal'
import React from 'react'
import { useToggleStakeModal } from 'state/application/hooks'
import { useStakingStatus } from 'state/stake/hooks'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingPage } from './StakingPage'
import { StakingWrapper } from '../styleds'
import { TokenCardWithStaking } from './TokenCardWithStaking'
import { StakingStatus } from 'state/stake/reducer'

export const Staking = () => {
  const stakingStatus = useStakingStatus()
  const toggle = useToggleStakeModal()

  function renderStakingPage(stakingStatus: StakingStatus) {
    switch (stakingStatus) {
      case StakingStatus.CONNECT_WALLET:
      case StakingStatus.NO_IXS:
        return <PromoTokenCard stakingStatus={stakingStatus} />
      case StakingStatus.NO_STAKE:
      case StakingStatus.STAKING:
        // return <StakingPage stakingStatus={stakingStatus} />
        return <TokenCardWithStaking />
      default:
        return 'foo'
    }
  }

  return (
    <>
      <IXSStakingModal onDismiss={toggle} />
      <StakingWrapper>{renderStakingPage(stakingStatus)}</StakingWrapper>
    </>
  )
}
