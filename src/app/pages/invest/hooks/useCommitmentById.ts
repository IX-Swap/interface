import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { Commitment } from 'types/commitment'
import { getIdFromObj, isEmptyString } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'

export const useCommitmentById = (commitmentId?: string, userId?: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const _userId = userId ?? getIdFromObj(user)
  const url = issuanceURL.commitments.getById(_userId, commitmentId)

  const fetchCommitment = async () => await apiService.get<Commitment>(url)
  const { data, ...rest } = useQuery(
    [investQueryKeys.getCommitmentById, commitmentId, _userId],
    fetchCommitment,
    {
      enabled: !isEmptyString(commitmentId) && !isEmptyString(_userId)
    }
  )

  return {
    ...rest,
    data: data?.data
  }
}
