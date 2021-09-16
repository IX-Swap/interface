import { Interface } from '@ethersproject/abi'
import { Currency, CurrencyAmount, Token, WETH9 } from '@ixswap1/sdk-core'
import { Pair } from '@ixswap1/v2-sdk'
import { t } from '@lingui/macro'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { IXS_ADDRESS, IXS_STAKING_V1_ADDRESS } from 'constants/addresses'
import stakingPeriodsData, { IStaking, PeriodsEnum } from 'constants/stakingPeriods'
import { BigNumber, utils } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { useIXSGovTokenContract, useIXSStakingContract, useIXSTokenContract } from 'hooks/useContract'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import JSBI from 'jsbi'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { PERIOD, StakingStatus } from 'state/stake/reducer'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useActiveWeb3React } from 'hooks/web3'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { increaseIXSGovAllowance, checkIXSGovAllowance, unstake } from './actions'

export function useUnstakingState(): AppState['unstaking'] {
  return useSelector<AppState, AppState['unstaking']>((state) => state.unstaking)
}

export function useIncreaseIXSGovAllowance() {
  const dispatch = useDispatch<AppDispatch>()
  const tokenContract = useIXSGovTokenContract()
  const { chainId } = useActiveWeb3React()
  const checkAllowance = useCheckIXSGovAllowance()
  return useCallback(
    async (amount: string) => {
      if (!chainId) {
        return
      }
      try {
        const stakeAmount = utils.parseUnits(amount, 'ether')
        dispatch(increaseIXSGovAllowance.pending())
        const stakingAddress = IXS_STAKING_V1_ADDRESS[chainId]
        const allowanceTx = await tokenContract?.increaseAllowance(stakingAddress, stakeAmount)
        const tx = await allowanceTx.wait()
        dispatch(increaseIXSGovAllowance.fulfilled({ data: tx.status }))
        checkAllowance()
      } catch (error) {
        dispatch(increaseIXSGovAllowance.rejected({ errorMessage: error }))
      }
    },
    [tokenContract, dispatch, chainId]
  )
}

export function useCheckIXSGovAllowance() {
  const dispatch = useDispatch<AppDispatch>()
  const IXSGovContract = useIXSGovTokenContract()
  const { account, chainId } = useActiveWeb3React()
  return useCallback(async () => {
    if (!account || !chainId) {
      return
    }
    try {
      const stakingAddress = IXS_STAKING_V1_ADDRESS[chainId]
      const allowance = await IXSGovContract?.allowance(account, stakingAddress)
      const allowanceAmount = parseFloat(utils.formatUnits(allowance))
      dispatch(checkIXSGovAllowance({ allowanceAmount }))
    } catch (error) {
      console.error('check allowance error: ', error)
    }
  }, [IXSGovContract, account, chainId, dispatch])
}

export function useUnstakeFrom(period?: PeriodsEnum) {
  const dispatch = useDispatch<AppDispatch>()
  const contract = useIXSStakingContract()
  const { account } = useActiveWeb3React()
  const noData = '0x00'

  return useCallback(
    async (stake: IStaking, amount?: number) => {
      let unstakeTx
      try {
        const { originalIndex } = stake
        const stakeIndex = BigNumber.from(originalIndex)
        dispatch(unstake.pending())
        switch (period) {
          case PeriodsEnum.WEEK: {
            const estimatedGas = await contract?.estimateGas.unstakeFromWeek(stakeIndex, noData)
            if (!estimatedGas) {
              dispatch(unstake.rejected({ errorMessage: 'cannot estimate gas' }))
              break
            }
            unstakeTx = await contract?.unstakeFromWeek(stakeIndex, noData, {
              gasLimit: calculateGasMargin(estimatedGas),
            })
            break
          }
          case PeriodsEnum.MONTH: {
            const estimatedGas = await contract?.estimateGas.unstakeFromMonth(stakeIndex, noData)
            if (!estimatedGas) {
              dispatch(unstake.rejected({ errorMessage: 'cannot estimate gas' }))
              break
            }
            unstakeTx = await contract?.unstakeFromMonth(stakeIndex, noData, {
              gasLimit: calculateGasMargin(estimatedGas),
            })
            break
          }
          case PeriodsEnum.TWO_MONTHS: {
            if (!amount) return
            const stakeAmount = utils.parseUnits(amount.toString(), 'ether')
            const estimatedGas = await contract?.estimateGas.unstakeFromTwoMonths(stakeAmount, stakeIndex, noData)
            if (!estimatedGas) {
              dispatch(unstake.rejected({ errorMessage: 'cannot estimate gas' }))
              return
            }
            unstakeTx = await contract?.unstakeFromTwoMonths(stakeAmount, stakeIndex, noData, {
              gasLimit: calculateGasMargin(estimatedGas),
            })
            break
          }
          case PeriodsEnum.THREE_MONTHS: {
            if (!amount) return
            const stakeAmount = utils.parseUnits(amount.toString(), 'ether')
            const estimatedGas = await contract?.estimateGas.unstakeFromThreeMonths(stakeAmount, stakeIndex, noData)
            if (!estimatedGas) {
              dispatch(unstake.rejected({ errorMessage: 'cannot estimate gas' }))
              return
            }
            unstakeTx = await contract?.unstakeFromThreeMonths(stakeAmount, stakeIndex, noData, {
              gasLimit: calculateGasMargin(estimatedGas),
            })
            break
          }
          default: {
            console.error('Wrong period. Nothing has been unstaked.')
            break
          }
        }
        const result = await unstakeTx.wait()
        dispatch(unstake.fulfilled({ txStatus: result.status }))
      } catch (error) {
        dispatch(unstake.rejected({ errorMessage: error }))
      }
    },
    [contract, account, dispatch, period]
  )
}

export function useUnstakeFromWeek() {
  // works the same for 1 month
  const staking = useIXSStakingContract()

  return useCallback(
    async (data: IStaking) => {
      try {
        const { originalIndex } = data
        const noData = '0x00'
        const stakeIndex = BigNumber.from(originalIndex)

        const estimatedGas = await staking?.estimateGas.unstakeFromWeek(stakeIndex, noData)
        if (!estimatedGas) {
          // todo dispatch error!
          return
        }
        await staking?.unstakeFromWeek(stakeIndex, noData, { gasLimit: calculateGasMargin(estimatedGas) })
      } catch (error) {
        console.error(`useUnstake error`, error)
      }
    },
    [staking]
  )
}

export function useUnstakeFromTwoMonths() {
  // works the same for 3 months
  const staking = useIXSStakingContract()

  return useCallback(
    async (data: IStaking, amount: number) => {
      try {
        const noData = '0x00'
        const stakeIndex = BigNumber.from(data.originalIndex)
        const partialStakeAmount = utils.parseUnits(amount.toString(), 'ether')
        const estimatedGas = await staking?.estimateGas.unstakeFromTwoMonths(partialStakeAmount, stakeIndex, noData)

        if (!estimatedGas) {
          // todo dispatch error!
          return
        }
        await staking?.unstakeFromTwoMonths(partialStakeAmount, stakeIndex, noData, {
          gasLimit: calculateGasMargin(estimatedGas),
        })
      } catch (error) {
        console.error(`useUnstake error`, error)
      }
    },
    [staking]
  )
}
