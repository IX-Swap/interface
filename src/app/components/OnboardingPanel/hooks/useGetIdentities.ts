import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { IdentityType } from 'app/pages/identity/utils/shared'

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
  const hasIdentity =
    individualIdentity !== undefined || corporateIdentities.list.length > 0

  const identityTypeLoaded: IdentityType =
    individualIdentity !== undefined ? 'individual' : 'corporate'

  const identityLoaded =
    individualIdentity !== undefined
      ? individualIdentity
      : corporateIdentities.list[0]

  const isIdentitiesLoaded =
    !individualIdentityIsLoading && !corporateIdentitiesIsLoading

  return {
    hasIdentity,
    identityTypeLoaded,
    identityLoaded,
    individualIdentity,
    corporateIdentities,
    isIdentitiesLoaded
  }
}
