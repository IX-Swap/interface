import { exchange } from 'config/apiURL'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useEffect, useMemo } from 'react'
import { useQuery, useQueryCache } from 'react-query'

export const useFinancialSummary = (id?: string) => {
  const { socketService } = useServices()
  const socket = useMemo(() => socketService.socket, [socketService.socket])
  const queryCache = useQueryCache()

  const onDataReceived = (receivedData: any) => {
    queryCache.setQueryData(
      [exchangeQueryKeys.summary, id],
      () => receivedData ?? []
    )
  }

  useEffect(() => {
    if (!id) return

    const onUrl = exchange.summary.on(id)
    socket?.on(onUrl, onDataReceived)
    socket?.emit(exchange.summary.emit, id)

    return () => {
      socket?.off(onUrl)
    }
    // eslint-disable-next-line
  }, [id, socket])

  const { data } = useQuery<any>([exchangeQueryKeys.summary, id], () =>
    queryCache.getQueryData([exchangeQueryKeys.summary, id])
  )

  return {
    data
  }
}
