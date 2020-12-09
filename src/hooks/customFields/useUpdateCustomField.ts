import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { CustomField, UpdateCustomFieldArgs } from 'types/user'

export interface UseUpdateCustomFieldArgs {
  service: string
  feature: string
}

export const useUpdateCustomField = (args: UseUpdateCustomFieldArgs) => {
  const { service, feature } = args
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const queryKey = usersQueryKeys.getCustomFields(service, feature)

  const updateCustomFields = async (data: UpdateCustomFieldArgs) => {
    return await apiService.put(
      userURL.updateCustomFields(getIdFromObj(user)),
      { service, feature, ...data }
    )
  }

  return useMutation(updateCustomFields, {
    onMutate: data => {
      void queryCache.setQueryData<CustomField>(queryKey, {
        ...args,
        ...data
      })
    },
    onError: async (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    },
    onSettled: () => {
      void queryCache.invalidateQueries(queryKey)
    }
  })
}
