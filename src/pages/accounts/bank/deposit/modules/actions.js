//
import { postRequest } from 'services/httpRequests'
import storage from 'services/storageHelper'

export const deposit = async payload => {
  const url = `/accounts/cash/deposits/${storage.getUserId()}`
  const response = await postRequest(url, payload)

  return response.status === 200
}
