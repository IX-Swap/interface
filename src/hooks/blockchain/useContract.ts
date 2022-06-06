import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import ERC20_ABI from 'abis/erc20.json'
import { Erc20 } from 'abis/types'
import { getEthChainAddress } from 'helpers/blockchain'
import { useMemo } from 'react'
import { AddressZero } from '@ethersproject/constants'
import { useActiveWeb3React } from './web3'
import { isEmptyString } from 'helpers/strings'

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account !== undefined ? getSigner(library, account) : library
}

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (getEthChainAddress(address) === false || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(
    () =>
      getContractInstance({
        addressOrAddressMap,
        ABI,
        withSignerIfPossible,
        library,
        chainId,
        account
      }),
    [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]
  ) as T
}

interface ContractInstanceProps {
  addressOrAddressMap: string | { [chainId: number]: string } | undefined
  ABI: any
  withSignerIfPossible?: boolean
  library?: Web3Provider
  chainId?: number
  account?: string | null
}

export function getContractInstance({
  addressOrAddressMap,
  ABI,
  withSignerIfPossible = true,
  library,
  chainId,
  account
}: ContractInstanceProps) {
  if (
    addressOrAddressMap === undefined ||
    ABI === undefined ||
    library === undefined ||
    chainId === undefined
  )
    return null
  let address: string | undefined
  if (typeof addressOrAddressMap === 'string') {
    address = addressOrAddressMap
  } else {
    address = addressOrAddressMap[chainId]
  }
  if (isEmptyString(address)) return null
  try {
    return getContract(
      address,
      ABI,
      library,
      withSignerIfPossible && account !== null ? account : undefined
    )
  } catch (error) {
    console.error('Failed to get contract', error)
    return null
  }
}

export function useErc20Contract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}
