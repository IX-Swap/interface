import React from 'react'
import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import { UserRejectedRequestError } from 'viem'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { ResolvedRegister, UseConnectReturnType, useConnect as useConnectWagmi, useDisconnect } from 'wagmi'
import { ConnectionError } from 'web3'

const ConnectionContext = createContext<UseConnectReturnType<ResolvedRegister['config']> | undefined>(undefined)

export function ConnectionProvider({ children }: PropsWithChildren) {
  const { disconnect } = useDisconnect()

  const connection = useConnectWagmi({
    mutation: {
      onMutate({ connector }) {
        console.log('useConnect', 'ConnectionProvider', `Connection activating: ${connector.name}`)
      },
      onSuccess(_, { connector }) {
        console.log('useConnect', 'ConnectionProvider', `Connection activated: ${connector.name}`)
      },
      onError(error, { connector }) {
        if (error instanceof UserRejectedRequestError) {
          connection.reset()
          return
        }

        // TODO(WEB-1859): re-add special treatment for already-pending injected errors & move debug to after didUserReject() check
        console.warn('useConnect', 'ConnectionProvider', `Connection failed: ${connector.name}`)
      },
    },
  })

  useEffect(() => {
    if (connection.isPending) {
      connection.reset()
      disconnect()
    }
  }, [ConnectionError, disconnect])

  return <ConnectionContext.Provider value={connection}>{children}</ConnectionContext.Provider>
}

/**
 * Wraps wagmi.useConnect in a singleton provider to provide the same connect state to all callers.
 * @see {@link https://wagmi.sh/react/api/hooks/useConnect}
 */
export function useConnect() {
  const value = useContext(ConnectionContext)
  if (!value) {
    throw new Error('useConnect must be used within a ConnectionProvider')
  }
  return value
}
