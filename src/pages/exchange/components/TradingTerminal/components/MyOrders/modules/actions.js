//
import { postRequest } from 'services/httpRequests'

async function cancelOrder (userId, orderId, payload) {
  try {
    const uri = `/exchange/orders/cancel/${userId}/${orderId}`
    const result = await postRequest(uri, payload)
    const response = await result.json()

    if (result.status === 200) {
      return response
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    throw new Error(err)
  }
}

export default {
  cancelOrder
}
