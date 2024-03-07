import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { Web3Provider } from '@ethersproject/providers'
import { ChainInfo, SupportedChainId } from 'constants/chains'

interface AddNetworkArguments {
  provider: Web3Provider
  chainId: SupportedChainId
  info: ChainInfo
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function addNetwork({ provider, chainId, info }: AddNetworkArguments): Promise<null | void> {
  if (!provider?.provider?.request) {
    return
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())
  try {
    await provider?.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: formattedChainId,
          chainName: info.chainName,
          rpcUrls: info.rpcUrls,
          nativeCurrency: info.nativeCurrency,
          blockExplorerUrls: info.blockExplorerUrls,
        },
      ],
    })
  } catch (error) {
    console.error('error adding eth network: ', chainId, info, error)
  }
}
