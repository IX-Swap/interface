import { IdentityType } from 'app/pages/identity/utils'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const useGetIdentities = (corporateType?: 'issuer' | 'investor') => {
  const { data: individualIdentity } = useIndividualIdentity()
  const { data: corporateIdentities } = useAllCorporates({
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

  return {
    hasIdentity,
    identityTypeLoaded,
    identityLoaded,
    individualIdentity,
    corporateIdentities
  }
}
