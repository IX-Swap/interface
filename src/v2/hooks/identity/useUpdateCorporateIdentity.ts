import { useServices } from 'v2/services/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { CorporateIdentityFormValues } from 'v2/app/pages/identity/components/types'
import {
  allDeclarationsAreChecked,
  prepareDocumentsForUpload
} from 'v2/app/pages/identity/utils'
import { useMutation } from 'react-query'

export const useUpdateCorporateIdentity = (id: string) => {
  const { identityService, snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useIdentitiesRouter()
  const updateCorporate = async (values: CorporateIdentityFormValues) => {
    if (user === undefined) {
      throw new Error('No user found')
    }

    if (!allDeclarationsAreChecked(values.declarations)) {
      throw new Error('All declaration fields are required')
    }

    return await identityService.updateCorporate({
      ...values,
      userId: user._id,
      documents: prepareDocumentsForUpload(values.documents),
      id
    })
  }

  return useMutation(updateCorporate, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      push('list')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
