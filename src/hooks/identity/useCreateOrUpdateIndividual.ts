import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import {
  prepareDocumentsForUpload,
  prepareDeclarationsForUpload
} from 'app/pages/identity/utils'
import { useAuth } from 'hooks/auth/useAuth'
import { IndividualIdentityFormValues } from 'app/pages/identity/components/types'
import apiService from 'services/api'
import {
  CreateOrUpdateIndividualIdentityArgs,
  IndividualIdentity
} from 'types/identity'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'

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
    const uri = identityURL.individuals.update(userId)

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
