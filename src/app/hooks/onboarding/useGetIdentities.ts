import { IdentityType } from 'app/pages/identity/utils/shared'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useDetailsOfIssuance } from 'app/pages/identity/hooks/useDetailsOfIssuance'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { useServices } from 'hooks/useServices'

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

  //   const hasIdentity =
  // individualIdentity !== undefined || corporateIdentities.list.length > 0

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

  const { storageService } = useServices()
  const userAccount: any = storageService.get('user')
  const isIndividual = userAccount.accountType === 'INDIVIDUAL'
  const hasIdentity =
    (isIndividual && individualIdentity !== undefined) ||
    (!isIndividual && corporateIdentities.list.length > 0)

  const hasStartedKYC = hasIdentity && !isLoadingIdentities
  const identityType = isIndividual ? 'individual' : 'corporate'
  const identity = isIndividual
    ? individualIdentity
    : corporateIdentities.list[0]
  const hasApprovedKYC = identity?.status === 'Approved'
  const hasSubmittedKYC = identity?.status === 'Submitted' || hasApprovedKYC
  const hasStartedAccreditation =
    typeof identity?.accreditationStatus !== 'undefined'
  const hasSubmittedAccreditation =
    identity?.accreditationStatus === 'Submitted' ||
    identity?.accreditationStatus === 'Approved'

  return {
    hasIdentity,
    identityTypeLoaded,
    identityLoaded,
    individualIdentity,
    corporateIdentities,
    isIdentitiesLoaded,
    detailsOfIssuance,
    isLoadingIdentities,
    identity,
    identityType,
    hasStartedKYC,
    hasSubmittedKYC,
    hasApprovedKYC,
    hasStartedAccreditation,
    hasSubmittedAccreditation
  }
}
