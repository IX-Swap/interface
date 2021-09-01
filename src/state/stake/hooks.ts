import { Interface } from '@ethersproject/abi'
import { Currency, CurrencyAmount, Token, WETH9 } from '@ixswap1/sdk-core'
import { Pair } from '@ixswap1/v2-sdk'
import { t } from '@lingui/macro'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from 'hooks/Tokens'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import JSBI from 'jsbi'
import { StakingStatus } from 'state/stake/reducer'
import { useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { DAI, IXS, USDC, USDT, WBTC } from '../../constants/tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/helpers'
import { saveStakingStatus } from './actions'
import { useIXSStakingContract } from 'hooks/useContract'
import { BigNumber } from 'ethers'

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
  }, [dispatch, account, hasStaking, balance])

  return status
}

export function useStakingState(): AppState['staking'] {
  return useSelector<AppState, AppState['staking']>((state) => state.staking)
}

export function useFetchStakingAPY() {
  const { account, chainId } = useActiveWeb3React()
  console.log('account: ', account)

  const staking = useIXSStakingContract(account as string)
  return useCallback(async () => {
    try {
      const result = await staking?.ONE_WEEK_APY()
      console.log('availableClaim: ', result)
    } catch (error) {
      console.error(`IxsReturningStakeBankPostIdoV1: `, error)
    }
  }, [staking, account])
}
