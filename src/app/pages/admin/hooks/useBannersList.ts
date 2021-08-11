import { bannerURL } from 'config/apiURL'
import { bannersQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useBannersList = () => {
  const { apiService } = useServices()

  const getBannersList = async () => {
    return await apiService.get(bannerURL.getBannersList)
  }

  const { data, ...rest } = useQuery(
    bannersQueryKeys.getBannersList,
    getBannersList
  )
  return { ...rest, data: data?.data }
}
