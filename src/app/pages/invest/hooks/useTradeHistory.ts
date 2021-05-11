import { exchange } from 'config/apiURL'
import { useAccessToken } from 'hooks/auth/useAccessToken'
import { useServices } from 'hooks/useServices'
import { useEffect, useState } from 'react'

export const useTradeHistory = (id: string) => {
  const accessToken = useAccessToken()
  const { socketService } = useServices()
  const [data, setData] = useState<any>([])

  useEffect(() => {
    try {
      const socket = socketService.getSocket(accessToken)
      const onUrl = exchange.tradeHistory.on(id)
      socket.emit(exchange.tradeHistory.emit, id)
      socket.on(onUrl, (data: any) => {
        setData(data ?? [])
      })

      return () => {
        socket.off(onUrl)
      }
    } catch (e) {
      console.log(e)
    }
    // eslint-disable-next-line
  }, [])

  return {
    data
  }
}
