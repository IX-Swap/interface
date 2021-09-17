import IXSStakingModal from 'components/earn/IXSStakingModal'
import React, { useEffect } from 'react'
import { useToggleModal, useCloseModals } from 'state/application/hooks'
import {
  useStakingState,
  useIsVestingPaused,
  useUpdateIXSBalance,
  useGetStakings,
  useGetVestedRewards,
  useGetPayouts,
} from 'state/stake/hooks'
import { useUnstakingState } from 'state/stake/unstake/hooks'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingPage } from './StakingPage'
import { StakingWrapper } from '../styleds'
import { ApplicationModal } from 'state/application/actions'
import { useActiveWeb3React } from 'hooks/web3'
import { useDispatch } from 'react-redux'
import { changeAccount } from 'state/stake/actions'
import { AppDispatch } from 'state'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { IXS_ADDRESS } from 'constants/addresses'

export const Staking = () => {
  const { IXSBalance, hasStakedSuccessfully, metaMaskAccount, stakings } = useStakingState()
  const { hasUnstakedSuccessfully } = useUnstakingState()
  const isVestingPaused = useIsVestingPaused()
  const toggleStakeModal = useToggleModal(ApplicationModal.STAKE_IXS)
  const closeModals = useCloseModals()
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const updateIXSBalance = useUpdateIXSBalance()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const getStakings = useGetStakings()
  const getRewards = useGetVestedRewards()
  const getPayouts = useGetPayouts()

  useEffect(() => {
    getRewards()
  }, [getRewards, hasStakedSuccessfully, hasUnstakedSuccessfully])

  useEffect(() => {
    getStakings()
  }, [getStakings])

  useEffect(() => {
    if (hasStakedSuccessfully || hasUnstakedSuccessfully) {
      getStakings()
      updateIXSBalance()
    }
  }, [getStakings, hasStakedSuccessfully, hasUnstakedSuccessfully])

  useEffect(() => {
    getPayouts()
  }, [getPayouts, hasStakedSuccessfully, hasUnstakedSuccessfully])

  useEffect(() => {
    if (balance) {
      updateIXSBalance()
    }
  }, [balance])

  useEffect(() => {
    isVestingPaused()
  }, [isVestingPaused])

  useEffect(() => {
    if (hasStakedSuccessfully || hasUnstakedSuccessfully) {
      closeModals()
    }
  }, [hasStakedSuccessfully, hasUnstakedSuccessfully, closeModals])

  useEffect(() => {
    if (!account) {
      dispatch(changeAccount({ newAccount: 'null' }))
    } else if (account !== metaMaskAccount) {
      dispatch(changeAccount({ newAccount: account }))
      updateIXSBalance()
    }
  }, [chainId, account, metaMaskAccount, dispatch])

  function renderStakingPage() {
    if ((IXSBalance && parseFloat(IXSBalance) > 0) || stakings.length !== 0) {
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
