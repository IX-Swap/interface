import axios, { AxiosRequestConfig } from 'axios'
import { API_URL } from '../../config'
import storageHelper from '../../helpers/storageHelper'
import {
  APIServiceRequestConfig,
  APIServiceResponse,
  KeyValueMap
} from './types'

const defaultResponse = {
  success: false,
  data: undefined,
  message: ''
}

const _axios = axios.create()
_axios.defaults.baseURL = API_URL
_axios.defaults.withCredentials = true

const apiService = {
  get: async function get<T = any> (uri: string, config?: AxiosRequestConfig) {
    return await this._request<T>({
      method: 'get',
      uri,
      data: undefined,
      axiosConfig: config || {}
    })
  },

  async post<T = any> (uri: string, data: any, config?: AxiosRequestConfig) {
    return await this._request<T>({
      method: 'post',
      uri,
      data,
      axiosConfig: config || {}
    })
  },

  async put<T = any> (uri: string, data: any, config?: AxiosRequestConfig) {
    return await this._request<T>({
      method: 'put',
      uri,
      data,
      axiosConfig: config || {}
    })
  },

  async _request<T> (config: APIServiceRequestConfig) {
    const axiosConfig = this._prepareRequestConfig(config)
    const response: APIServiceResponse<T> = defaultResponse

    try {
      const { data, status } = await _axios.request<APIServiceResponse<T>>(
        axiosConfig
      )

      response.success = Boolean(data.data) || status === 200
      response.data = data.data
      response.message = data.message
    } catch (error) {
      response.success = false
      response.message = this._getErrorMessage(error)
    }

    return response
  },

  _getErrorMessage (error: any) {
    let message = 'Unknown error'

    if (error.response) {
      message = error.response.data.message
    } else {
      message = error.message
    }

    return message
  },

  _prepareRequestConfig ({
    uri,
    axiosConfig,
    data,
    method
  }: APIServiceRequestConfig): AxiosRequestConfig {
    const body = this._prepareBody(data)
    const headers = this._prepareHeaders(data)
    const requestConfig: AxiosRequestConfig = {
      ...axiosConfig,
      url: uri,
      headers,
      method
    }

    if (method !== 'get' && data) {
      requestConfig.data = body
    }

    return requestConfig
  },

  _isFormData (data: any) {
    return data instanceof FormData
  },

  _prepareHeaders (data: any) {
    const headers: KeyValueMap = {}

    headers.Authorization = `Bearer ${storageHelper.getAccessToken()}`

    if (data && !this._isFormData(data)) {
      headers['Content-Type'] = 'application/json'
    }

    return headers
  },

  _prepareBody (data: any) {
    return this._isFormData(data) ? data : JSON.stringify(data)
  }
}

export default apiService
