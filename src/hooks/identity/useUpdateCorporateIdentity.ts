import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { CorporateIdentityFormValues } from 'app/pages/identity/components/types'
import {
  prepareDeclarationsForUpload,
  prepareDocumentsForUpload
} from 'app/pages/identity/utils'
import { useMutation } from 'react-query'
import { CorporateIdentity, UpdateCorporateIdentityArgs } from 'types/identity'
import apiService from 'services/api'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'

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
    const uri = identityURL.corporates.update(getIdFromObj(user), id)

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
