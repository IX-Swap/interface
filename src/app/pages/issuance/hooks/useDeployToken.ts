import { useServices } from 'hooks/useServices'
import { useEffect, useMemo, useState } from 'react'
import { useQueryCache } from 'react-query'
import { queryKeys } from 'config/queryKeys'

export interface DeployTokenMessage {
  at: string
  message: string
}

export const useDeployToken = (tokenId?: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const [isInitializing, setIsInitializing] = useState(true)
  const [isDeploying, setIsDeploying] = useState(false)
  const [isDeployed, setIsDeployed] = useState(false)
  const queryCache = useQueryCache()

  const onMessageReceived = (message: DeployTokenMessage) => {
    if (isInitializing) {
      setIsInitializing(false)
    }

    if (message.message.startsWith('Success')) {
      setIsDeploying(false)
      setIsDeployed(true)
    }

    if (message.message.startsWith('Error')) {
      setIsDeploying(false)
    }

    queryCache.setQueryData<DeployTokenMessage[]>(
      [queryKeys.deployments, tokenId],
      data => [message, ...(data ?? [])]
    )
  }

  const deploy = () => {
    if (tokenId === undefined) return

    setIsDeploying(true)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (socket?.hasListeners(`x-token-lite/${tokenId}`)) {
      socket?.removeEventListener(`x-token-lite/${tokenId}`)
    }

    socket?.on(`x-token-lite/${tokenId}`, onMessageReceived)
    socket?.emit('x-token-lite/deploy/begin', tokenId)
  }

  useEffect(() => {
    if (tokenId === undefined) return

    socket?.on(`x-token-lite/${tokenId}`, onMessageReceived)
    socket?.emit('x-token-lite/deploy/initialize', tokenId)

    return () => {
      queryCache.setQueryData<DeployTokenMessage[]>(
        [queryKeys.deployments, tokenId],
        []
      )
      socket?.off(`x-token-lite/${tokenId}`)
    }
  }, [tokenId, socket]) // eslint-disable-line

  return {
    isInitializing,
    isDeploying,
    isDeployed,
    deploy
  }
}
