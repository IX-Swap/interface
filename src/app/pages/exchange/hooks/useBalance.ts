import { useServices } from 'hooks/useServices'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { exchange } from 'config/apiURL'

export const useBalance = (id: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const queryCache = useQueryCache()

  const onDataReceived = (receivedData: any) => {
    queryCache.setQueryData(
      [exchangeQueryKeys.balances, id],
      () => receivedData ?? { bids: [], asks: [] }
    )
  }

  useEffect(() => {
    const onUrl = exchange.balances.on(id)
    socket?.on(onUrl, onDataReceived)
    socket?.emit(exchange.balances.emit, id)
    return () => {
      socket?.off(onUrl)
    }
    // eslint-disable-next-line
  }, [id, socket])

  const { data } = useQuery<any>([exchangeQueryKeys.balances, id], () =>
    queryCache.getQueryData([exchangeQueryKeys.balances, id])
  )

  return {
    data
  }
}
