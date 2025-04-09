import axios from 'axios'
import { getAccount } from '@wagmi/core'
import * as Sentry from '@sentry/react'

import { API_URL } from 'config'
import store from 'state'
import { postLogin } from 'state/auth/actions'
import { saveAccount } from 'state/user/actions'
import { auth, metamask } from './apiUrls'
import { responseSuccessInterceptor } from './interceptors'
import { APIServiceRequestConfig, KeyValueMap, RequestConfig } from './types'
import { LONG_WAIT_RESPONSE, LONG_WAIT_RESPONSE_CODE, OK_RESPONSE_CODE, CREATED_RESPONSE_CODE } from 'constants/misc'
import { setWalletState } from 'state/wallet'
import { wagmiConfig } from 'components/Web3Provider'

const _axios = axios.create()
_axios.defaults.baseURL = API_URL

let isRefreshing = false // Track if a refresh request is in progress
type subscriberCallback = (token: string) => void
let subscribers: subscriberCallback[] = [] // Queue for pending requests

// Function to add subscribers (pending requests)
const subscribeTokenRefresh = (callback: subscriberCallback) => {
  subscribers.push(callback)
}

// Function to notify all subscribers with new token
const onRefreshed = (newToken: string) => {
  subscribers.forEach((callback) => callback(newToken))
  subscribers = []
}

_axios.interceptors.response.use(responseSuccessInterceptor, async function responseErrorInterceptor(error: any) {
  if (error?.response?.status !== OK_RESPONSE_CODE || error?.response?.status !== CREATED_RESPONSE_CODE) {
    const method = error?.response?.config?.method
    // only log errors if the URL contain kyc
    if (error?.response?.config?.url?.includes('kyc') && (method === 'post' || method === 'put')) {
      Sentry.addBreadcrumb({
        category: 'KYC',
        level: 'error',
        message: error?.response?.data?.message,
        data: error?.response?.data,
      })

      const message = `API Error ${error?.response?.config?.method?.toUpperCase()} ${error?.response?.config?.url}: ${
        error?.response?.data?.message
      }`
      Sentry.captureMessage(message)
    }
  }

  const originalConfig = error?.config
  const shouldRetry = () => {
    const loginUrLs = [metamask.login, metamask.challenge]
    return !loginUrLs.includes(originalConfig.url)
  }
  if (shouldRetry() && error?.response) {
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true // Mark request as retried to prevent loops
      const {
        user: { account },
      } = store.getState()

      if (originalConfig.url.includes('auth/refresh')) {
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        try {
          isRefreshing = true
          store.dispatch(postLogin.pending(account))
          const response = await _axios.post(auth.refresh, null, {
            withCredentials: true,
            headers: {
              'x-tenant-domain': window.location.host,
              'x-user-address': account,
            },
          })
          if (!response?.data) {
            store.dispatch(
              postLogin.rejected({
                errorMessage: 'No response on refresh token',
                account,
              })
            )
            store.dispatch(setWalletState({ isSignLoading: false }))
          }
          store.dispatch(
            postLogin.fulfilled({
              auth: response?.data,
              account,
            })
          )
          isRefreshing = false
          onRefreshed(response?.data?.accessToken)
        } catch (error: any) {
          isRefreshing = false
          console.error({ requestError: error.message })
          store.dispatch(postLogin.rejected({ errorMessage: error.message, account }))
          store.dispatch(setWalletState({ isSignLoading: false }))
        }
      }

      // Wait for the refresh token to complete, then retry the original request
      return new Promise((resolve) => {
        subscribeTokenRefresh((newAccessToken) => {
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
          // Use _axios to ensure the correct configuration is applied
          resolve(_axios(originalConfig))
        })
      })
    }

    if (error?.response) {
      const message = error?.response?.data?.message
      throw new Error(message)
    }
    if (error?.response?.status === LONG_WAIT_RESPONSE_CODE) {
      throw new Error(LONG_WAIT_RESPONSE)
    }
  }
})

const apiService = {
  async request<T = any>({ method, uri, data, axiosConfig = {}, params = {} }: APIServiceRequestConfig) {
    const requestConfig: APIServiceRequestConfig = {
      uri,
      method,
      data: data,
      params,
      axiosConfig,
    }

    return await _axios.request<T>(this._prepareRequestConfig(requestConfig))
  },

  get: async function get<T = any>(uri: string, config?: RequestConfig, params?: Record<string, string | number>) {
    return await this.request<T>({
      method: 'get',
      uri,
      params,
      axiosConfig: config ?? {},
    })
  },

  async patch<T = any>(uri: string, data: any, axiosConfig: RequestConfig = {}) {
    return await this.request<T>({
      method: 'patch',
      uri,
      data,
      axiosConfig,
    })
  },

  async delete<T = any>(uri: string, data: any, axiosConfig: RequestConfig = {}) {
    return await this.request<T>({
      method: 'delete',
      uri,
      data,
      axiosConfig,
    })
  },

  async post<T = any>(uri: string, data: any, axiosConfig: RequestConfig = {}) {
    return await this.request<T>({
      method: 'post',
      uri,
      data,
      axiosConfig,
    })
  },

  async put<T = any>(uri: string, data: any, config?: RequestConfig) {
    return await this.request<T>({
      method: 'put',
      uri,
      data,
      axiosConfig: config ?? {},
    })
  },

  _getErrorMessage(error: any) {
    let message = 'Unknown error'
    if (error.response !== undefined) {
      message = error.response.data.message ?? error.response.message
    } else {
      message = error.message
    }
    return message
  },

  _prepareRequestConfig({ uri, axiosConfig, data, method, params }: APIServiceRequestConfig): RequestConfig {
    const body = this._prepareBody(data)
    const headers = this._prepareHeaders(data)
    const requestConfig: RequestConfig = {
      ...axiosConfig,
      url: uri,
      headers,
      method,
      params,
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
    const headers: KeyValueMap = {
      'x-tenant-domain': window.location.host,
    }
    const { auth } = store.getState()

    const { address } = getAccount(wagmiConfig)
    const account = address || ''
    const token = auth?.token ? auth.token[account] : ''

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    if (data !== undefined && !this._isFormData(data)) {
      headers['Content-Type'] = 'application/json'
    }

    return headers
  },

  _prepareBody(data: any) {
    return this._isFormData(data) ? data : JSON.stringify(data)
  },
}

export default apiService
