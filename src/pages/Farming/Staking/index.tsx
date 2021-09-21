import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
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
  useIsVestingPaused,
  useStakingState,
  useUpdateIXSBalance,
} from 'state/stake/hooks'
import { useUnstakingState } from 'state/stake/unstake/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { StakingWrapper } from '../styleds'
import { PromoTokenCard } from './PromoTokenCard'
import { StakingPage } from './StakingPage'

export const Staking = () => {
  const { IXSBalance, hasStakedSuccessfully, metaMaskAccount, stakings } = useStakingState()
  const { hasUnstakedSuccessfully } = useUnstakingState()
  const isVestingPaused = useIsVestingPaused()
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
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
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
      <StakingWrapper>{renderStakingPage()}</StakingWrapper>
    </>
  )
}
