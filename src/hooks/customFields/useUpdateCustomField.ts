import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { UpdateCustomFieldArgs } from 'types/user'

export interface UseUpdateCustomFieldArgs {
  service: string
  feature: string
}

export const useUpdateCustomField = (args: UseUpdateCustomFieldArgs) => {
  const { service, feature } = args
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()

  const updateCustomFields = async (data: UpdateCustomFieldArgs) => {
    return await apiService.put(
      userURL.updateCustomFields(getIdFromObj(user)),
      { service, feature, ...data }
    )
  }

  return useMutation(updateCustomFields, {
    onSuccess: () => {
      void queryCache.invalidateQueries(
        usersQueryKeys.getCustomFields(service, feature)
      )
    },
    onError: async (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
