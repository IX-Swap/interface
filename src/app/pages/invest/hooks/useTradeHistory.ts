import { exchange } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useEffect, useMemo, useState } from 'react'
import { useQueryCache } from 'react-query'

export const useTradeHistory = (id: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const [data, setData] = useState<any>([])
  const queryCache = useQueryCache()

  const onDataReceived = (receivedData: any) => {
    setData(receivedData ?? [])
    queryCache.setQueryData(
      [exchangeQueryKeys.tradeHistory, id],
      (data: any) => [receivedData, ...(data ?? [])]
    )
  }

  useEffect(() => {
    const onUrl = exchange.tradeHistory.on(id)
    socket?.on(onUrl, onDataReceived)
    socket?.emit(exchange.tradeHistory.emit, id)

    return () => {
      socket?.off(onUrl)
      queryCache.setQueryData([exchangeQueryKeys.tradeHistory, id], [])
    }
    // eslint-disable-next-line
  }, [id, socket])

  return {
    data
  }
}
