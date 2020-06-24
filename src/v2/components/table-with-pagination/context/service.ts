import { postRequest } from '../../../helpers/httpRequests'
import HTTPResponse from '../../../types/httpResponse'

interface TablePaginationResponse<T> {
  page: number
  total: number
  statusCode: number
  items: T[]
}

export async function getItems<T> (
  uri: string,
  payload: {},
  skip: number = 0,
  limit: number = 50
): Promise<HTTPResponse<TablePaginationResponse<T>>> {
  try {
    const result = await postRequest(uri, {
      skip,
      limit,
      ...payload
    })
    const response = await result.json()
    if (result.status === 200) {
      const { limit = 50, count = NaN, skip = 0, documents = [] } = response.data.length
        ? response.data[0]
        : {}

      return new HTTPResponse(true, {
        page: Math.floor(skip / limit) + 1,
        total: count,
        items: documents || [],
        statusCode: result.status
      })
    } else {
      return new HTTPResponse<TablePaginationResponse<T>>(false, undefined, response.message)
    }
  } catch (err) {
    console.log(err)
    console.log(err.response)
    return new HTTPResponse<TablePaginationResponse<T>>(false, undefined, 'Get Failed')
  }
}
