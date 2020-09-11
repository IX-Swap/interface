import axios, { AxiosResponse as R } from 'axios'

declare module 'axios' {
  export interface AxiosResponse<T = any> extends R {
    data: T
    message: string
  }
}
