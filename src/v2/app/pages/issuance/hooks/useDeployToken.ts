import { useServices } from 'v2/services/useServices'
import { useEffect, useMemo, useState } from 'react'
import { queryCache } from 'react-query'
import { queryKeys } from 'v2/config/queryKeys'

export interface DeployTokenMessage {
  at: string
  message: string
}

export const useDeployToken = (tokenId: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const [isInitializing, setIsInitializing] = useState(true)
  const [isDeploying, setIsDeploying] = useState(false)

  const onMessageReceived = (message: DeployTokenMessage) => {
    if (isInitializing) {
      setIsInitializing(false)
    }

    if (message.message.toLowerCase().includes('deploying')) {
      setIsDeploying(true)
    }

    if (message.message === 'OK') {
      setIsDeploying(false)
    }

    queryCache.setQueryData<DeployTokenMessage[]>(
      [queryKeys.deployments, tokenId],
      data => [message, ...(data ?? [])]
    )
  }

  const deploy = () => {
    setIsDeploying(true)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (socket?.hasListeners(`x-token/${tokenId}`)) {
      socket?.removeEventListener(`x-token/${tokenId}`)
    }

    socket?.on(`x-token/${tokenId}`, onMessageReceived)
    socket?.emit('x-token/deploy/initialize', tokenId)
    socket?.emit('x-token/deploy/begin', tokenId)
  }

  useEffect(() => {
    socket?.on(`x-token/${tokenId}`, onMessageReceived)
    socket?.emit('x-token/deploy/initialize', tokenId)

    return () => {
      queryCache.setQueryData<DeployTokenMessage[]>(
        [queryKeys.deployments, tokenId],
        []
      )
      socket?.off(`x-token/${tokenId}`)
    }
  }, [tokenId, socket]) // eslint-disable-line

  return {
    isInitializing,
    isDeploying,
    deploy
  }
}
