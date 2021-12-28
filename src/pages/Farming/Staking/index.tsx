import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { useCloseModals } from 'state/application/hooks'
import { changeAccount } from 'state/stake/actions'
import {
  useGetPayouts,
  useGetStakings,
  useGetVestedRewards,
  useIsStakingPaused,
  useStakingState,
  useStakingStatus,
} from 'state/stake/hooks'
import { StakingStatus } from 'state/stake/reducer'
import { useUnstakingState } from 'state/stake/unstake/hooks'
import { StakingWrapper } from '../styleds'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingPage } from './StakingPage'

export const Staking = () => {
  const { hasStakedSuccessfully, metaMaskAccount } = useStakingState()
  const { hasUnstakedSuccessfully } = useUnstakingState()
  const isStakingPaused = useIsStakingPaused()
  const closeModals = useCloseModals()
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const getStakings = useGetStakings()
  const getRewards = useGetVestedRewards()
  const getPayouts = useGetPayouts()
  const status = useStakingStatus()
  useEffect(() => {
    getRewards()
  }, [getRewards, hasStakedSuccessfully, hasUnstakedSuccessfully])

  useEffect(() => {
    getStakings()
  }, [getStakings])

  useEffect(() => {
    const checkStakings = () => {
      if (hasStakedSuccessfully || hasUnstakedSuccessfully) {
        getStakings()
      }
    }
    checkStakings()
    const timer20 = setTimeout(() => {
      checkStakings()
    }, 20000)
    const timer30 = setTimeout(() => {
      checkStakings()
    }, 30000)
    return () => {
      clearTimeout(timer20)
      clearTimeout(timer30)
    }
  }, [getStakings, hasStakedSuccessfully, hasUnstakedSuccessfully])

  useEffect(() => {
    getPayouts()
  }, [getPayouts, hasStakedSuccessfully, hasUnstakedSuccessfully])

  useEffect(() => {
    isStakingPaused()
  }, [isStakingPaused])

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
    }
  }, [chainId, account, metaMaskAccount, dispatch])

  function renderStakingPage() {
    if (status !== StakingStatus.CONNECT_WALLET && status !== StakingStatus.NO_IXS) {
      return <StakingPage />
    } else {
      return <PromoTokenCard stakingStatus={status} />
    }
  }

  return (
    <>
      <StakingWrapper>{renderStakingPage()}</StakingWrapper>
    </>
  )
}
