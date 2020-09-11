import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'

export const useCreateOrUpdateIndividualMutation = () => {
  const { identityService } = useServices()

  return useMutation(
    identityService.createOrUpdateIndividual.bind(identityService)
  )
}
