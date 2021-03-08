import { IdentityType } from 'app/pages/identity/utils'
import { useAllCorporateIdentities } from 'hooks/identity/useAllCorporateIdentities'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const useGetIdentities = () => {
  const { data: individualIdentity } = useIndividualIdentity()
  const { data: corporateIdentities } = useAllCorporateIdentities()
  const hasIdentity =
    individualIdentity !== undefined || corporateIdentities.list.length > 0

  const identityTypeLoaded: IdentityType =
    individualIdentity !== undefined ? 'individual' : 'corporate'

  const identityLoaded =
    individualIdentity !== undefined
      ? individualIdentity
      : corporateIdentities.list[0]

  return {
    hasIdentity,
    identityTypeLoaded,
    identityLoaded,
    individualIdentity,
    corporateIdentities
  }
}
