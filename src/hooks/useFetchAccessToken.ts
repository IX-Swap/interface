import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'
import { login } from './login'
import { sign } from './personalSign'
import { useWeb3React } from 'hooks/useWeb3React'
import { useCallback } from 'react'

interface Hash {
  hash: string
}

// Error messages could be moved to a separate file for better manageability.
const ERROR_MESSAGES = {
  noWallet: "User didn't connect a wallet",
  noHashReceived: 'No hash received from server',
  loginSignFailed: 'Login sign failed',
  noLoginData: 'No login data received',
}

export const useFetchAccessToken = () => {
  const { account, provider } = useWeb3React()

  const fetchAccessToken = useCallback(async () => {
    if (!account || !provider) {
      throw new Error(ERROR_MESSAGES.noWallet)
    }
    try {
      const { data } = await apiService.post<Hash>(metamask.challenge, { address: account })
      if (!data.hash) {
        throw new Error(ERROR_MESSAGES.noHashReceived)
      }
      const result = await sign({ hash: data.hash, account, provider })
      if (!result) {
        throw new Error(ERROR_MESSAGES.loginSignFailed)
      }
      const loginData = await login({ hash: result, account })
      if (!loginData || !loginData.data) {
        throw new Error(ERROR_MESSAGES.noLoginData)
      }
      return loginData.data
    } catch (error) {
      // Logging the error or handling it more specifically might be necessary
      throw error
    }
  }, [account, provider])

  return { fetchAccessToken }
}
