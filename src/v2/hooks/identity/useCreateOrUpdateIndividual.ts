import { useServices } from 'v2/hooks/useServices'
import { useMutation } from 'react-query'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import {
  prepareDocumentsForUpload,
  prepareDeclarationsForUpload
} from 'v2/app/pages/identity/utils'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { IndividualIdentityFormValues } from 'v2/app/pages/identity/components/types'
import apiService from 'v2/services/api'
import {
  CreateOrUpdateIndividualIdentityArgs,
  IndividualIdentity
} from 'v2/types/identity'
import { getIdFromObj } from 'v2/helpers/strings'

export const useCreateOrUpdateIndividual = () => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useIdentitiesRouter()
  const createOrUpdateIndividual = async (
    values: IndividualIdentityFormValues
  ) => {
    const args: CreateOrUpdateIndividualIdentityArgs = {
      ...values,
      userId: getIdFromObj(user),
      declarations: prepareDeclarationsForUpload(values.declarations),
      documents: prepareDocumentsForUpload(values.documents)
    }
    const { userId, ...identity } = args
    const uri = `/identity/individuals/${userId}`

    return await apiService.put<IndividualIdentity>(uri, identity)
  }

  return useMutation(createOrUpdateIndividual, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      push('individual')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
