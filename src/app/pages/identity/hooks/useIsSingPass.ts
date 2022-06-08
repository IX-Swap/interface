import { useGetSingPassData } from 'app/pages/identity/hooks/useGetSingPassData'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const useIsSingPass = () => {
  const { data: individualIdentityData, isLoading: individualIdentityLoading } =
    useIndividualIdentity()
  const { data: singPassData, isLoading: singPassDataLoading } =
    useGetSingPassData()

  return {
    isSingPass:
      individualIdentityData?.uinfin !== undefined &&
      !individualIdentityLoading &&
      !singPassDataLoading,
    individualIdentity: individualIdentityData,
    singPassData: singPassData
  }
}
