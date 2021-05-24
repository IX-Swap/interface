import { exchange } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryCache } from 'react-query'
import { marketTradesData } from '__fixtures__/exchange'

export const useTradeHistory = (id: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const queryCache = useQueryCache()

  const onDataReceived = (receivedData: any) => {
    queryCache.setQueryData(
      [exchangeQueryKeys.tradeHistory, id],
      () => receivedData ?? []
    )
  }

  useEffect(() => {
    const onUrl = exchange.tradeHistory.on(id)
    socket?.on(onUrl, onDataReceived)
    socket?.emit(exchange.tradeHistory.emit, id)

    return () => {
      socket?.off(onUrl)
    }
    // eslint-disable-next-line
  }, [id, socket])

  const { data } = useQuery<any>(
    [exchangeQueryKeys.tradeHistory, id],
    () => queryCache.getQueryData([exchangeQueryKeys.tradeHistory, id]),
    {
      initialData: marketTradesData
    }
  )

  return {
    data
  }
}
