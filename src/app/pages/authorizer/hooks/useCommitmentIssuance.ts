import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { CommitmentIssuanceArgs } from 'types/commitment'
import { issuanceURL } from 'config/apiURL'
import { useParams } from 'react-router-dom'

export const useCommitmentIssuance = () => {
  const { apiService, snackbarService } = useServices()
  const { commitmentId } = useParams<{ commitmentId: string }>()
  console.log(commitmentId)
  const uri = issuanceURL.commitments.overrideById(commitmentId)
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
