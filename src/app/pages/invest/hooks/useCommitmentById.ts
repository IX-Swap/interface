import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { Commitment } from 'types/commitment'
import { getIdFromObj } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'
import { issuanceURL } from 'config/apiURL'

export const useCommitmentById = (commitmentId: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = issuanceURL.commitments.getById(getIdFromObj(user), commitmentId)

  const fetchCommitment = async () => await apiService.get<Commitment>(url)
  const { data, ...rest } = useQuery(
    [investQueryKeys.getCommitmentById, commitmentId],
    fetchCommitment
  )

  return {
    ...rest,
    data: data?.data
  }
}
