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
  CorporateIdentity,
  UpdateCorporateIdentityArgs
} from 'v2/types/identity'
import apiService from 'v2/services/api'

export const useUpdateCorporateIdentity = (id: string) => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useIdentitiesRouter()
  const updateCorporate = async (values: CorporateIdentityFormValues) => {
    if (user === undefined) {
      throw new Error('No user found')
    }

    if (!allDeclarationsAreChecked(values.declarations)) {
      throw new Error('All declaration fields are required')
    }
    const identity: UpdateCorporateIdentityArgs = {
      ...values,
      declarations: values.declarations.map(d => d.value),
      documents: prepareDocumentsForUpload(values.documents)
    }
    const uri = `/identity/corporates/${user._id}/${id}`

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
