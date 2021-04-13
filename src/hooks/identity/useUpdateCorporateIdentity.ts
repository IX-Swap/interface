import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation } from 'react-query'

import apiService from 'services/api'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import {
  CorporateIdentity,
  CorporateIdentityFormValues,
  UpdateCorporateIdentityArgs
} from '../../app/pages/identity/types/forms'
import {
  prepareDeclarationsForUpload,
  prepareDocumentsForUpload
} from 'app/pages/identity/utils/shared'

export const useUpdateCorporateIdentity = (id: string) => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
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
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
