import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React, useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { metaMask } from '../connectors/metaMask'
import { NetworkContextName } from '../constants/misc'

// Deprecated, dont use anymore
export function useActiveWeb3React(): any {
  const context = useWeb3React()
  // const contextNetwork = useWeb3ReactCore<Web3Provider>()
  return context
}

export function useEagerConnect() {
  const { isActive } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)

  useEffect(() => {
    if (!isActive) {
      metaMask.connectEagerly()
    }
    setTried(true)
  }, [isActive]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (isActive) {
      setTried(true)
    }
  }, [isActive])

  return tried
}

/**
 * Use for network and metaMask - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { isActive, connector } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !isActive && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        metaMask.activate().catch((error) => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          metaMask.activate().catch((error) => {
            console.error('Failed to activate after accounts changed', error)
          })
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
  }, [isActive, suppress])
}
