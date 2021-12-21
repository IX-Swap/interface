import { Contract } from '@ethersproject/contracts'
import { WETH9 } from '@ixswap1/sdk-core'
import { abi as IIxsV2PairABI } from '@ixswap1/v2-core/build/IIxsV2Pair.json'
import { abi as IIxsWSecABI } from '@ixswap1/v2-core/build/IIxsWSec.json'
import { abi as IxsGovernanceToken } from '@ixswap1/v2-core/build/IxsGovernanceToken.json'
import { abi as IxsReturningStakeBankPostIdoV1 } from '@ixswap1/v2-core/build/IxsReturningStakeBankPostIdoV1.json'
import { abi as IxsToken } from '@ixswap1/v2-core/build/IxsToken.json'
import { abi as IIxsVestedDistribution } from '@ixswap1/v2-core/build/IXSVestedDistribution.json'
import { abi as IIxsV2LiquidityRouter } from '@ixswap1/v2-periphery/build/IIxsV2LiquidityRouter.json'
import { abi as IIxsV2SwapRouter } from '@ixswap1/v2-periphery/build/IIxsV2SwapRouter.json'
import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json'
import EIP_2612 from 'abis/eip_2612.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import ERC20_ABI from 'abis/erc20.json'
import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import FAUCET_ABI from 'abis/faucet-contract.json'
import FAUCET_STABLE_ABI from 'abis/faucet-stable-contract.json'
import MULTICALL_ABI from 'abis/multicall2.json'
import NFT_ABI from 'abis/nft-contract.json'
import WETH_ABI from 'abis/weth.json'
import {
  ARGENT_WALLET_DETECTOR_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  IXS_ADDRESS,
  IXS_GOVERNANCE_ADDRESS,
  IXS_STAKING_V1_ADDRESS,
  IXS_VESTING_ADDRESS,
  LIQUIDITY_ROUTER_ADDRESS,
  MULTICALL2_ADDRESSES,
  NFT_ADDRESS,
  SWAP_ROUTER_ADDRESS,
} from 'constants/addresses'
import { useMemo } from 'react'
import { getContract } from 'utils'
import { ArgentWalletDetector, EnsPublicResolver, EnsRegistrar, Erc20, Multicall2, Weth } from '../abis/types'
import { useActiveWeb3React } from './web3'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') {
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

export function useNftContract() {
  return useContract(NFT_ADDRESS, NFT_ABI)
}

export function useVestingContract() {
  return useContract(IXS_VESTING_ADDRESS, IIxsVestedDistribution, true)
}

export function useIXSStakingContract() {
  return useContract(IXS_STAKING_V1_ADDRESS, IxsReturningStakeBankPostIdoV1, true)
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
export function useBurnWSecContract(address: string | undefined) {
  return useContract(address, IIxsWSecABI, true)
}
export function useFaucetContract(tokenAddress: string) {
  return useContract(tokenAddress, FAUCET_ABI, true)
}
export function useStableFaucetContract(tokenAddress: string) {
  return useContract(tokenAddress, FAUCET_STABLE_ABI, true)
}
