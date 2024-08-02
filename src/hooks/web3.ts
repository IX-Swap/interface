import { useWeb3React } from 'connection/web3reactShim'
import { useEffect, useState } from 'react'

// Deprecated, dont use anymore
export function useActiveWeb3React(): any {
  const context = useWeb3React()
  return context
}

export function useEagerConnect() {
  const [tried, setTried] = useState(false)

  return tried
}

/**
 * Use for network and metaMask - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !suppress) {
      const handleChainChanged = () => {
        // eat errors
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [suppress])
}
