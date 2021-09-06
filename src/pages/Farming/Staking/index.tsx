import IXSStakingModal from 'components/earn/IXSStakingModal'
import React, { useEffect } from 'react'
import { useToggleStakeModal } from 'state/application/hooks'
import { useStakingStatus, useIsVestingPaused } from 'state/stake/hooks'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingPage } from './StakingPage'
import { StakingWrapper } from '../styleds'
import { StakingStatus } from 'state/stake/reducer'

export const Staking = () => {
  const stakingStatus = useStakingStatus()
  const toggle = useToggleStakeModal()
  const isVestingPaused = useIsVestingPaused()

  useEffect(() => {
    isVestingPaused()
  }, [isVestingPaused])

  function renderStakingPage(stakingStatus: StakingStatus) {
    switch (stakingStatus) {
      case StakingStatus.CONNECT_WALLET:
      case StakingStatus.NO_IXS:
        return <PromoTokenCard stakingStatus={stakingStatus} />
      case StakingStatus.NO_STAKE:
      case StakingStatus.STAKING:
        return <StakingPage />
      default:
        return 'Something went wrong'
    }
  }

  return (
    <>
      <IXSStakingModal onDismiss={toggle} />
      <StakingWrapper>{renderStakingPage(stakingStatus)}</StakingWrapper>
    </>
  )
}
