import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'
import {
  prepareDeclarationsForUpload,
  prepareDocumentsForUpload
} from 'v2/app/pages/identity/utils'
import { useMutation } from 'react-query'
import {
  CorporateIdentity,
  UpdateCorporateIdentityArgs
} from 'v2/types/identity'
import apiService from 'v2/services/api'
import { getIdFromObj } from 'v2/helpers/strings'

export const useUpdateCorporateIdentity = (id: string) => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
  const { push, params } = useIdentitiesRouter()
  const updateCorporate = async (values: CorporateIdentityFormValues) => {
    const identity: UpdateCorporateIdentityArgs = {
      ...values,
      declarations: prepareDeclarationsForUpload(values.declarations),
      documents: prepareDocumentsForUpload(values.documents)
    }
    const uri = `/identity/corporates/${getIdFromObj(user)}/${id}`

    return await apiService.put<CorporateIdentity>(uri, identity)
  }

  return useMutation(updateCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      push('corporate', params)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
