import { useServices } from 'hooks/useServices'
import { resources } from 'config/apiURL'
import { useQuery } from 'react-query'
import { resourcesQueryKeys } from 'config/queryKeys'

export const useGetSiteConfig = () => {
  const { apiService } = useServices()
  const url = resources.getSiteConfig
  const fetchSiteConfig = async () => {
    return await apiService.get<{
      masDisclosure: string
      hasAcceptedMasDisclosure: boolean
    }>(url)
  }

  const { data, ...rest } = useQuery(
    [resourcesQueryKeys.getSiteConfig()],
    fetchSiteConfig
  )

  return {
    ...rest,
    fetchSiteConfig,
    data: data?.data
  }
}
