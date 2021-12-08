import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useParams } from 'react-router'

export const useCreateDistribution = () => {
  const { apiService, snackbarService } = useServices()
  const { dsoId } = useParams<{ dsoId: string }>()
  const queryCache = useQueryCache()

  const createDistribution = async (args: {
    pricePerToken: number
    distributionDate: string
    otp: string
    dsoId: string
  }) => {
    return await apiService.post('/issuance/distribution/create', args)
  }

  return useMutation(createDistribution, {
    onSuccess: () => {
      void snackbarService.showSnackbar(
        'Distribution added sucessfully.',
        'success'
      )

      void queryCache.invalidateQueries(`distributions-${dsoId}`)
    },
    onError: (error?: any) => {
      void snackbarService.showSnackbar(error?.message, 'error')
    }
  })
}
