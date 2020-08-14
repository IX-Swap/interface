import { AxiosRequestConfig, Method } from 'axios'

export interface APIServiceRequestConfig {
  method: Method
  uri: string
  axiosConfig: AxiosRequestConfig
  data?: any
}

export interface APIServiceResponse<T = undefined> {
  success: boolean
  data?: T
  message: string
}

export interface KeyValueMap<V = string> {
  [key: string]: V
}
