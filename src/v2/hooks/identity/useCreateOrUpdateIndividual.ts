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
import apiService from 'v2/services/api'
import {
  CreateOrUpdateIndividualIdentityArgs,
  IndividualIdentity
} from 'v2/types/identity'

export const useCreateOrUpdateIndividual = () => {
  const { snackbarService } = useServices()
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

    const args: CreateOrUpdateIndividualIdentityArgs = {
      ...values,
      userId: user._id,
      documents: prepareDocumentsForUpload(values.documents)
    }
    const { userId, ...identity } = args
    const uri = `/identity/individuals/${userId}`

    return await apiService.put<IndividualIdentity>(uri, identity)
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
