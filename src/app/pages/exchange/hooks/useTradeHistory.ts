import { exchange } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryCache } from 'react-query'

export const useTradeHistory = (id?: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const queryCache = useQueryCache()

  const onDataReceived = (receivedData: any) => {
    queryCache.setQueryData(
      [exchangeQueryKeys.tradeHistory, id],
      () => receivedData ?? []
    )
  }

  const onMyFillsDataReceived = (receivedData: any) => {
    queryCache.setQueryData(
      [exchangeQueryKeys.myTradeHistory, id],
      () => receivedData ?? []
    )
  }

  useEffect(() => {
    if (!id) return

    const onUrl = exchange.tradeHistory.on(id)
    const onMyFills = exchange.tradeHistory.onMyFills(id)
    socket?.on(onUrl, onDataReceived)
    socket?.on(onMyFills, onMyFillsDataReceived)
    socket?.emit(exchange.tradeHistory.emit, id)

    return () => {
      socket?.off(onUrl)
    }
    // eslint-disable-next-line
  }, [id, socket])

  const { data: marketTrades } = useQuery<any>(
    [exchangeQueryKeys.tradeHistory, id],
    () => queryCache.getQueryData([exchangeQueryKeys.tradeHistory, id])
  )

  const { data: myTrades } = useQuery<any>(
    [exchangeQueryKeys.myTradeHistory, id],
    () => queryCache.getQueryData([exchangeQueryKeys.myTradeHistory, id])
  )

  return {
    marketTrades,
    myTrades
  }
}
