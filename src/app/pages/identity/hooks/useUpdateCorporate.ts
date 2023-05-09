import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useParams } from 'react-router-dom'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export const useUpdateCorporate = () => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const params = useParams<{ identityId: string }>()
  const queryCache = useQueryCache()

  const updateCorporate = async (values: any) => {
    const uri = identityURL.corporates.update(userId, params.identityId)
    const declaredAs = ['investor']

    if (values.isIssuer === true) declaredAs.push('issuer')
    if (values.isTenantOwner === true) declaredAs.push('tenantOwner')

    values.declaredAs = declaredAs

    delete values._id
    delete values.isIssuer
    delete values.isTenantOwner

    values.step = typeof values.step === 'undefined' ? 0 : values.step

    return await apiService.put<CorporateIdentity>(uri, {
      ...values
    })
  }

  return useMutation(updateCorporate, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)
      await queryCache.invalidateQueries([
        identityQueryKeys.getCorporate(userId, data.data?._id)
      ])
    },
    onError: (error: any) => {
      if (params.identityId !== undefined) {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  })
}
