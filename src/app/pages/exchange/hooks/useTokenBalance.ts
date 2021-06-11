import { useServices } from 'hooks/useServices'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { exchange } from 'config/apiURL'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'

export const useTokenBalance = (pairId: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const queryCache = useQueryCache()

  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const onDataReceived = (receivedData: any) => {
    queryCache.setQueryData(
      [exchangeQueryKeys.tokenBalance, pairId],
      () => receivedData ?? { bids: [], asks: [] }
    )
  }

  useEffect(() => {
    const onUrl = exchange.tokenBalance.on(userId)
    socket?.on(onUrl, onDataReceived)
    socket?.emit(exchange.tokenBalance.emit, pairId)
    return () => {
      socket?.off(onUrl)
    }
    // eslint-disable-next-line
  }, [pairId, socket])

  const { data } = useQuery<any>([exchangeQueryKeys.tokenBalance, pairId], () =>
    queryCache.getQueryData([exchangeQueryKeys.tokenBalance, pairId])
  )

  return {
    data
  }
}
