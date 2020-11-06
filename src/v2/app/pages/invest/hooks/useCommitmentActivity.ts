import { useEffect, useMemo } from 'react'
import { getIdFromObj } from 'v2/helpers/strings'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/hooks/useServices'

export const useCommitmentActivity = (dsoId: string | undefined) => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const userId = useMemo(() => getIdFromObj(user), [user])

  useEffect(() => {
    if (dsoId !== undefined) {
      void apiService.post(
        `/issuance/dso/${userId}/${dsoId}/activities`,
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
