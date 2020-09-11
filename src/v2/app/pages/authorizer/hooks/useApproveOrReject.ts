import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'

export const useApproveOrReject = (
  uri: string,
  id: string,
  action: 'approve' | 'reject'
) => {
  const _uri = uri.replace(/\/list.*/, '')
  const url = `${_uri}/${id}/${action}`
  const { apiService } = useServices()
  const approve = async () => await apiService.put(url, {})

  return useMutation(approve, {
    onSuccess: data => alert(data.data.message),
    onError: (error: any) => alert(error.message)
  })
}
