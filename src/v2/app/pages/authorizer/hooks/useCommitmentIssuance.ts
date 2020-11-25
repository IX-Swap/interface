import { useMutation } from 'react-query'
import { useServices } from 'v2/hooks/useServices'
import { CommitmentIssuanceArgs } from 'v2/types/commitment'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'

export const useCommitmentIssuance = () => {
  const { apiService, snackbarService } = useServices()
  const {
    params: { commitmentId }
  } = useAuthorizerRouter()
  const uri = `/issuance/commitments/${commitmentId}/override`
  const updateCommitment = async (args: CommitmentIssuanceArgs) => {
    return await apiService.patch(uri, args)
  }

  return useMutation(updateCommitment, {
    onSuccess: data => {
      console.log(data)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
