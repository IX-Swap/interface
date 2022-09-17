import { issuanceURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { DigitalSecurityOffering } from 'types/dso'

export const useToggleDSOFavorite = (
  dso: DigitalSecurityOffering,
  dependentQueryKeys: string[]
) => {
  const queryCache = useQueryCache()
  const { apiService, snackbarService } = useServices()
  const dsoId = getIdFromObj(dso)
  const uri = issuanceURL.dso.favorite(dsoId)

  const mutateFn = async (toogleFav: boolean) => {
    if (toogleFav) {
      return await apiService.delete(uri, {})
    } else {
      return await apiService.put(uri, {})
    }
  }

  return useMutation(mutateFn, {
    onMutate: async () => {
      // TODO: logic needs to be revisited
      dependentQueryKeys.forEach(currentQueryKey => {
        const currentCache = queryCache.getQueries(currentQueryKey)
        if (currentCache.length > 0) {
          const queryKey = currentCache[0].queryKey
          queryCache.setQueryData(queryKey, (old: any) => {
            const list = old[0].data[0].documents

            return [
              {
                data: [
                  {
                    documents: list.map((dso: DigitalSecurityOffering) => {
                      if (getIdFromObj(dso) === dsoId) {
                        return {
                          ...dso,
                          isStarred: !dso.isStarred
                        }
                      }
                      return dso
                    })
                  }
                ]
              }
            ]
          })
        }
      })
    },
    onSuccess: async () => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
