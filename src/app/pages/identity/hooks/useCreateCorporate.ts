import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export const useCreateCorporate = () => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const createCorporate = async (values: any) => {
    const uri = identityURL.corporates.create(userId)
    const declaredAs = ['investor']

    if (values.isIssuer === true) declaredAs.push('issuer')
    if (values.isTenantOwner === true) declaredAs.push('tenantOwner')

    values.declaredAs = declaredAs

    delete values.isIssuer
    delete values.isTenantOwner

    values.step = typeof values.step === 'undefined' ? 0 : values.step

    return await apiService.post<CorporateIdentity>(uri, {
      ...values
    })
  }

  return useMutation(createCorporate, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      void queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
