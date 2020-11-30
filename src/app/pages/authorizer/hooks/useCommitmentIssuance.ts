import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { CommitmentIssuanceArgs } from 'types/commitment'
import { useAuthorizerRouter } from 'app/pages/authorizer/router'

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
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
