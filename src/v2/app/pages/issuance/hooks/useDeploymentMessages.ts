import { queryCache, useQuery } from 'react-query'
import { queryKeys } from 'v2/config/queryKeys'
import { DeployTokenMessage } from './useDeployToken'

export const useDeploymentMessages = (tokenId: string) => {
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
