import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'

export const useDSOCapitalStructures = () => {
  const { apiService } = useServices()

  const fetchCapitalStructures = async () => {
    return await apiService.get<string[]>(
      issuanceURL.dso.getCapitalStructureList
    )
  }

  const { data, ...rest } = useQuery(
    dsoQueryKeys.getCapitalStructureList,
    fetchCapitalStructures
  )

  return {
    ...rest,
    data: data?.data
  }
}
