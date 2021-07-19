import { AxiosResponse } from 'axios'
import { APIResponse } from './types'

class APIError extends Error {
  code: string
  constructor(message: string, code?: string) {
    super()
    this.message = message
    this.code = code ?? ''
  }
}

export const responseErrorInterceptor = (error: any) => {
  const message = 'Unknown error'
  const code = 'Unknown code'
  console.error({ ERROR: error })
  throw new APIError(message, code)
}

export const responseSuccessInterceptor = (response: AxiosResponse<APIResponse>) => {
  const data = response.data.data ?? response.data

  return {
    ...response,
    message: response.data.message,
    data,
  }
}
