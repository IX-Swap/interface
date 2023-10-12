import { useQuery } from 'react-query'
import { exchange } from 'config/queryKeys'
import { exchange as exchangeURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'

export const useGetEstimateFee = (
  pair: string,
  side: 'BID' | 'ASK',
  type: 'LIMIT',
  price: string,
  amount: string
) => {
  const { apiService } = useServices()
  const url = exchangeURL.estimateFee

  const fetchEstimateFee = async () =>
    await apiService.post(url, {
      pair,
      side,
      type,
      price,
      amount
    })
  const { data, ...rest } = useQuery([exchange.estimateFee], fetchEstimateFee)

  return {
    ...rest,
    data: data?.data
  }
}
