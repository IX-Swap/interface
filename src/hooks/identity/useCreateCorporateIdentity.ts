import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { CorporateIdentityFormValues } from 'app/pages/identity/components/types'
import {
  prepareDeclarationsForUpload,
  prepareDocumentsForUpload
} from 'app/pages/identity/utils'
import { useMutation } from 'react-query'
import { CreateCorporateIdentityArgs, CorporateIdentity } from 'types/identity'
import apiService from 'services/api'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'

export const useCreateCorporateIdentity = () => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useIdentitiesRouter()
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
      push('list')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
