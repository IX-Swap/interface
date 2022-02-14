import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import apiService from 'services/api'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { generatePath, useHistory } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import {
  CreateOrUpdateIndividualIdentityArgs,
  IndividualIdentity,
  IndividualIdentityFormValues
} from '../../app/pages/identity/types/forms'
import {
  prepareDeclarationsForUpload,
  prepareDocumentsForUpload
} from 'app/pages/identity/utils/shared'

export const useCreateOrUpdateIndividual = () => {
  const { snackbarService } = useServices()
  const { user } = useAuth()
  const { push } = useHistory()
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

    return await apiService.put<IndividualIdentity>(uri, {
      ...identity,
      gender: 'O' // TODO: remove once backend is updated
    })
  }

  return useMutation(createOrUpdateIndividual, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      push(
        generatePath(IdentityRoute.viewIndividual, {
          identityId: data.data._id
        })
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
