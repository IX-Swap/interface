import { useEffect, useMemo } from 'react'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { issuanceURL } from 'config/apiURL'

export const useCommitmentActivity = (dsoId: string | undefined) => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = useMemo(() => getIdFromObj(user), [user])

  useEffect(() => {
    if (dsoId !== undefined) {
      void apiService.post(
        issuanceURL.commitments.createDSOActivity(userId, dsoId),
        {
          action: 'Click',
          type: 'Invest',
          invariant: 'Invest button was clicked',
          value: null
        }
      )
    }
  }, [dsoId, apiService, userId])
}
