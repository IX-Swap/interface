import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'

export const useIsSingPass = () => {
  const { data, isLoading } = useIndividualIdentity()
  return {
    isSingPass: data?.uinfin !== undefined && !isLoading,
    individualIdentity: data
  }
}
