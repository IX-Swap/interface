// @flow
import { postRequest } from 'services/httpRequests'
import type { OrderState } from '../../BidAsks/modules/types'
async function cancelOrder (userId, orderId, payload: OrderState) {
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
