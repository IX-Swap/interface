import { AxiosResponse } from 'axios'
import { APIResponse } from 'services/api/types'
import { errorCodes, errors } from './errorCodes'

class APIError extends Error {
  code: string
  constructor(message: string, code?: string) {
    super()
    this.message = message
    this.code = code ?? ''
  }
}

export const responseErrorInterceptor = (error: any) => {
  let message = 'Unknown error'
  let code = 'Unknown code'
  if (error.response !== undefined) {
    code = error.response.data.code
    message = error.response.data.message ?? errors[code as errorCodes]?.message
  } else {
    message = error.message
    code = error.code ?? error.name
  }

  throw new APIError(message, code)
}

export const responseSuccessInterceptor = (
  response: AxiosResponse<APIResponse>
) => {
  let data: any

  if (response.data instanceof Blob) {
    data = response.data
  } else {
    data = response.data.data
  }

  return {
    ...response,
    message: response.data.message,
    data
  }
}
