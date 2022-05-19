import { t } from '@lingui/macro'
import { AxiosResponse } from 'axios'
import { APIResponse } from './types'

export const responseSuccessInterceptor = (response: AxiosResponse<APIResponse>) => {
  const data = response.data.data ?? response.data

  return {
    ...response,
    message: response.data.message,
    data,
  }
}

export const getError = (error: any) => {
  let message = 'Unknown error'
  let code = 'Unknown code'
  if (error.response !== undefined) {
    code = error.response.data.code ?? error.response.code
    message = error.response.data.message ?? error.response.message ?? HTTP_ERRORS[code]
  } else {
    message = error.message
    code = error.code
  }
  return { message, code }
}

export const HTTP_ERRORS: { [id: string]: string } = {
  NOT_FOUND: t`Entity not found`,
}
