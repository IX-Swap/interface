import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'

export const useEnabledToggle = (
  enabled: boolean,
  succesHandler: () => void
) => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ userId: string }>()

  const queryCache = useQueryCache()

  const url = userURL.enableUser
  const mutateFn = async () => {
    return await apiService.patch(url, {
      userId: params.userId,
      enabled: !enabled
    })
  }

  return useMutation(mutateFn, {
    onSuccess: async () => {
      snackbarService.showSnackbar(
        `User ${enabled ? 'Disabled' : 'Enabled'}`,
        'success'
      )
      await queryCache.invalidateQueries(
        usersQueryKeys.getUserById(params.userId)
      )
      succesHandler()
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
