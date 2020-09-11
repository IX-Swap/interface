import { AxiosResponse } from 'axios'
import { APIResponse } from 'v2/services/api/types'

class APIError extends Error {
  constructor (message: string) {
    super()
    this.message = message
  }
}

export const responseErrorInterceptor = (error: any) => {
  let message = 'Unknown error'

  if (error.response !== undefined) {
    message = error.response.data.message
  } else {
    message = error.message
  }

  throw new APIError(message)
}

export const responseSuccessInterceptor = (
  response: AxiosResponse<APIResponse>
) => {
  return {
    ...response,
    data: response.data.data,
    message: response.data.message
  }
}
