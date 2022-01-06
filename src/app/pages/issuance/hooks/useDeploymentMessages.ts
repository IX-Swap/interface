import { useQueryCache, useQuery } from 'react-query'
import { queryKeys } from 'config/queryKeys'
import { DeployTokenMessage } from './useDeployToken'

export const useDeploymentMessages = (tokenId?: string) => {
  const queryCache = useQueryCache()
  const { data = [], ...rest } = useQuery(
    [queryKeys.deployments, tokenId],
    () => {
      return queryCache.getQueryData<DeployTokenMessage[]>([
        queryKeys.deployments,
        tokenId
      ])
    }
  )

  return {
    ...rest,
    data
  }
}
