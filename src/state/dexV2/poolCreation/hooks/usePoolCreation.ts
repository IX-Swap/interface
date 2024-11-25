import { useDispatch } from 'react-redux'
import { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { BigNumber as EPBigNumber } from '@ethersproject/bignumber'
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import {
  Vault__factory,
  // WeightedPool__factory,
  // WeightedPoolFactory__factory,
} from '@balancer-labs/typechain';
import { defaultAbiCoder } from '@ethersproject/abi';

import {
  setActiveStep,
  setTokenLocked,
  setTokenWeight,
  setTokenWeights,
  setTokenAddress,
  addTokenWeight,
  PoolType,
} from '..'
import { PoolSeedToken } from 'pages/DexV2/types'
import { usePoolCreationState } from '.'
import { bnum, isSameAddress, toNormalizedWeights, userRejectedError } from 'lib/utils'
import { useTokens } from 'state/dexV2/tokens/hooks/useTokens'
import { wagmiConfig } from 'components/Web3Provider'
import { useWeb3React } from 'hooks/useWeb3React'
import config from 'lib/config'
import WeightedPoolFactoryV4Abi from 'lib/abi/WeightedPoolFactoryV4.json'
import { Address, parseUnits } from 'viem'
import { ZERO_ADDRESS } from 'constants/misc'
import { generateSalt } from 'lib/utils/random'

export type OptimisedLiquidity = {
  liquidityRequired: string
  balanceRequired: string
}

export interface JoinPoolRequest {
  assets: Address[];
  maxAmountsIn: string[];
  userData: any;
  fromInternalBalance: boolean;
}

const JOIN_KIND_INIT = 0;

export const usePoolCreation = () => {
  const dispatch = useDispatch()
  const { name, symbol, tokensList, activeStep, seedTokens, manuallySetToken, poolType, initialFee } =
    usePoolCreationState()
  const { priceFor, balanceFor, getToken } = useTokens()
  const { account, chainId } = useWeb3React()

  const [hasRestoredFromSavedState, setHasRestoredFromSavedState] = useState<boolean | null>(null)

  const networkConfig = config[chainId]

  const poolLiquidity = useMemo(() => {
    let sum = bnum(0)
    for (const token of seedTokens) {
      sum = sum.plus(bnum(token.amount).times(priceFor(token.tokenAddress)))
    }
    return sum
  }, [])

  const totalLiquidity = useMemo(() => {
    let total = bnum(0)
    for (const token of tokensList) {
      total = total.plus(bnum(priceFor(token)).times(balanceFor(token)))
    }
    return total
  }, [JSON.stringify(tokensList)])

  const poolTypeString = useMemo((): string => {
    switch (poolType) {
      case PoolType.Weighted:
        return 'weighted'
      default:
        return ''
    }
  }, [])

  function getTokensScaledByBIP(bip: BigNumber): Record<string, OptimisedLiquidity> {
    const optimisedLiquidity = {} as any
    for (const token of seedTokens) {
      // get the price for a single token
      const tokenPrice = bnum(priceFor(token.tokenAddress))
      // the usd value needed for its weight
      const liquidityRequired: BigNumber = bip.times(token.weight)
      const balanceRequired: BigNumber = liquidityRequired.div(tokenPrice)
      optimisedLiquidity[token.tokenAddress] = {
        liquidityRequired: liquidityRequired.toString(),
        balanceRequired: balanceRequired.toString(),
      }
    }
    return optimisedLiquidity
  }

  function getOptimisedLiquidity(): Record<string, OptimisedLiquidity> {
    // need to filter out the empty tokens just in case
    const validTokens = tokensList.filter((t) => t !== '')
    const optimisedLiquidity = {}

    // TODO: implement dynamic data loading
    // if (dynamicDataLoading.value) return optimisedLiquidity;

    // token with the lowest balance is the bottleneck
    let bottleneckToken = validTokens[0]
    // keeping track of the lowest amt
    let currentMin = bnum(balanceFor(validTokens[0])).times(priceFor(validTokens[0]))

    // find the bottleneck token
    for (const token of validTokens) {
      const value = bnum(balanceFor(token)).times(priceFor(token))
      if (value.lt(currentMin)) {
        currentMin = value
        bottleneckToken = token
      }
    }
    let bottleneckWeight = seedTokens.find((t) => isSameAddress(t.tokenAddress, bottleneckToken))?.weight || 0
    let bottleneckPrice = priceFor(bottleneckToken || '0')

    // make sure that once we recognise that we are
    // using the nativeAsset for optimisation of liquidity
    // that we use the appropriate weights and balances
    // since we do not want to change the original seedTokens array
    // as the wrapped native asset there is what will
    // be sent to the contract for creation
    // TODO: implement wrapped native asset
    // if (
    //   poolCreationState.useNativeAsset &&
    //   bottleneckToken === wrappedNativeAsset.value.address
    // ) {
    //   bottleneckToken = nativeAsset.address;
    //   bottleneckWeight =
    //     poolCreationState.seedTokens.find(t =>
    //       isSameAddress(t.tokenAddress, wrappedNativeAsset.value.address)
    //     )?.weight || 0;
    //   bottleneckPrice = priceFor(wrappedNativeAsset.value.address);
    // }
    if (!bottleneckToken) return optimisedLiquidity

    const bip = bnum(bottleneckPrice).times(balanceFor(bottleneckToken)).div(bottleneckWeight)

    return getTokensScaledByBIP(bip)
  }

  function findSeedTokenByAddress(address: string) {
    return seedTokens.find((token: PoolSeedToken) => isSameAddress(token.tokenAddress, address))
  }

  const scaledLiquidity = useMemo((): Record<string, OptimisedLiquidity> => {
    const scaledLiquidity: Record<string, OptimisedLiquidity> = {}

    const modifiedToken = findSeedTokenByAddress(manuallySetToken)

    if (!modifiedToken) return scaledLiquidity

    const bip = bnum(priceFor(modifiedToken.tokenAddress || '0'))
      .times(modifiedToken.amount)
      .div(modifiedToken.weight)

    return getTokensScaledByBIP(bip)
  }, [manuallySetToken])

  function updateTokenWeights(weights: PoolSeedToken[]) {
    dispatch(setTokenWeights(weights))
  }

  function addTokenWeightToPool(token: PoolSeedToken) {
    dispatch(addTokenWeight(token))
  }

  function updateTokenWeight(id: number, weight: number) {
    dispatch(setTokenWeight({ id, weight }))
  }

  function updateTokenAddress(id: number, tokenAddress: string) {
    dispatch(setTokenAddress({ id, tokenAddress }))
  }

  function updateLockedWeight(id: number, isLocked: boolean) {
    dispatch(setTokenLocked({ id, isLocked }))
  }

  function proceed() {
    dispatch(setActiveStep(activeStep + 1))
  }

  function goBack() {
    if (activeStep === 3) {
      dispatch(setActiveStep(1))
      return
    }
    dispatch(setActiveStep(activeStep - 1))
  }

  function getPoolSymbol() {
    let valid = true

    const tokenSymbols = seedTokens.map((token: PoolSeedToken) => {
      const weightRounded = Math.round(token.weight)
      const tokenInfo = getToken(token.tokenAddress)
      if (!tokenInfo) {
        valid = false
      }
      return tokenInfo ? `${Math.round(weightRounded)}${tokenInfo.symbol}` : ''
    })

    return valid ? tokenSymbols.join('-') : ''
  }

  function getAmounts() {
    const amounts = seedTokens.map((token: PoolSeedToken) => {
      return token.amount
    })
    return amounts
  }

  function calculateTokenWeights(tokens: PoolSeedToken[]): string[] {
    const weights: EPBigNumber[] = tokens.map((token: PoolSeedToken) => {
      const normalizedWeight = new BigNumber(token.weight).multipliedBy(new BigNumber(1e16))
      return EPBigNumber.from(normalizedWeight.toString())
    })
    const normalizedWeights = toNormalizedWeights(weights)
    const weightStrings = normalizedWeights.map((weight: EPBigNumber) => {
      return weight.toString()
    })

    return weightStrings
  }

  function parseValue(amountsIn: string[], tokensIn: string[]): EPBigNumber {
    let value = '0';
    // const nativeAsset = configService.network.nativeAsset;

    // amountsIn.forEach((amount, i) => {
    //   if (tokensIn[i] === nativeAsset.address) {
    //     value = amount;
    //   }
    // });

    return EPBigNumber.from(value);
  }

  async function joinPool() {
    try {
      const address = networkConfig.addresses.vault as Address
      const tokenAddresses: string[] = seedTokens.map((token: PoolSeedToken) => {
        return token.tokenAddress
      })

      const tokenBalances = [
        new BigNumber(6e6).toString(), // USDT, 6 decimals
        new BigNumber(6e6).toString(), // USDC, 6 decimals
      ];

      const initUserData = defaultAbiCoder.encode(
        ['uint256', 'uint256[]'],
        [JOIN_KIND_INIT, tokenBalances]
      );

      const joinPoolRequest: JoinPoolRequest = {
        // @ts-ignore
        assets: tokenAddresses,
        maxAmountsIn: tokenBalances,
        userData: initUserData,
        fromInternalBalance: false,
      };

      const poolId = '0x2682987a70858efd815afccb8fab2aa6035a58a4000200000000000000000003'

      const sender = account
      const receiver = account

      const params = [poolId.toLowerCase(), sender, receiver, joinPoolRequest] as any
debugger;
      // @ts-ignore
      const { request } = await simulateContract(wagmiConfig, {
        account,
        address,
        abi: Vault__factory.abi,
        args: params,
        functionName: 'joinPool',
        // @ts-ignore
        value: parseValue(tokenBalances, tokenAddresses),
      })

      // @ts-ignore
      const txHash = await writeContract(wagmiConfig, request)

      // @ts-ignore
      const transaction = await waitForTransactionReceipt(wagmiConfig, { hash: txHash })

      const map = {
        success: () => ({ txHash, blockNumber: transaction.blockNumber.toString() }),
        reverted: () => ({ error: new Error('Transaction reverted') }),
      }

      return map[transaction.status]?.()
    } catch (error: any) {
      if (userRejectedError(error)) {
        console.log('Transaction rejected')
      } else {
        console.log(typeof error === 'string' ? error : (error as any)?.message)
      }
    }
  }

  async function createPool() {
    try {
      const address = networkConfig.addresses.weightedPoolFactory as Address
      const tokenAddresses: string[] = seedTokens.map((token: PoolSeedToken) => {
        return token.tokenAddress
      })
      const weights = calculateTokenWeights(seedTokens)
      const params = [
        name,
        symbol,
        tokenAddresses,
        weights,
        [ZERO_ADDRESS, ZERO_ADDRESS],
        parseUnits(initialFee, 18).toString(),
        account,
        generateSalt(),
      ] as any

      console.log('params', params)

      // @ts-ignore
      const { request } = await simulateContract(wagmiConfig, {
        account,
        address,
        abi: WeightedPoolFactoryV4Abi,
        args: params,
        functionName: 'create',
      })

      // @ts-ignore
      const txHash = await writeContract(wagmiConfig, request)

      // @ts-ignore
      const transaction = await waitForTransactionReceipt(wagmiConfig, { hash: txHash })

      const map = {
        success: () => ({ txHash, blockNumber: transaction.blockNumber.toString() }),
        reverted: () => ({ error: new Error('Transaction reverted') }),
      }

      return map[transaction.status]?.()
    } catch (error: any) {
      if (userRejectedError(error)) {
        console.log('Transaction rejected')
      } else {
        console.log(typeof error === 'string' ? error : (error as any)?.message)
      }
    }
  }

  return {
    hasRestoredFromSavedState,
    totalLiquidity,
    updateTokenWeights,
    updateTokenWeight,
    updateLockedWeight,
    updateTokenAddress,
    addTokenWeightToPool,
    poolLiquidity,
    proceed,
    goBack,
    getPoolSymbol,
    getOptimisedLiquidity,
    scaledLiquidity,
    getAmounts,
    poolTypeString,
    createPool,
    joinPool,
  }
}
