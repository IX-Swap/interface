import { AxiosRequestConfig, Method } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  needsAuth?: boolean
}
export interface APIServiceRequestConfig {
  method: Method
  uri: string
  axiosConfig: RequestConfig
  data?: any
  params?: any
}

export interface APIServiceResponse<T = undefined> {
  success: boolean
  data?: T
  message: string
}

export interface KeyValueMap<V = string> {
  [key: string]: V
}

export interface APIResponse<T = undefined> {
  data: T
  message: string
}

export type PaginatedData<DataType> = Array<{
  documents: DataType[]
  count: number
  limit: number
  skip: number
}>

export interface PaginationArgs {
  skip: number
  limit: number
}
