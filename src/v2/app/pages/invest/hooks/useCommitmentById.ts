import { useQuery } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/hooks/useServices'
import { Commitment } from 'v2/types/commitment'
import { getIdFromObj } from 'v2/helpers/strings'

export const USE_COMMITMENT_BY_ID_QUERY_KEY = 'commitmentById'

export const useCommitmentById = (commitmentId: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = `/issuance/commitments/${getIdFromObj(user)}/${commitmentId}`

  const fetchCommitment = async () => await apiService.get<Commitment>(url)
  const { data, ...rest } = useQuery(
    [USE_COMMITMENT_BY_ID_QUERY_KEY, commitmentId],
    fetchCommitment
  )

  return {
    ...rest,
    data: data?.data
  }
}
