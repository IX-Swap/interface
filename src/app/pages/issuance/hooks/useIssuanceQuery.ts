import { useServices } from 'hooks/useServices'
import { isValidDSOId } from 'helpers/isValidDSOId'
import { useParams } from 'react-router-dom'

export const useIssuanceQuery = () => {
  const { apiService } = useServices()
  const params = useParams<{ dsoId: string }>()
  const queryEnabled = isValidDSOId(params.dsoId)

  return {
    apiService,
    dsoId: params.dsoId,
    queryEnabled
  }
}
