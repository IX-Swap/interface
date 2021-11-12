import { Interface } from '@ethersproject/abi'
import { Currency, CurrencyAmount, Token, WETH9 } from '@ixswap1/sdk-core'
import { Pair } from '@ixswap1/v2-sdk'
import { t } from '@lingui/macro'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { STAKING_CONTRACT_KOVAN } from 'config'
import { IXS_STAKING_V1_ADDRESS } from 'constants/addresses'
import stakingPeriodsData, { IStaking, PeriodsEnum } from 'constants/stakingPeriods'
import { BigNumber, utils } from 'ethers'
import { useCurrency } from 'hooks/Tokens'
import { useIXSStakingContract, useIXSTokenContract } from 'hooks/useContract'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import useIXSCurrency from 'hooks/useIXSCurrency'
import JSBI from 'jsbi'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { PERIOD, StakingStatus } from 'state/stake/reducer'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { DAI, IXS, USDC, USDT, WBTC } from '../../constants/tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import { calculateGasMargin } from '../../utils/calculateGasMargin'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/helpers'
import {
  checkAllowance,
  getAvailableClaim,
  getIsStakingPaused,
  getOneMonthHistoricalPoolSize,
  getOneWeekHistoricalPoolSize,
  getPayouts,
  getRewards,
  getStakings,
  getThreeMonthsHistoricalPoolSize,
  getTwoMonthsHistoricalPoolSize,
  increaseAllowance,
  saveStakingStatus,
  setTransactionInProgress,
  setTypedValue,
  stake,
  updateIXSBalance,
} from './actions'
import { claimsAdapter, payoutsAdapter, rewardsAdapter, stakingsAdapter } from './utils'

export const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI)

export const REWARDS_DURATION_DAYS = 60

export const STAKING_REWARDS_INFO: {
  [chainId: number]: {
    tokens: [Token, Token]
    stakingRewardAddress: string
  }[]
} = {
  [1]: [
    {
      tokens: [WETH9[1], DAI],
      stakingRewardAddress: '0xa1484C3aa22a66C62b77E0AE78E15258bd0cB711',
    },
    {
      tokens: [WETH9[1], USDC],
      stakingRewardAddress: '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b',
    },
    {
      tokens: [WETH9[1], USDT],
      stakingRewardAddress: '0x6C3e4cb2E96B01F4b866965A91ed4437839A121a',
    },
    {
      tokens: [WETH9[1], WBTC],
      stakingRewardAddress: '0xCA35e32e7926b96A9988f61d510E038108d8068e',
    },
  ],
}

export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  stakedAmount: CurrencyAmount<Token>
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: CurrencyAmount<Token>
  // the total amount of token staked in the contract
  totalStakedAmount: CurrencyAmount<Token>
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: CurrencyAmount<Token>
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: CurrencyAmount<Token>
  // when the period ends
  periodFinish: Date | undefined
  // if pool is active
  active: boolean
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: CurrencyAmount<Token>,
    totalStakedAmount: CurrencyAmount<Token>,
    totalRewardRate: CurrencyAmount<Token>
  ) => CurrencyAmount<Token>
}

// gets the staking info from the network for the active chain id
export function useStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()
  // detect if staking is ended
  const currentBlockTimestamp = useCurrentBlockTimestamp()

  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter((stakingRewardInfo) =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? false
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const ixs = chainId ? IXS[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !ixs) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(
          CurrencyAmount.fromRawAmount(tokens[0], '0'),
          CurrencyAmount.fromRawAmount(tokens[1], '0')
        )

        // check for account, if no account set to 0

        const stakedAmount = CurrencyAmount.fromRawAmount(
          dummyPair.liquidityToken,
          JSBI.BigInt(balanceState?.result?.[0] ?? 0)
        )
        const totalStakedAmount = CurrencyAmount.fromRawAmount(
          dummyPair.liquidityToken,
          JSBI.BigInt(totalSupplyState.result?.[0])
        )
        const totalRewardRate = CurrencyAmount.fromRawAmount(ixs, JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: CurrencyAmount<Token>,
          totalStakedAmount: CurrencyAmount<Token>,
          totalRewardRate: CurrencyAmount<Token>
        ): CurrencyAmount<Token> => {
          return CurrencyAmount.fromRawAmount(
            ixs,
            JSBI.greaterThan(totalStakedAmount.quotient, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.quotient, stakedAmount.quotient), totalStakedAmount.quotient)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishSeconds = periodFinishState.result?.[0]?.toNumber()
        const periodFinishMs = periodFinishSeconds * 1000

        // compare period end timestamp vs current block timestamp (in seconds)
        const active =
          periodFinishSeconds && currentBlockTimestamp ? periodFinishSeconds > currentBlockTimestamp.toNumber() : true

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: CurrencyAmount.fromRawAmount(ixs, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate,
          active,
        })
      }
      return memo
    }, [])
  }, [
    balances,
    chainId,
    currentBlockTimestamp,
    earnedAmounts,
    info,
    periodFinishes,
    rewardRates,
    rewardsAddresses,
    totalSupplies,
    ixs,
  ])
}

// based on typed value
export function useDerivedIXSStakeInfo({ typedValue, currencyId }: { typedValue: string; currencyId?: string }): {
  parsedAmount?: CurrencyAmount<Currency>
  error?: string
} {
  const { account } = useActiveWeb3React()
  const currency = useCurrency(currencyId)
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const parsedInput = tryParseAmount(typedValue, currency)
  const maxAmountInput = maxAmountSpend(balance)
  const parsedAmount = parsedInput && JSBI.greaterThan(parsedInput.quotient, JSBI.BigInt('0')) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = t`Connect Wallet`
  }
  if (!parsedAmount) {
    error = error ?? t`Enter an amount`
  }
  if (parsedAmount && JSBI.greaterThan(parsedAmount.quotient, maxAmountInput?.quotient ?? JSBI.BigInt('0'))) {
    error = error ?? t`Amount exceeds balance`
  }
  return {
    parsedAmount,
    error,
  }
}

export function useStakingStatus() {
  const { status } = useStakingState()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const currency = useIXSCurrency()
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  // adjust this when we have staking contracts
  const hasStaking = true
  const updateIXSBalance = useUpdateIXSBalance()

  useEffect(() => {
    if (!account) {
      dispatch(saveStakingStatus({ status: StakingStatus.CONNECT_WALLET }))
    } else if (!balance?.greaterThan('0')) {
      dispatch(saveStakingStatus({ status: StakingStatus.NO_IXS }))
    } else if (hasStaking) {
      dispatch(saveStakingStatus({ status: StakingStatus.STAKING }))
    } else {
      dispatch(saveStakingStatus({ status: StakingStatus.NO_STAKE }))
    }
  }, [balance, account, dispatch, hasStaking])

  useEffect(() => {
    updateIXSBalance()
  }, [account, balance])

  return status
}

export function useStakingState(): AppState['staking'] {
  return useSelector<AppState, AppState['staking']>((state) => state.staking)
}

export function usePoolSizeState(): AppState['stakingPoolSize'] {
  return useSelector<AppState, AppState['stakingPoolSize']>((state) => state.stakingPoolSize)
}

export function useUpdateIXSBalance() {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useActiveWeb3React()
  const currency = useIXSCurrency()
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  return useCallback(async () => {
    const maxAmountInput = maxAmountSpend(balance)
    const IXSAmount = maxAmountInput ? maxAmountInput?.toFixed(3) : '0'
    dispatch(updateIXSBalance({ IXSAmount }))
  }, [dispatch, balance])
}

export function useFetchHistoricalPoolSize() {
  const dispatch = useDispatch<AppDispatch>()
  const staking = useIXSStakingContract()
  return useCallback(
    async (period?: PERIOD) => {
      try {
        switch (period) {
          case PERIOD.ONE_WEEK: {
            dispatch(getOneWeekHistoricalPoolSize.pending())
            const result = await staking?.oneWeekHistoricalPoolSize()
            const stakedIXS = utils.formatUnits(result)
            dispatch(getOneWeekHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          case PERIOD.ONE_MONTH: {
            dispatch(getOneMonthHistoricalPoolSize.pending())
            const result = await staking?.oneMonthHistoricalPoolSize()
            const stakedIXS = utils.formatUnits(result)
            dispatch(getOneMonthHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          case PERIOD.TWO_MONTHS: {
            dispatch(getTwoMonthsHistoricalPoolSize.pending())
            const result = await staking?.twoMonthsHistoricalPoolSize()
            const stakedIXS = utils.formatUnits(result)
            dispatch(getTwoMonthsHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          case PERIOD.THREE_MONTHS: {
            dispatch(getThreeMonthsHistoricalPoolSize.pending())
            const result = await staking?.threeMonthsHistoricalPoolSize()
            const stakedIXS = utils.formatUnits(result)
            dispatch(getThreeMonthsHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          default: {
            console.error('Wrong period. Nothing has been staked.')
            break
          }
        }
      } catch (error) {
        console.error(`IxsReturningStakeBankPostIdoV1: `, error)
      }
    },
    [staking, dispatch]
  )
}

export function useIncreaseAllowance() {
  const dispatch = useDispatch<AppDispatch>()
  const tokenContract = useIXSTokenContract()
  const { chainId } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const IXSCurrency = useIXSCurrency()
  const { typedValue } = useStakingState()
  const fetchCheckAllowance = useCheckAllowance()

  return useCallback(
    async (amount: string) => {
      if (!chainId) {
        return
      }
      try {
        const stakeAmount = utils.parseUnits(amount, 'ether')
        dispatch(increaseAllowance.pending())
        const stakingAddress = IXS_STAKING_V1_ADDRESS[chainId]
        const allowanceTx = await tokenContract?.increaseAllowance(stakingAddress, stakeAmount)
        await allowanceTx.wait()
        const newAllowance = await fetchCheckAllowance()
        const nodeNotUpdated = (newAllowance || newAllowance === 0) && parseFloat(typedValue) > newAllowance
        if (nodeNotUpdated) {
          dispatch(checkAllowance({ allowanceAmount: parseFloat(typedValue) }))
        }
        dispatch(increaseAllowance.fulfilled({ data: allowanceTx?.hash }))
        addTransaction(allowanceTx, {
          summary: t`Approve ${amount} ${IXSCurrency?.symbol}`,
        })
      } catch (error) {
        dispatch(increaseAllowance.rejected({ errorMessage: error }))
      }
    },
    [tokenContract, dispatch, chainId, typedValue, fetchCheckAllowance]
  )
}

export function useCheckAllowance() {
  const dispatch = useDispatch<AppDispatch>()
  const IXSContract = useIXSTokenContract()
  const { account, chainId } = useActiveWeb3React()
  return useCallback(async () => {
    if (!account || !chainId) {
      return
    }
    try {
      const stakingAddress = IXS_STAKING_V1_ADDRESS[chainId]
      const allowance = await IXSContract?.allowance(account, stakingAddress)
      const allowanceAmount = parseFloat(utils.formatUnits(allowance))
      dispatch(checkAllowance({ allowanceAmount }))
      return allowanceAmount
    } catch (error) {
      dispatch(checkAllowance({ allowanceAmount: 0 }))
      return null
    }
  }, [IXSContract, account, chainId, dispatch])
}

export function useStakeFor(period?: PERIOD) {
  const dispatch = useDispatch<AppDispatch>()
  const staking = useIXSStakingContract()
  const { account } = useActiveWeb3React()
  const updateIXSBalance = useUpdateIXSBalance()
  const addTransaction = useTransactionAdder()
  const IXSCurrency = useIXSCurrency()
  return useCallback(
    async (amount: string) => {
      try {
        const stakeAmount = utils.parseUnits(amount, 'ether')
        const noData = '0x00'
        dispatch(stake.pending())
        switch (period) {
          case PERIOD.ONE_WEEK: {
            // const estimatedGas = await staking?.estimateGas.stakeForWeek(account, stakeAmount, noData)
            const estimatedGas = 900000

            if (!estimatedGas) {
              dispatch(stake.rejected({ errorMessage: 'cannot estimate gas' }))
              break
            }
            const stakeTx = await staking?.stakeForWeek(account, stakeAmount, noData, {
              gasLimit: estimatedGas,
            })
            const tx = await stakeTx.wait()
            dispatch(stake.fulfilled({ txStatus: tx.status }))
            updateIXSBalance()
            addTransaction(stakeTx, {
              summary: t`Staked ${amount} ${IXSCurrency?.symbol} for ${PERIOD.ONE_WEEK}`,
            })
            break
          }
          case PERIOD.ONE_MONTH: {
            // const estimatedGas = await staking?.estimateGas.stakeForMonth(account, stakeAmount, noData)
            const estimatedGas = 900000

            if (!estimatedGas) {
              dispatch(stake.rejected({ errorMessage: 'cannot estimate gas' }))
              break
            }
            const stakeTx = await staking?.stakeForMonth(account, stakeAmount, noData, {
              gasLimit: estimatedGas,
            })
            const tx = await stakeTx.wait()
            dispatch(stake.fulfilled({ txStatus: tx.status }))
            updateIXSBalance()
            addTransaction(stakeTx, {
              summary: t`Staked ${amount} ${IXSCurrency?.symbol} for ${PERIOD.ONE_MONTH}`,
            })
            break
          }
          case PERIOD.TWO_MONTHS: {
            // const estimatedGas = await staking?.estimateGas.stakeForTwoMonths(account, stakeAmount, noData)
            const estimatedGas = 900000
            if (!estimatedGas) {
              dispatch(stake.rejected({ errorMessage: 'cannot estimate gas' }))
              break
            }
            const stakeTx = await staking?.stakeForTwoMonths(account, stakeAmount, noData, {
              gasLimit: 900000,
            })
            const tx = await stakeTx.wait()
            dispatch(stake.fulfilled({ txStatus: tx.status }))
            updateIXSBalance()
            addTransaction(stakeTx, {
              summary: t`Staked ${amount} ${IXSCurrency?.symbol} for ${PERIOD.TWO_MONTHS}`,
            })
            break
          }
          case PERIOD.THREE_MONTHS: {
            // const estimatedGas = await staking?.estimateGas.stakeForThreeMonths(account, stakeAmount, noData)
            const estimatedGas = 900000

            if (!estimatedGas) {
              dispatch(stake.rejected({ errorMessage: 'cannot estimate gas' }))
              updateIXSBalance()
              break
            }
            const stakeTx = await staking?.stakeForThreeMonths(account, stakeAmount, noData, {
              gasLimit: estimatedGas,
            })
            const tx = await stakeTx.wait()
            dispatch(stake.fulfilled({ txStatus: tx.status }))
            updateIXSBalance()
            addTransaction(stakeTx, {
              summary: t`Staked ${amount} ${IXSCurrency?.symbol} for ${PERIOD.THREE_MONTHS}`,
            })
            break
          }
          default: {
            console.error('Wrong period. Nothing has been staked.')
            break
          }
        }
      } catch (error) {
        dispatch(stake.rejected({ errorMessage: error }))
      }
    },
    [staking, account, dispatch, period]
  )
}

export function useGetStakings() {
  const dispatch = useDispatch<AppDispatch>()
  const staking = useIXSStakingContract()
  const { account } = useActiveWeb3React()

  return useCallback(async () => {
    try {
      const {
        periodsIndex,
        periodsApy,
        periodsLockMonths,
        periodsInDays,
        periodsInSeconds,
        testPeriodsLockSeconds,
        testPeriodsMaturitySeconds,
        SECONDS_IN_DAY,
      } = stakingPeriodsData

      const floorTo4Decimals = (num: number) => Math.floor((num + Number.EPSILON) * 10000) / 10000
      const calculateReward = (
        amount: number,
        period: PeriodsEnum,
        startDateUnix: number,
        lockedUntilUnix: number,
        endDateUnix: number
      ) => {
        // passedMaturity = амоунт* (APY in %)*days passed/365
        // !passedMaturity && passedLockIn = аммаунт* Пенальти Йелд (5%) * Сколько прошло со стейкинга в секундах / 365 дней в секундах
        const now = new Date().getTime() / 1000
        const passedMaturity = now > endDateUnix
        const passedLockIn = now > lockedUntilUnix
        const yearDays = 365
        let reward
        if (!passedMaturity && passedLockIn) {
          const yearSeconds = yearDays * SECONDS_IN_DAY
          const secondsPassed = now - startDateUnix
          const penalty = 5 / 100
          reward = floorTo4Decimals((amount * penalty * secondsPassed) / yearSeconds)
        } else {
          const apyPercent = periodsApy[period] / 100
          const daysPassed = periodsInDays[period]
          reward = floorTo4Decimals((amount * apyPercent * daysPassed) / yearDays)
        }
        return reward
      }
      const getCanUnstake = (lock_months: number, endDateUnix: number, lockedTill: number) => {
        const now = Date.now()
        if (lock_months === 0) {
          return now > endDateUnix * 1000
        }
        return now > lockedTill * 1000
      }
      const getByPeriod = async (period: PeriodsEnum) => {
        const stakedTransactions = await staking?.stakedTransactionsForPeriod(account, periodsIndex[period])
        if (stakedTransactions.length === 0) return []
        return stakedTransactions.map((data: Array<number>, index: number) => {
          const startDateUnix = BigNumber.from(data[0]).toNumber()
          const stakeAmount = +utils.formatUnits(data[1], 18)
          const lockMonths = periodsLockMonths[period]

          let endDateUnix, lockedTillUnix
          if (STAKING_CONTRACT_KOVAN === '0x24108fD7fa1897a76488fe8B39fDBc7715916294') {
            endDateUnix = startDateUnix + testPeriodsMaturitySeconds[period]
            lockedTillUnix = startDateUnix + testPeriodsLockSeconds[period]
          } else {
            endDateUnix = startDateUnix + periodsInSeconds[period]
            const lockSeconds = lockMonths * 30 * SECONDS_IN_DAY
            lockedTillUnix = startDateUnix + lockSeconds
          }

          return {
            period,
            stakeAmount,
            distributeAmount: stakeAmount,
            apy: periodsApy[period],
            reward: calculateReward(stakeAmount, period, startDateUnix, endDateUnix, lockedTillUnix),
            lockMonths,
            startDateUnix,
            endDateUnix,
            lockedTillUnix,
            canUnstake: getCanUnstake(lockMonths, endDateUnix, lockedTillUnix),
            originalData: data,
            originalIndex: index,
          }
        })
      }
      dispatch(getStakings.pending())
      const transactionsArrays = await Promise.all(
        Object.values(PeriodsEnum).map((period: PeriodsEnum) => getByPeriod(period))
      )
      const transactions = transactionsArrays.reduce((accum, item) => {
        accum.push(...item)
        return accum
      }, [])
      transactions.sort((a: IStaking, b: IStaking) => {
        if (a.startDateUnix > b.startDateUnix) {
          return -1
        }
        if (a.startDateUnix < b.startDateUnix) {
          return 1
        }
        return 0
      })
      const filteredTransactions = transactions.filter((trans: IStaking) => {
        return trans.stakeAmount !== 0
      })
      dispatch(getStakings.fulfilled({ transactions: stakingsAdapter(filteredTransactions) }))
      return filteredTransactions
    } catch (error) {
      console.error(`useGetStakings error `, error)
    }
  }, [staking, account, dispatch])
}

export function useSetTypedValue() {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (typed: string) => {
      dispatch(setTypedValue({ typed }))
    },
    [dispatch]
  )
}

export function useGetVestedRewards() {
  const staking = useIXSStakingContract()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    try {
      dispatch(getRewards.pending())
      const rewards = await staking?.vestedTransactions(account)
      const transactions = rewardsAdapter(rewards)

      dispatch(getRewards.fulfilled({ transactions }))
      try {
        dispatch(getAvailableClaim.pending())
        const claims: any[] = await Promise.all(
          transactions.map(async (reward, index): Promise<any> => {
            return await staking?.availableClaim(account, index)
          })
        )

        dispatch(getAvailableClaim.fulfilled({ transactions: claimsAdapter(claims) }))
      } catch (e) {
        dispatch(getAvailableClaim.rejected({ errorMessage: e?.message }))
        console.error(`error getting available claims`, e?.message)
      }
    } catch (error) {
      dispatch(getRewards.rejected({ errorMessage: error?.message }))
      console.error(`error getting rewards`, error)
    }
  }, [staking, account, dispatch])
}

export function useGetPayouts() {
  const staking = useIXSStakingContract()
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    try {
      dispatch(getPayouts.pending())
      const payouts = await staking?.payouts(account)

      dispatch(
        getPayouts.fulfilled({ transactions: payouts.map((pay: [BigNumber, BigNumber][]) => payoutsAdapter(pay)) })
      )
    } catch (error) {
      dispatch(getPayouts.rejected({ errorMessage: error?.message }))
      console.error(`error getting payouts`, error)
    }
  }, [staking, account, dispatch])
}

export function useClaimRewards() {
  const staking = useIXSStakingContract()
  const { account } = useActiveWeb3React()
  const { claims } = useStakingState()
  const getRewards = useGetVestedRewards()
  const getPayouts = useGetPayouts()
  const currency = useIXSCurrency()
  const dispatch = useDispatch<AppDispatch>()

  const addTransaction = useTransactionAdder()
  return useCallback(
    async (index) => {
      try {
        dispatch(setTransactionInProgress({ value: true }))
        const availableClaim = claims[index]
        if (!availableClaim) {
          return
        }
        const transaction = await staking?.claimFor(account, BigNumber.from(availableClaim), index)
        const formattedAmount = currency
          ? formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, availableClaim), currency?.decimals ?? 18)
          : ''
        addTransaction(transaction, {
          summary: t`Claim rewards ${formattedAmount}`,
        })
        await transaction.wait()
        getRewards()
        getPayouts()
        dispatch(setTransactionInProgress({ value: false }))
      } catch (error) {
        dispatch(setTransactionInProgress({ value: false }))
        console.error(`error could not claim reward`, error)
      }
    },
    [staking, account, claims, getPayouts, getRewards, addTransaction, currency, dispatch]
  )
}

export function useIsStakingPaused() {
  const staking = useIXSStakingContract()
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async () => {
    try {
      const isPaused = await staking?.paused()

      dispatch(getIsStakingPaused({ isPaused }))
    } catch (error) {
      console.error(`isStakingPaused error `, error)
    }
  }, [staking, dispatch])
}
