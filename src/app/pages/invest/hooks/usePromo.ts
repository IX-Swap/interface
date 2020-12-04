import { queryKeys } from 'config/queryKeys'
import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { PromoType } from 'types/promo'

const mockData = {
  message: 'Farm-fresh Oranges',
  image:
    'https://d2slcw3kip6qmk.cloudfront.net/marketing/press/images/template-gallery/banner-ad2-468x60.jpeg'
}

export const usePromo = () => {
  const { apiService } = useServices()
  const fetchPromo = async () =>
    await apiService.get<PromoType>('/issuance/promo')
  const { data, isError, isLoading } = useQuery(queryKeys.promo, fetchPromo)

  return {
    promoData:
      data?.data ??
      mockData /* SUMEN_TO_DO:  Remove mock data, handle actual api response */,
    isError,
    isLoading
  }
}
