import { useServices } from 'v2/services/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'
import {
  allDeclarationsAreChecked,
  prepareDocumentsForUpload
} from 'v2/app/pages/identity/utils'
import { useMutation } from 'react-query'
import {
  CreateCorporateIdentityArgs,
  CorporateIdentity
} from 'v2/types/identity'
import apiService from 'v2/services/api'

export const useCreateCorporateIdentity = () => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useIdentitiesRouter()
  const createCorporate = async (values: CorporateIdentityFormValues) => {
    if (user === undefined) {
      throw new Error('No user found')
    }

    if (!allDeclarationsAreChecked(values.declarations)) {
      throw new Error('All declaration fields are required')
    }

    const args: CreateCorporateIdentityArgs = {
      ...values,
      userId: user._id,
      declarations: values.declarations.map(d => d.value),
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
