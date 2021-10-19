import { Contract } from '@ethersproject/contracts'
import { WETH9 } from '@ixswap1/sdk-core'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { abi as MERKLE_DISTRIBUTOR_ABI } from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { abi as IIxsV2PairABI } from '@ixswap1/v2-core/build/IIxsV2Pair.json'
import { abi as IIxsV2SwapRouter } from '@ixswap1/v2-periphery/build/IIxsV2SwapRouter.json'
import { abi as IIxsV2LiquidityRouter } from '@ixswap1/v2-periphery/build/IIxsV2LiquidityRouter.json'
import { abi as IIxsWSecABI } from '@ixswap1/v2-core/build/IIxsWSec.json'
import { abi as IIxsVestedDistribution } from '@ixswap1/v2-core/build/IXSVestedDistribution.json'
import { abi as IxsReturningStakeBankPostIdoV1 } from '@ixswap1/v2-core/build/IxsReturningStakeBankPostIdoV1.json'
import { abi as IxsToken } from '@ixswap1/v2-core/build/IxsToken.json'
import { abi as IxsGovernanceToken } from '@ixswap1/v2-core/build/IxsGovernanceToken.json'
import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import ERC20_ABI from 'abis/erc20.json'
import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import MULTICALL_ABI from 'abis/multicall2.json'
import { Unisocks } from 'abis/types/Unisocks'
import IXSOCKS_ABI from 'abis/unisocks.json'
import WETH_ABI from 'abis/weth.json'
import EIP_2612 from 'abis/eip_2612.json'

import {
  ARGENT_WALLET_DETECTOR_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MULTICALL2_ADDRESSES,
  SWAP_ROUTER_ADDRESS,
  LIQUIDITY_ROUTER_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  SOCKS_CONTROLLER_ADDRESSES,
  IXS_VESTING_ADDRESS,
  IXS_STAKING_V1_ADDRESS,
  IXS_ADDRESS,
  IXS_GOVERNANCE_ADDRESS,
  STAKING_ALTERNATE_MAP,
} from 'constants/addresses'
import { useMemo } from 'react'
import { getContract } from 'utils'
import { Erc20, ArgentWalletDetector, EnsPublicResolver, EnsRegistrar, Multicall2, Weth } from '../abis/types'
import { useActiveWeb3React } from './web3'
import { SupportedChainId } from 'constants/chains'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    console.log({ addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account })
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') {
      console.log({ addressUseContract: address })
      address = addressOrAddressMap
    } else {
      address = addressOrAddressMap[chainId]
    }
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useVestingContract() {
  return useContract(IXS_VESTING_ADDRESS, IIxsVestedDistribution, true)
}

export function useIXSStakingContract() {
  return useContract(IXS_STAKING_V1_ADDRESS, IxsReturningStakeBankPostIdoV1, true)
}

export function useIXSAlternateStakingContract() {
  const { chainId } = useActiveWeb3React()
  // const alternateChain = STAKING_ALTERNATE_MAP[(chainId as SupportedChainId) ?? 1]
  // const alternateAddress = IXS_STAKING_V1_ADDRESS[alternateChain]
  // console.log({ alternateAddress, alternateChain })
  return useContract('0xf49A087aA48C0A4f0dEa6428F1175e1bB45CDAa2', IxsReturningStakeBankPostIdoV1, true)
}
export function useIXSTokenContract() {
  return useContract(IXS_ADDRESS, IxsToken, true)
}

export function useIXSGovTokenContract() {
  return useContract(IXS_GOVERNANCE_ADDRESS, IxsGovernanceToken, true)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH9[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IIxsV2PairABI, withSignerIfPossible)
}

export function useSwapRouterContract(): Contract | null {
  return useContract(SWAP_ROUTER_ADDRESS, IIxsV2SwapRouter, true)
}
export function useLiquidityRouterContract(): Contract | null {
  return useContract(LIQUIDITY_ROUTER_ADDRESS, IIxsV2LiquidityRouter, true)
}
export function useMulticall2Contract() {
  return useContract<Multicall2>(MULTICALL2_ADDRESSES, MULTICALL_ABI, false) as Multicall2
}

export function useMerkleDistributorContract() {
  return useContract(MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useBurnWSecContract(address: string | undefined) {
  return useContract(address, IIxsWSecABI, true)
}

export function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible)
}

export function useSocksController(): Unisocks | null {
  return useContract<Unisocks>(SOCKS_CONTROLLER_ADDRESSES, IXSOCKS_ABI, false)
}
