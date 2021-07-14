import { useCallback, useState } from 'react'
import apiService from 'services/apiService'
import { useAuthState, useAuthToken } from 'state/auth/hooks'
import { shouldRenewToken } from 'utils/time'
import { RequestConfig } from './types'
type ApiServiceKeys = keyof typeof apiService
export interface ApiServiceParams {
  method: ApiServiceKeys
  uri: string
  data: any
  config?: RequestConfig
}

export const useApiService = <T = any>({ method, uri, data, config }: ApiServiceParams) => {
  const { token, expiresAt } = useAuthState()
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<T | null>(null)
  const { getToken } = useAuthToken()
  const request = useCallback(async () => {
    setLoading(true)
    try {
      if (config?.needsAuth) {
        if (!token || shouldRenewToken(expiresAt ?? 0)) {
          getToken()
        }
      }
      const result = await apiService[method](uri, data, config)
      setResult(result.data)
    } catch (e) {
      console.error({ ERROR: e })
    }
    setLoading(false)
  }, [method, uri, data, config, token, getToken, expiresAt])

  return { result, request, loading }
}
