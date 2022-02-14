import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { placeOrderURL } from 'config/apiURL'
import { PlaceOrderArgs } from 'app/pages/exchange/types/form'
import {
  exchangeMarketQueryKeys,
  virtualAccountQueryKeys
} from 'config/queryKeys'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { useParams } from 'react-router-dom'

export const useCreateOrder = () => {
  const { apiService, snackbarService } = useServices()
  const uri = placeOrderURL.create
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { pairId } = useParams<{ pairId: string }>()

  const createOrder = async (args: PlaceOrderArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(createOrder, {
    onSuccess: data => {
      void queryCache.invalidateQueries([
        virtualAccountQueryKeys.getByUserId,
        { userId }
      ])
      void queryCache.invalidateQueries(
        exchangeMarketQueryKeys.getOrdersList(userId, pairId)
      )
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
