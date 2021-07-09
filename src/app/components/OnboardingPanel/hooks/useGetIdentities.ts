import { IdentityType } from 'app/pages/identity/utils/shared'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useDetailsOfIssuance } from 'app/pages/identity/hooks/useDetailsOfIssuance'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const useGetIdentities = (corporateType?: 'issuer' | 'investor') => {
  const {
    data: individualIdentity,
    isLoading: individualIdentityIsLoading
  } = useIndividualIdentity()
  const {
    data: corporateIdentities,
    isLoading: corporateIdentitiesIsLoading
  } = useAllCorporates({
    type: corporateType
  })

  const {
    data: detailsOfIssuance,
    isLoading: detailsOfIssuanceLoading
  } = useDetailsOfIssuance()

  const hasIdentity =
    individualIdentity !== undefined || corporateIdentities.list.length > 0

  const identityTypeLoaded: IdentityType =
    individualIdentity !== undefined ? 'individual' : 'corporate'

  const identityLoaded =
    individualIdentity !== undefined
      ? individualIdentity
      : corporateIdentities.list[0]

  const isIdentitiesLoaded =
    !individualIdentityIsLoading &&
    !corporateIdentitiesIsLoading &&
    !detailsOfIssuanceLoading

  const isLoadingIdentities =
    individualIdentityIsLoading || corporateIdentitiesIsLoading

  return {
    hasIdentity,
    identityTypeLoaded,
    identityLoaded,
    individualIdentity,
    corporateIdentities,
    isIdentitiesLoaded,
    detailsOfIssuance,
    isLoadingIdentities
  }
}
