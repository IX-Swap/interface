import { APIServiceResponse } from 'v2/services/api/types'

export const url = 'http://example.com'

export const successfulResponse: APIServiceResponse<any> = {
  data: {},
  message: 'success',
  success: true
}

export const unsuccessfulResponse: APIServiceResponse = {
  data: undefined,
  message: 'error',
  success: false
}

export const headers = {
  Authorization: 'Bearer undefined'
}

export const customConfig = {
  headers: { 'Custom-Header': '12345' }
}

export const postJSON = { message: 'hello' }
export const postJSONString = JSON.stringify(postJSON)
export const postJSONHeaders = {
  ...headers,
  'Content-Type': 'application/json'
}

export const postFormData = new FormData()
export const postFormDataHeaders = headers
