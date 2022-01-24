import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const useHasIdentity = () => {
  const { data: individualIdentity, isSuccess: isLoadedIndividual } =
    useIndividualIdentity()
  const { data: corporateIdentities, isSuccess: isLoadedCorporates } =
    useAllCorporates({})
  const hasIdentity =
    individualIdentity !== undefined || corporateIdentities.list.length > 0

  return { isLoaded: isLoadedIndividual && isLoadedCorporates, hasIdentity }
}
