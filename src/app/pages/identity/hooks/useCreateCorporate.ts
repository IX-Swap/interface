import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation, useQueryCache } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { generatePath, useHistory } from 'react-router-dom'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { useSearchQuery } from 'hooks/useSearchQuery'

const corporateTypeRouteMap: { [key: string]: string } = {
  investor: IdentityRoute.editCorporate,
  'Fund Manager': IdentityRoute.editFundManager,
  'Fund Administrator': IdentityRoute.editFundAdmin,
  'Portfolio Manager': IdentityRoute.editPortfolioManager,
  issuer: IdentityRoute.editIssuer
}

export const useCreateCorporate = (corporateType: string) => {
  const { snackbarService, apiService } = useServices()
  const queryCache = useQueryCache()
  const { replace } = useHistory()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const query = useSearchQuery()

  const createCorporate = async (values: any) => {
    const uri = identityURL.corporates.create(userId)
    return await apiService.post<CorporateIdentity>(uri, {
      ...values,
      type: corporateType
    })
  }

  return useMutation(createCorporate, {
    onSuccess: async data => {
      void snackbarService.showSnackbar(data.message, 'success')
      await queryCache.invalidateQueries(identityQueryKeys.getAllCorporate)

      replace(
        generatePath(
          `${corporateTypeRouteMap[corporateType]}?${query.toString()}`,
          {
            identityId: data.data._id,
            userId: data.data.user._id
          }
        )
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
