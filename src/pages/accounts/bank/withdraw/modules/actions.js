//
import { postRequest } from 'services/httpRequests'
import storage from 'services/storageHelper'

export const withdraw = async payload => {
  const url = `/accounts/cash/withdrawals/${storage.getUserId()}`
  const response = await postRequest(url, payload)

  return response.status === 200
}

export const getAssetBalance = async id => {
  try {
    const url = `/accounts/balance/${storage.getUserId()}/${id}`
    const result = await postRequest(url, { skip: 0, limit: 50 })

    const response = await result.json()
    if (result.status === 200) {
      const data = response.data[0]

      return data.documents && data.documents.length
        ? data.documents[0]
        : undefined
    }

    return undefined
  } catch (err) {
    return undefined
  }
}
