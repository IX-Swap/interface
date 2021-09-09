import IXSStakingModal from 'components/earn/IXSStakingModal'
import React, { useEffect } from 'react'
import { useToggleModal, useCloseModals } from 'state/application/hooks'
import { useStakingState, useIsVestingPaused, useUpdateIXSBalance } from 'state/stake/hooks'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingPage } from './StakingPage'
import { StakingWrapper } from '../styleds'
import { ApplicationModal } from 'state/application/actions'
import { useActiveWeb3React } from 'hooks/web3'
import { useDispatch } from 'react-redux'
import { changeAccount } from 'state/stake/actions'
import { AppDispatch } from 'state'

export const Staking = () => {
  const { IXSBalance, hasStakedSuccessfully, metaMaskAccount } = useStakingState()
  const isVestingPaused = useIsVestingPaused()
  const toggleStakeModal = useToggleModal(ApplicationModal.STAKE_IXS)
  const closeModals = useCloseModals()
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const updateIXSBalance = useUpdateIXSBalance()

  useEffect(() => {
    isVestingPaused()
  }, [isVestingPaused])

  useEffect(() => {
    if (hasStakedSuccessfully) {
      closeModals()
    }
  }, [hasStakedSuccessfully, closeModals])

  useEffect(() => {
    if (!account) {
      dispatch(changeAccount({ newAccount: 'null' }))
    } else if (account !== metaMaskAccount) {
      dispatch(changeAccount({ newAccount: account }))
      updateIXSBalance()
    }
  }, [chainId, account, metaMaskAccount, dispatch])

  function renderStakingPage() {
    if (IXSBalance && parseFloat(IXSBalance) > 0) {
      return <StakingPage />
    } else {
      return <PromoTokenCard />
    }
  }

  return (
    <>
      <IXSStakingModal onDismiss={toggleStakeModal} />
      <StakingWrapper>{renderStakingPage()}</StakingWrapper>
    </>
  )
}
