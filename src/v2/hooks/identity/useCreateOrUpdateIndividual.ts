import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import {
  allDeclarationsAreChecked,
  prepareDocumentsForUpload
} from 'v2/app/pages/identity/utils'
import { useAuth } from 'v2/hooks/auth/useAuth'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'v2/app/pages/identity/components/types'

export const useCreateOrUpdateIndividual = () => {
  const { identityService, snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useIdentitiesRouter()
  const createOrUpdateIndividual = async (
    values: IndividualIdentityFormValues | CorporateIdentityFormValues
  ) => {
    if (user === undefined) {
      throw new Error('No user found')
    }

    if (!allDeclarationsAreChecked(values.declarations)) {
      throw new Error('All declaration fields are required')
    }

    return await identityService.createOrUpdateIndividual({
      ...values,
      userId: user._id,
      documents: prepareDocumentsForUpload(values.documents)
    })
  }

  return useMutation(createOrUpdateIndividual, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      push('list')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
