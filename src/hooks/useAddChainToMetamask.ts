import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useState } from 'react'

interface ChainDetails {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export const ADD_CHAIN: { [key: number]: ChainDetails } = {
  [1]: {
    chainId: '0x89',
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  [42]: {
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.matic.today'],
    blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
  },
}

export default function useAddPolygonToMetamask(): {
  addChain: () => void
  success: boolean | undefined
} {
  const { library, chainId } = useActiveWeb3React()

  const [success, setSuccess] = useState<boolean | undefined>()

  const addChain = useCallback(() => {
    if (library && library.provider.isMetaMask && library.provider.request && chainId && ADD_CHAIN[chainId]) {
      const params = [ADD_CHAIN[chainId]]
      library.provider
        .request({
          method: 'wallet_addEthereumChain',
          params,
        })
        .then((success) => {
          setSuccess(success)
        })
        .catch(() => setSuccess(false))
    } else {
      setSuccess(false)
    }
  }, [library, chainId])

  return { addChain, success }
}
