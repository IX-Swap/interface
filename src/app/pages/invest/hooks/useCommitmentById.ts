import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { Commitment } from 'types/commitment'
import { getIdFromObj } from 'helpers/strings'
import { invest } from 'config/queryKeys'

export const useCommitmentById = (commitmentId: string) => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const url = `/issuance/commitments/${getIdFromObj(user)}/${commitmentId}`

  const fetchCommitment = async () => await apiService.get<Commitment>(url)
  const { data, ...rest } = useQuery(
    [invest.getCommitmentById, commitmentId],
    fetchCommitment
  )

  return {
    ...rest,
    data: data?.data
  }
}
