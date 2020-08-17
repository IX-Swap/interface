import { postRequest } from '../../helpers/httpRequests'
import HttpResponse from '../../types/httpResponse'
import { Asset } from '../../types/asset'

export async function getAssets({
  skip = 0,
  limit = 50,
  type
}: {
  skip?: number
  limit?: number
  type: 'Currency' | 'Security'
}) {
  try {
    const uri = '/accounts/assets/list'
    const result = await postRequest(uri, { skip, limit, type })
    const response = await result.json()
    if (result.status === 200) {
      const { documents = [] } = response.data.length ? response.data[0] : {}

      return new HttpResponse<Asset[]>(true, documents)
    } else {
      return new HttpResponse<Asset[]>(false, undefined, response.message)
    }
  } catch (err) {
    console.log(err)
    console.log(err.response)
    return new HttpResponse<Asset[]>(false, undefined, 'Get asset failed')
  }
}
