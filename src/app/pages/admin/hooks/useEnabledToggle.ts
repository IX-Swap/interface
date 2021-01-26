import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { userURL } from 'config/apiURL'
import { useAdminRouter } from 'app/pages/admin/router'
import { usersQueryKeys } from 'config/queryKeys'

export const useEnabledToggle = (
  enabled: boolean,
  succesHandler: () => void
) => {
  const { apiService, snackbarService } = useServices()
  const { params } = useAdminRouter()

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
