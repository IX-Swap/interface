import { AxiosResponse } from 'axios'

export interface QueryOrMutationCallbacks<TResponse, TError = any> {
  onSuccess?: (response: AxiosResponse<TResponse>) => any
  onError?: (error: TError) => any
}
