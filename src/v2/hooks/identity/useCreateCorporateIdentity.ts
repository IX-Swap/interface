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
  CreateCorporateIdentityArgs,
  CorporateIdentity
} from 'v2/types/identity'
import apiService from 'v2/services/api'
import { getIdFromObj } from 'v2/helpers/strings'

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
    const uri = `/identity/corporates/${userId}`
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
