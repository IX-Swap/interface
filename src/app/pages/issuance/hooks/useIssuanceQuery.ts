import { useServices } from 'hooks/useServices'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { isValidDSOId } from 'helpers/isValidDSOId'

export const useIssuanceQuery = () => {
  const { apiService } = useServices()
  const { params } = useIssuanceRouter()
  const queryEnabled = isValidDSOId(params.dsoId)

  return {
    apiService,
    dsoId: params.dsoId,
    queryEnabled
  }
}
