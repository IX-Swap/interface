import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation } from 'react-query'
import apiService from 'services/api'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import {
  CorporateIdentity,
  CorporateIdentityFormValues,
  CreateCorporateIdentityArgs
} from '../../app/pages/identity/types/forms'
import {
  prepareDeclarationsForUpload,
  prepareDocumentsForUpload
} from 'app/pages/identity/utils/shared'

export const useCreateCorporateIdentity = () => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useHistory()
  const createCorporate = async (values: CorporateIdentityFormValues) => {
    const args: CreateCorporateIdentityArgs = {
      ...values,
      userId: getIdFromObj(user),
      declarations: prepareDeclarationsForUpload(values.declarations),
      documents: prepareDocumentsForUpload(values.documents)
    }
    const { userId, ...identity } = args
    const uri = identityURL.corporates.create(userId)
    return await apiService.post<CorporateIdentity>(uri, identity)
  }

  return useMutation(createCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      push(IdentityRoute.list)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
