import { IdentityType } from 'app/pages/identity/utils/shared'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useDetailsOfIssuance } from 'app/pages/identity/hooks/useDetailsOfIssuance'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export const useGetIdentities = (
  corporateType?: CorporateType,
  userId?: string
) => {
  const { data: individualIdentity, isLoading: individualIdentityIsLoading } =
    useIndividualIdentity(userId)
  const { data: corporateIdentities, isLoading: corporateIdentitiesIsLoading } =
    useAllCorporates({
      type: corporateType,
      userId: userId
    })

  const { data: detailsOfIssuance, isLoading: detailsOfIssuanceLoading } =
    useDetailsOfIssuance(userId)

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
    individualIdentityIsLoading ||
    corporateIdentitiesIsLoading ||
    detailsOfIssuanceLoading

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
