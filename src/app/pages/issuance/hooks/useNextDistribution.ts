import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useNextDistribution = (dsoId: string) => {
  const { apiService } = useServices()
  const getNextDistribution = async () => {
    return await apiService.post('/issuance/distribution/nextDistribution', {
      dso: dsoId
    })
  }

  const { data, ...rest } = useQuery(
    ['nextDistribution', dsoId],
    getNextDistribution
  )

  return {
    data:
      data?.data.message === 'No upcoming distribution found'
        ? undefined
        : data?.data,
    ...rest
  }
}
