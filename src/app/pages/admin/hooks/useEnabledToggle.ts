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
      void snackbarService.showSnackbar(
        `User ${enabled ? 'Disabled' : 'Enabled'}`,
        'success'
      )
      void queryCache.invalidateQueries(
        usersQueryKeys.getUserById(params.userId)
      )
      succesHandler()
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
