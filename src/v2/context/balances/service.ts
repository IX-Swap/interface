import HTTPResponse from '../../types/httpResponse'
import { AssetBalance } from '../../types/balance'
import { postRequest } from '../../helpers/httpRequests'

export async function getBalance (userId: string, assetId: string): Promise<HTTPResponse<AssetBalance[]>> {
  try {
    const uri = `/accounts/balance/${userId}/${assetId}`
    const result = await postRequest(uri, { skip: 0, limit: 50 })
    const response = await result.json()
    if (result.status === 200) {
      const { documents = [] } = response.data.length
        ? response.data[0]
        : {}

      return new HTTPResponse<AssetBalance[]>(true, documents)
    } else {
      return new HTTPResponse<AssetBalance[]>(false, undefined, response.message)
    }
  } catch (err) {
    console.log(err)
    console.log(err.response)
    return new HTTPResponse<AssetBalance[]>(false, undefined, 'Login Failed')
  }
}

export async function getAllBalances (
  userId: string
): Promise<HTTPResponse<AssetBalance[]>> {
  try {
    const uri = `/accounts/balance/${userId}`
    const result = await postRequest(uri, { skip: 0, limit: 50 })
    const response = await result.json()
    if (result.status === 200) {
      const { documents = [] } = response.data.length ? response.data[0] : {}

      return new HTTPResponse<AssetBalance[]>(true, documents)
    } else {
      return new HTTPResponse<AssetBalance[]>(
        false,
        undefined,
        response.message
      )
    }
  } catch (err) {
    console.log(err)
    console.log(err.response)
    return new HTTPResponse<AssetBalance[]>(false, undefined, 'Login Failed')
  }
}
