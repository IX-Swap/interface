import { queryKeys } from 'config/queryKeys'
import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { PromoData } from 'types/promo'

export const usePromo = () => {
  const { apiService } = useServices()
  const fetchPromo = async () =>
    await apiService.get<PromoData>('/issuance/promo')
  const { data, isError, isLoading } = useQuery(queryKeys.promo, fetchPromo)

  return {
    promoData: data?.data,
    isError,
    isLoading
  }
}
