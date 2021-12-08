import { APIResponse } from 'services/api/types'

export const url = 'http://example.com'

export const successfulResponse: APIResponse<any> = {
  data: {},
  message: 'success'
}

export const unsuccessfulResponse: APIResponse = {
  data: undefined,
  message: 'error'
}

export const headers = {}

export const customConfig = {
  headers: { 'Custom-Header': '12345' }
}

export const postJSON = { message: 'hello' }
export const postJSONHeaders = {
  ...headers,
  'Content-Type': 'application/json'
}

export const postFormData = new FormData()
export const postFormDataHeaders = headers
