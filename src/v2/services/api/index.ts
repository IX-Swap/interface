import axios, { AxiosRequestConfig } from 'axios'
import { API_URL } from 'v2/config'
import storageHelper from '../../helpers/storageHelper'
import { APIServiceRequestConfig, KeyValueMap } from './types'
import {
  responseErrorInterceptor,
  responseSuccessInterceptor
} from 'v2/services/api/interceptors'

const _axios = axios.create()
_axios.defaults.baseURL = API_URL
_axios.defaults.withCredentials = true
_axios.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
)

const apiService = {
  get: async function get<T = any>(uri: string, config?: AxiosRequestConfig) {
    return await this.request<T>({
      method: 'get',
      uri,
      data: undefined,
      axiosConfig: config ?? {}
    })
  },

  async request<T = any>({
    method,
    uri,
    data,
    axiosConfig = {}
  }: APIServiceRequestConfig) {
    const requestConfig: APIServiceRequestConfig = {
      uri,
      method,
      data: data,
      axiosConfig
    }

    return await _axios.request<T>(this._prepareRequestConfig(requestConfig))
  },

  async delete<T = any>(
    uri: string,
    data: any,
    axiosConfig: AxiosRequestConfig = {}
  ) {
    return await this.request<T>({
      method: 'delete',
      uri,
      data,
      axiosConfig
    })
  },

  async post<T = any>(
    uri: string,
    data: any,
    axiosConfig: AxiosRequestConfig = {}
  ) {
    return await this.request<T>({
      method: 'post',
      uri,
      data,
      axiosConfig
    })
  },

  async put<T = any>(uri: string, data: any, config?: AxiosRequestConfig) {
    return await this.request<T>({
      method: 'put',
      uri,
      data,
      axiosConfig: config ?? {}
    })
  },

  _getErrorMessage(error: any) {
    let message = 'Unknown error'

    if (error.response !== undefined) {
      message = error.response.data.message
    } else {
      message = error.message
    }

    return message
  },

  _prepareRequestConfig({
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

    if (method !== 'get' && data !== undefined) {
      requestConfig.data = body
    }

    return requestConfig
  },

  _isFormData(data: any) {
    return data instanceof FormData
  },

  _prepareHeaders(data: any) {
    const headers: KeyValueMap = {}

    headers.Authorization = `Bearer ${storageHelper.getAccessToken()}`

    if (data !== undefined && !this._isFormData(data)) {
      headers['Content-Type'] = 'application/json'
    }

    return headers
  },

  _prepareBody(data: any) {
    return this._isFormData(data) ? data : JSON.stringify(data)
  }
}

export default apiService
