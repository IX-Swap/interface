import { BigNumber } from '@ethersproject/bignumber'
import { hexStripZeros } from '@ethersproject/bytes'
import { Web3Provider } from '@ethersproject/providers'
import { CHAIN_INFO, SupportedChainId } from 'config/blockchain/constants'
import { addNetwork } from './addNetwork'

interface SwitchNetworkArguments {
  library: Web3Provider
  chainId?: SupportedChainId
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({
  library,
  chainId
}: SwitchNetworkArguments): Promise<null | never | undefined> {
  if (library?.provider?.request == null) {
    return
  }
  if (chainId === undefined && library?.getNetwork !== undefined) {
    ;({ chainId } = await library.getNetwork())
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())
  console.log('switch to network', { formattedChainId })
  try {
    await library?.provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }]
    })
  } catch (error) {
    console.log({ error, chainId })
    // 4902 is the error code for attempting to switch to an unrecognized chainId
    const isUnrecognized =
      (error as any)?.code === 4902 ||
      (error as any)?.message?.includes('Try adding the chain using')
    if (Boolean(isUnrecognized) && chainId !== undefined) {
      const info = CHAIN_INFO[chainId]

      // metamask (only known implementer) automatically switches after a network is added
      // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
      // metamask's behavior when switching to the current network is just to return null (a no-op)
      await addNetwork({ library, chainId, info })
      await switchToNetwork({ library, chainId })
    } else {
      throw error
    }
  }
}
