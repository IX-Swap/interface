import { useActiveWeb3React } from 'hooks/web3'
import { RedirectPathToVesting } from 'pages/Swap/redirects'
import React, { Component, useMemo } from 'react'
import { Route } from 'react-router-dom'
import { ConnectToAppropriateNetwork } from 'theme'
export const SUPPORTED_TGE_CHAINS = { MAIN: 1, KOVAN: 42 }

export const KovanOnlyRoute = (props: any) => {
  const { chainId } = useActiveWeb3React()

  const validChainId = useMemo(() => {
    return chainId && Object.values(SUPPORTED_TGE_CHAINS).includes(chainId)
  }, [chainId])
  return (
    <Route
      {...props}
      render={(props) =>
        validChainId ? (
          chainId === SUPPORTED_TGE_CHAINS.KOVAN ? (
            <Component {...props} />
          ) : (
            <RedirectPathToVesting {...props} />
          )
        ) : (
          <ConnectToAppropriateNetwork />
        )
      }
    />
  )
}
