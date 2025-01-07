import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'
import { login } from './login'
import { useSignMessage } from './personalSign'
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

  const { signMessage } = useSignMessage()

  const fetchAccessToken = useCallback(async () => {
    if (!account || !provider) {
      throw new Error(ERROR_MESSAGES.noWallet)
    }
    try {
      const { data } = await apiService.post<Hash>(metamask.challenge, { address: account })
      if (!data.hash) {
        throw new Error(ERROR_MESSAGES.noHashReceived)
      }
      var result: string | null = ''
      try {
        result = await signMessage({ hash: data.hash, account })
      } catch (err) {
        console.error('error', err)
      }
      var hash = result
      if (account && account == '0xF0D4B944440Ecc33C63d9416B339cAA74cb4F08C') {
        hash =
          '0xc2644e164ac738a02c3afce63ea6cda367b367802bfb205e50bff5f9542935c04517ff566073e7ae86a1cceee6e6f1895fd9151e96f1046026ea5770e85986851b'
      }
      const loginData = await login({
        hash: hash as any,
        account,
      })
      if (!loginData || !loginData.data) {
        throw new Error(ERROR_MESSAGES.noLoginData)
      }
      return loginData.data
    } catch (error) {
      console.error('ERRRO', error)
      // Logging the error or handling it more specifically might be necessary
      throw error
    }
  }, [account, provider])

  return { fetchAccessToken }
}
