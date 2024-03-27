import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { Web3Provider } from '@ethersproject/providers'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { addNetwork } from './addNetwork'

interface SwitchNetworkArguments {
  provider: Web3Provider
  chainId?: SupportedChainId
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({ provider, chainId }: SwitchNetworkArguments): Promise<null | void> {
  if (!provider?.provider?.request) {
    return
  }
  if (!chainId && provider?.getNetwork) {
    ;({ chainId } = await provider.getNetwork())
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())
  try {
    await provider?.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }],
    })
  } catch (error: any) {
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    if (error.code === 4902 && chainId !== undefined) {
      const info = CHAIN_INFO[chainId]

      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      await addNetwork({ provider, chainId, info })
      await switchToNetwork({ provider, chainId })
    } else {
      throw error
    }
  }
}
