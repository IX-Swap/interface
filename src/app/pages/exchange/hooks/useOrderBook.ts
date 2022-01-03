import { useServices } from 'hooks/useServices'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { exchange } from 'config/apiURL'

export const useOrderBook = (id?: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const queryCache = useQueryCache()

  const onDataReceived = (receivedData: any) => {
    queryCache.setQueryData(
      [exchangeQueryKeys.orderBook, id],
      () => receivedData ?? { bids: [], asks: [] }
    )
  }

  useEffect(() => {
    if (!id) return

    const onUrl = exchange.orderBook.on(id)
    socket?.on(onUrl, onDataReceived)
    socket?.emit(exchange.orderBook.emit, id)
    return () => {
      socket?.off(onUrl)
    }
    // eslint-disable-next-line
  }, [id, socket])

  const { data } = useQuery<any>([exchangeQueryKeys.orderBook, id], () =>
    queryCache.getQueryData([exchangeQueryKeys.orderBook, id])
  )

  return {
    data
  }
}
