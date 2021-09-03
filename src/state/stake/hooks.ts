import { Interface } from '@ethersproject/abi'
import { BigNumber, Bytes, utils } from 'ethers'
import { Currency, CurrencyAmount, Token, WETH9 } from '@ixswap1/sdk-core'
import { Pair } from '@ixswap1/v2-sdk'
import { t } from '@lingui/macro'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import JSBI from 'jsbi'
import { StakingStatus, PERIOD } from 'state/stake/reducer'
import { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { DAI, IXS, USDC, USDT, WBTC } from '../../constants/tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/helpers'
import {
  saveStakingStatus,
  increaseAllowance,
  stake,
  getStakings,
  getOneWeekHistoricalPoolSize,
  getOneMonthHistoricalPoolSize,
  getTwoMonthsHistoricalPoolSize,
  getThreeMonthsHistoricalPoolSize,
} from './actions'
import { useIXSStakingContract, useIXSTokenContract, useIXSGovTokenContract } from 'hooks/useContract'
import { IXS_STAKING_V1_ADDRESS_PLAIN, IXS_GOVERNANCE_ADDRESS_PLAIN } from 'constants/addresses'
import stakingPeriodsData, { PeriodsEnum, IStaking } from 'constants/stakingPeriods'

export const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI)

export const STAKING_GENESIS = 1600387200

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

export function useTotalIXsEarned(): CurrencyAmount<Token> | undefined {
  const { chainId } = useActiveWeb3React()
  const ixs = chainId ? IXS[chainId] : undefined
  const stakingInfos = useStakingInfo()

  return useMemo(() => {
    if (!ixs) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedAmount),
        CurrencyAmount.fromRawAmount(ixs, '0')
      ) ?? CurrencyAmount.fromRawAmount(ixs, '0')
    )
  }, [stakingInfos, ixs])
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token | undefined,
  userLiquidityUnstaked: CurrencyAmount<Token> | undefined
): {
  parsedAmount?: CurrencyAmount<Token>
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount<Token> | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.quotient, userLiquidityUnstaked.quotient)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = t`Connect Wallet`
  }
  if (!parsedAmount) {
    error = error ?? t`Enter an amount`
  }

  return {
    parsedAmount,
    error,
  }
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
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  // adjust this when we have staking contracts
  const hasStaking = true

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

  return status
}

export function useStakingState(): AppState['staking'] {
  return useSelector<AppState, AppState['staking']>((state) => state.staking)
}

export function usePoolSizeState(): AppState['stakingPoolSize'] {
  return useSelector<AppState, AppState['stakingPoolSize']>((state) => state.stakingPoolSize)
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
            const stakedIXS = parseInt(utils.formatUnits(result))
            dispatch(getOneWeekHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          case PERIOD.ONE_MONTH: {
            dispatch(getOneMonthHistoricalPoolSize.pending())
            const result = await staking?.oneMonthHistoricalPoolSize()
            const stakedIXS = parseInt(utils.formatUnits(result))
            dispatch(getOneMonthHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          case PERIOD.TWO_MONTHS: {
            dispatch(getTwoMonthsHistoricalPoolSize.pending())
            const result = await staking?.twoMonthsHistoricalPoolSize()
            const stakedIXS = parseInt(utils.formatUnits(result))
            dispatch(getTwoMonthsHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          case PERIOD.THREE_MONTHS: {
            dispatch(getThreeMonthsHistoricalPoolSize.pending())
            const result = await staking?.threeMonthsHistoricalPoolSize()
            const stakedIXS = parseInt(utils.formatUnits(result))
            dispatch(getThreeMonthsHistoricalPoolSize.fulfilled({ data: stakedIXS }))
            break
          }
          default: {
            console.error('Wrong period. Nothing has been staked.')
            break
          }
        }
        const result = await staking?.oneWeekHistoricalPoolSize()
        const stakedIXS = parseInt(utils.formatUnits(result, 18))
        console.log('oneWeekHistoricalPoolSize: ', stakedIXS)
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

  return useCallback(
    async (amount: string) => {
      try {
        const stakeAmount = utils.parseUnits(amount, 'ether')
        dispatch(increaseAllowance.pending())
        const allowanceTx = await tokenContract?.increaseAllowance(IXS_STAKING_V1_ADDRESS_PLAIN, stakeAmount)
        dispatch(increaseAllowance.fulfilled({ data: allowanceTx }))
      } catch (error) {
        dispatch(increaseAllowance.rejected({ errorMessage: error }))
      }
    },
    [tokenContract, dispatch]
  )
}

export function useStakeFor(period?: PERIOD) {
  const dispatch = useDispatch<AppDispatch>()
  const staking = useIXSStakingContract()
  const { account } = useActiveWeb3React()

  return useCallback(
    async (amount: string) => {
      try {
        const stakeAmount = utils.parseUnits(amount, 'ether')
        const noData = '0x00'
        dispatch(stake.pending())
        switch (period) {
          case PERIOD.ONE_WEEK: {
            const stakeTx = await staking?.stakeForWeek(account, stakeAmount, noData, { gasLimit: 9999999 })
            dispatch(stake.fulfilled({ data: stakeTx }))
            break
          }
          case PERIOD.ONE_MONTH: {
            const stakeTx = await staking?.stakeForMonth(account, stakeAmount, noData, { gasLimit: 9999999 })
            dispatch(stake.fulfilled({ data: stakeTx }))
            break
          }
          case PERIOD.TWO_MONTHS: {
            const stakeTx = await staking?.stakeForTwoMonths(account, stakeAmount, noData, { gasLimit: 9999999 })
            dispatch(stake.fulfilled({ data: stakeTx }))
            break
          }
          case PERIOD.THREE_MONTHS: {
            const stakeTx = await staking?.stakeForThreeMonths(account, stakeAmount, noData, { gasLimit: 9999999 })
            dispatch(stake.fulfilled({ data: stakeTx }))
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
      const { oneDaySeconds, periods_index, periods_in_seconds, periods_apy, periods_lock_months, periods_in_days } =
        stakingPeriodsData

      const floorTo4Decimals = (num: number) => Math.floor((num + Number.EPSILON) * 10000) / 10000
      const calculateReward = (amount: number, period: PeriodsEnum) => {
        const apy = periods_apy[period]
        const yearReward = floorTo4Decimals((amount * apy) / 100)
        return floorTo4Decimals((yearReward / 360) * periods_in_days[period])
      }
      const getCanUnstake = (lock_months: number, endDateUnix: number, lockedTill: number) => {
        const now = Date.now()
        if (lock_months === 0) {
          return now > endDateUnix * 1000
        }
        return now > lockedTill * 1000
      }
      const getByPeriod = async (period: PeriodsEnum) => {
        const stakedTransactions = await staking?.stakedTransactionsForPeriod(account, periods_index[period])
        if (stakedTransactions.length === 0) return []
        return stakedTransactions.map((data: Array<number>, index: number) => {
          const unixStart = BigNumber.from(data[0]).toNumber()
          const stakeAmount = +utils.formatUnits(data[1], 18)
          const endDateUnix = unixStart + periods_in_seconds[period]
          const lock_months = periods_lock_months[period]
          const lockSeconds = lock_months * 30 * oneDaySeconds
          const lockedTill = unixStart + lockSeconds
          return {
            period,
            startDate: new Date(unixStart * 1000),
            endDate: new Date(endDateUnix * 1000),
            lockedTill: new Date(lockedTill * 1000),
            stakeAmount,
            distributeAmount: stakeAmount,
            apy: periods_apy[period],
            reward: calculateReward(stakeAmount, period),
            lock_months,
            unixStart,
            canUnstake: getCanUnstake(lock_months, endDateUnix, lockedTill),
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
      transactions.sort((a: { unixStart: number }, b: { unixStart: number }) => a.unixStart > b.unixStart)
      console.log('useGetStakings transactions', transactions)
      dispatch(getStakings.fulfilled({ transactions }))
      return transactions
    } catch (error) {
      console.error(`useGetStakings error `, error)
    }
  }, [staking, account, dispatch])
}

export function useUnstakeFromWeek() {
  const staking = useIXSStakingContract()
  const tokenContract = useIXSGovTokenContract()

  return useCallback(
    async (data: IStaking) => {
      try {
        const { originalData, originalIndex } = data
        const stakeAmount = originalData[1]
        const noData = '0x00'

        await tokenContract?.increaseAllowance(staking?.address, stakeAmount)
        // await staking?.estimateGas.unstakeFromWeek(BigNumber.from(originalIndex), noData)
        await staking?.unstakeFromWeek(BigNumber.from(originalIndex), noData, { gasLimit: 9999999 })
      } catch (error) {
        console.error(`useUnstake error`, error)
      }
    },
    [staking, tokenContract]
  )
}

export function useUnstakeFromTwoMonths() {
  const staking = useIXSStakingContract()
  const tokenContract = useIXSGovTokenContract()

  return useCallback(
    async (data: IStaking, amount: number) => {
      try {
        const { originalData, originalIndex } = data
        const stakeAmount = originalData[1]
        const noData = '0x00'
        const partialStakeAmount = BigNumber.from(amount * 10).pow(18)

        await tokenContract?.increaseAllowance(staking?.address, stakeAmount)
        await staking?.unstakeFromTwoMonths(partialStakeAmount, BigNumber.from(originalIndex), noData, {
          gasLimit: 9999999,
        })
      } catch (error) {
        console.error(`useUnstake error`, error)
      }
    },
    [staking, tokenContract]
  )
}
