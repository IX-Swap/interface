import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { Commitment } from 'types/commitment'
import { getIdFromObj } from 'helpers/strings'
import { investQueryKeys } from 'config/queryKeys'

export const useCommitmentById = (commitmentId: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = `/issuance/commitments/${getIdFromObj(user)}/${commitmentId}`

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
